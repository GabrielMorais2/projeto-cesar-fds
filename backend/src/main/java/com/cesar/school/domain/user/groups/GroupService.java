package com.cesar.school.domain.user.groups;

import com.cesar.school.domain.user.groups.dto.GroupRequestDTO;
import com.cesar.school.domain.user.groups.dto.GroupResponseDTO;
import com.cesar.school.domain.user.groups.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    public List<GroupResponseDTO> getAllGroups() {
        return groupRepository.findAll().stream()
                .map(GroupMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public GroupResponseDTO getGroupById(String id) {
        Group group = groupRepository.findById(id).orElse(null);
        return group != null ? GroupMapper.toResponseDTO(group) : null;
    }

    public GroupResponseDTO saveGroup(GroupRequestDTO groupRequestDTO) {
        Group group = GroupMapper.toEntity(groupRequestDTO);
        Group savedGroup = groupRepository.save(group);
        return GroupMapper.toResponseDTO(savedGroup);
    }

    public GroupResponseDTO updateGroup(String id, GroupRequestDTO groupRequestDTO) {
        Group existingGroup = groupRepository.findById(id).orElse(null);
        if (existingGroup == null){
            return null;
        }
        Group updatedGroup = GroupMapper.updateEntity(groupRequestDTO, existingGroup);
        Group savedGroup = groupRepository.save(updatedGroup);
        return GroupMapper.toResponseDTO(savedGroup);
    }

    public void deleteGroup(String id) {
        groupRepository.deleteById(id);
    }

}
