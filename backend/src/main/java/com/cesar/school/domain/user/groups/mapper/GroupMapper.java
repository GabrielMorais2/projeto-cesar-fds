package com.cesar.school.domain.user.groups.mapper;

import com.cesar.school.domain.user.groups.Group;
import com.cesar.school.domain.user.groups.dto.GroupRequestDTO;
import com.cesar.school.domain.user.groups.dto.GroupResponseDTO;

public class GroupMapper {
    public static GroupResponseDTO toResponseDTO(Group group) {
        GroupResponseDTO dto = new GroupResponseDTO();
        dto.setId(group.getId());
        dto.setName(group.getName());
        dto.setEmail(group.getEmail());
        return dto;
    }

    public static Group toEntity(GroupRequestDTO dto) {
        Group group = new Group();
        group.setName(dto.getName());
        group.setEmail(dto.getEmail());
        return group;
    }

    public static Group updateEntity(GroupRequestDTO dto, Group group) {
        group.setName(dto.getName());
        group.setEmail(dto.getEmail());
        return group;
    }
}
