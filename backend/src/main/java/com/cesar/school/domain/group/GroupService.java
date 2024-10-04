package com.cesar.school.domain.group;

import com.cesar.school.domain.discipline.Discipline;
import com.cesar.school.domain.discipline.DisciplineRepository;
import com.cesar.school.domain.group.payload.GroupDTO;
import com.cesar.school.domain.group.payload.GroupRequest;
import com.cesar.school.domain.group.payload.GroupWithStudentsDTO;
import com.cesar.school.domain.student.Student;
import com.cesar.school.domain.student.StudentRepository; // Certifique-se de que existe este repositório
import com.cesar.school.domain.student.payload.StudentDTO;
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
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository; // Novo repositório para alunos
    private final ModelMapper mapper;
    private final DisciplineRepository disciplineRepository;

    public GroupDTO createGroup(GroupRequest groupRequest, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Group group = new Group();
        group.setName(groupRequest.getName());

        Discipline discipline = disciplineRepository.findById(groupRequest.getDisciplineId())
                .orElseThrow(() -> new EntityNotFoundException("Disciplina não encontrada."));
        group.setDiscipline(discipline);

        group.setUser(user);

        List<Student> students = groupRequest.getStudents().stream()
                .map(studentRequest -> {
                    Student student = new Student();
                    student.setName(studentRequest.getName());
                    student.setEmail(studentRequest.getEmail());
                    return studentRepository.save(student);
                }).collect(Collectors.toList());

        group.setStudents(students);
        Group savedGroup = groupRepository.save(group);

        return mapper.map(savedGroup, GroupDTO.class);
    }


    public GroupWithStudentsDTO getGroupById(Long id, String userId) {
        Group group = groupRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Grupo não encontrado."));

        return mapper.map(group, GroupWithStudentsDTO.class);
    }

    public List<GroupWithStudentsDTO> getAllGroups(String userId) {
        List<Group> groups = groupRepository.findAllByUserId(userId);
        return groups.stream()
                .map(group -> {
                    GroupWithStudentsDTO dto = mapper.map(group, GroupWithStudentsDTO.class);
                    List<StudentDTO> studentDTOs = group.getStudents().stream()
                            .map(student -> mapper.map(student, StudentDTO.class))
                            .collect(Collectors.toList());
                    dto.setStudents(studentDTOs);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public GroupDTO updateGroup(Long id, GroupRequest groupRequest, String userId) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Grupo não encontrado."));

        Discipline discipline = disciplineRepository.findById(groupRequest.getDisciplineId())
                .orElseThrow(() -> new EntityNotFoundException("Disciplina não encontrada."));

        group.setName(groupRequest.getName());
        group.setDiscipline(discipline);

        List<Student> students = groupRequest.getStudents().stream()
                .map(studentRequest -> {
                    Student student = new Student();
                    student.setName(studentRequest.getName());
                    student.setEmail(studentRequest.getEmail());
                    return studentRepository.save(student);
                }).collect(Collectors.toList());

        group.setStudents(students);

        Group updatedGroup = groupRepository.save(group);
        return mapper.map(updatedGroup, GroupDTO.class);
    }

    public void deleteGroup(Long id, String userId) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Grupo não encontrado."));
        groupRepository.delete(group);
    }
}
