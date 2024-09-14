package com.cesar.school.domain.group;

import com.cesar.school.domain.group.payload.GroupDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
