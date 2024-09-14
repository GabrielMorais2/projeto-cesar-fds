package com.cesar.school.domain.evaluation;

import com.cesar.school.domain.discipline.Discipline;
import com.cesar.school.domain.discipline.DisciplineRepository;
import com.cesar.school.domain.discipline.payload.DisciplineDTO;
import com.cesar.school.domain.evaluation.payload.EvaluationRequest;
import com.cesar.school.domain.evaluation.payload.EvaluationResponse;
import com.cesar.school.domain.group.Group;
import com.cesar.school.domain.group.GroupRepository;
import com.cesar.school.domain.group.payload.GroupDTO;
import com.cesar.school.domain.user.User;
import com.cesar.school.domain.user.UserRepository;
import com.cesar.school.exception.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final UserRepository userRepository;
    private final DisciplineRepository disciplineRepository;
    private final GroupRepository groupRepository;
    private final ModelMapper mapper;

    public EvaluationResponse createEvaluation(EvaluationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Discipline discipline = disciplineRepository.findById(request.getDisciplineId())
                .orElseThrow(() -> new EntityNotFoundException("Discipline not found"));

        Group group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        Evaluation evaluation = new Evaluation();
        evaluation.setName(request.getName());
        evaluation.setDeadline(request.getDeadline());
        evaluation.setDiscipline(discipline);
        evaluation.setGroup(group);
        evaluation.setUser(user);

        Evaluation savedEvaluation = evaluationRepository.save(evaluation);

        return mapper.map(savedEvaluation, EvaluationResponse.class);
    }

    public EvaluationResponse getEvaluationById(Long id, String userId) {
        Evaluation evaluation = evaluationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada ou não pertence ao usuário."));

        return mapper.map(evaluation, EvaluationResponse.class);
    }

    public List<EvaluationResponse> getAllEvaluations(String userId) {
        List<Evaluation> evaluations = evaluationRepository.findAllByUserId(userId);
        return evaluations.stream().map(evaluation -> {
            EvaluationResponse response = new EvaluationResponse();
            response.setId(evaluation.getId());
            response.setName(evaluation.getName());
            response.setDeadline(evaluation.getDeadline());
            response.setSent(evaluation.isSent());

            response.setGroup(new GroupDTO(
                    evaluation.getGroup().getId(),
                    evaluation.getGroup().getName()
            ));

            response.setDiscipline(new DisciplineDTO(
                    evaluation.getDiscipline().getId(),
                    evaluation.getDiscipline().getName(),
                    evaluation.getDiscipline().getSemester()
            ));

            return response;
        }).collect(Collectors.toList());
    }

    public EvaluationResponse updateEvaluation(Long id, EvaluationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Evaluation evaluation = evaluationRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada ou não pertence ao usuário."));

        Discipline discipline = disciplineRepository.findById(request.getDisciplineId())
                .orElseThrow(() -> new EntityNotFoundException("Discipline not found"));

        Group group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        evaluation.setName(request.getName());
        evaluation.setDeadline(request.getDeadline());
        evaluation.setDiscipline(discipline);
        evaluation.setGroup(group);

        Evaluation updatedEvaluation = evaluationRepository.save(evaluation);

        return mapper.map(updatedEvaluation, EvaluationResponse.class);
    }

    public void deleteEvaluation(Long id, String userId) {
        Evaluation evaluation = evaluationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada ou não pertence ao usuário."));

        evaluationRepository.delete(evaluation);
    }

    public EvaluationResponse sendEvaluation(Long id, String userId) {
        Evaluation evaluation = evaluationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada ou não pertence ao usuário."));

        evaluation.setSent(true);

        Evaluation updatedEvaluation = evaluationRepository.save(evaluation);

        return mapper.map(updatedEvaluation, EvaluationResponse.class);
    }
}
