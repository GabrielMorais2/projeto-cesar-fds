package com.cesar.school.domain.group;

import com.cesar.school.domain.discipline.Discipline;
import com.cesar.school.domain.discipline.DisciplineRepository;
import com.cesar.school.domain.group.payload.GroupDTO;
import com.cesar.school.domain.group.payload.GroupRequestDTO;
import com.cesar.school.domain.student.Student;
import com.cesar.school.domain.student.StudentRepository;
import com.cesar.school.domain.user.User;
import com.cesar.school.domain.user.UserRepository;
import com.cesar.school.exception.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;

    public List<GroupDTO> getAllGroups(String userId) {
        List<Group> groups = groupRepository.findAllByUserId(userId);
        return groups.stream().map(group -> {
            GroupDTO response = new GroupDTO();
            response.setId(group.getId());
            response.setName(group.getName());
            return response;
        }).collect(Collectors.toList());
    }

    public GroupDTO getGroupById(Long id, String userId) {
        Group group = groupRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Group with id " + id + " not found for user with id " + userId));
        return new GroupDTO(group.getId(), group.getName());
    }

    public GroupDTO createGroup(@Valid GroupRequestDTO groupRequestDTO, String userId) {
        // Buscar o usuário pelo ID
        User user = UserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + userId + " not found"));

        // Buscar a disciplina se o DTO passar o ID da disciplina
        Discipline discipline = DisciplineRepository.findById(groupRequestDTO.getDisciplineId())
                .orElseThrow(() -> new EntityNotFoundException("Discipline with id " + groupRequestDTO.getDisciplineId() + " not found"));

        // Buscar os estudantes associados
        Set<Student> students = StudentRepository.findAllByIdIn(groupRequestDTO.getStudentIds());
        if (students.isEmpty() && !groupRequestDTO.getStudentIds().isEmpty()) {
            throw new EntityNotFoundException("Some students were not found.");
        }

        // Criar o grupo
        Group group = new Group();
        group.setName(groupRequestDTO.getName());
        group.setUser(user);
        group.setDiscipline(discipline);
        group.setStudents(students);
        group = groupRepository.save(group);

        return new GroupDTO(group.getId(), group.getName());
    }

    public GroupDTO updateGroup(Long id, @Valid GroupRequestDTO groupRequestDTO) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group with id " + id + " not found"));

        group.setName(groupRequestDTO.getName());

        // Atualizar disciplina se necessário
        if (groupRequestDTO.getDisciplineId() != null) {
            Discipline discipline = DisciplineRepository.findById(groupRequestDTO.getDisciplineId())
                    .orElseThrow(() -> new EntityNotFoundException("Discipline with id " + groupRequestDTO.getDisciplineId() + " not found"));
            group.setDiscipline(discipline);
        }

        // Atualizar lista de estudantes
        if (groupRequestDTO.getStudentIds() != null && !groupRequestDTO.getStudentIds().isEmpty()) {
            Set<Student> students = StudentRepository.findAllByIdIn(groupRequestDTO.getStudentIds());
            if (students.isEmpty()) {
                throw new EntityNotFoundException("Some students were not found.");
            }
            group.setStudents(students);
        }

        group = groupRepository.save(group);
        return new GroupDTO(group.getId(), group.getName());
    }

    public void deleteGroup(Long id) {
        Group group = groupRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Group with id " + id + " not found"));

        groupRepository.delete(group);
    }
}
