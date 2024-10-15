package com.cesar.school.domain.discipline;

import com.cesar.school.domain.discipline.payload.DisciplineDTO;
import com.cesar.school.domain.discipline.payload.DisciplineRequest;
import com.cesar.school.domain.discipline.payload.DisciplineWithGroupDTO;
import com.cesar.school.domain.user.User;
import com.cesar.school.domain.user.UserRepository;
import com.cesar.school.exception.DisciplineWithGroupException;
import com.cesar.school.exception.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DisciplineService {

    private final DisciplineRepository disciplineRepository;
    private final UserRepository userRepository;

    private final ModelMapper mapper;

    public DisciplineDTO createDiscipline(DisciplineRequest disciplineRequest, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Discipline discipline = mapper.map(disciplineRequest, Discipline.class);
        discipline.setUser(user);
        Discipline savedDiscipline = disciplineRepository.save(discipline);
        return mapper.map(savedDiscipline, DisciplineDTO.class);
    }


    public DisciplineDTO getDisciplineById(Long id, String userId) {
        Discipline discipline = disciplineRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Disciplina não encontrada."));

        return mapper.map(discipline, DisciplineDTO.class);
    }

    public List<DisciplineWithGroupDTO> getAllDisciplines(String userId) {
        List<Discipline> disciplines = disciplineRepository.findAllWithGroupsByUserId(userId);
        return disciplines.stream()
                .map(discipline -> mapper.map(discipline, DisciplineWithGroupDTO.class))
                .collect(Collectors.toList());
    }

    public DisciplineDTO updateDiscipline(Long id, DisciplineRequest disciplineRequest, String userId) {
        Discipline discipline = disciplineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Disciplina não encontrada."));

        discipline.setName(disciplineRequest.getName());
        discipline.setCourse(disciplineRequest.getCourse());
        discipline.setSemester(disciplineRequest.getSemester());

        Discipline updatedDiscipline = disciplineRepository.save(discipline);
        return mapper.map(updatedDiscipline, DisciplineDTO.class);
    }

    public void deleteDiscipline(Long id) {
        Discipline discipline = disciplineRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Disciplina não encontrada."));

        if (!discipline.getGroups().isEmpty()) {
            throw new DisciplineWithGroupException("Não é possível deletar a disciplina. Existem " + (long) discipline.getGroups().size() + " grupos associados a ela.");
        }

        disciplineRepository.delete(discipline);
    }
}
