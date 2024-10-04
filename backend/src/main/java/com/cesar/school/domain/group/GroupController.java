package com.cesar.school.domain.group;

import com.cesar.school.domain.group.payload.GroupDTO;
import com.cesar.school.domain.group.payload.GroupRequest;
import com.cesar.school.domain.group.payload.GroupWithStudentsDTO;
import com.cesar.school.domain.user.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/groups")
@AllArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public GroupDTO createGroup(@RequestBody @Valid GroupRequest groupRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return groupService.createGroup(groupRequest, user.getId());
    }

    @GetMapping("/{id}")
    public GroupWithStudentsDTO getGroupById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return groupService.getGroupById(id, user.getId());
    }

    @GetMapping
    public List<GroupWithStudentsDTO> getAllGroups(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return groupService.getAllGroups(user.getId());
    }

    @PutMapping("/{id}")
    public GroupDTO updateGroup(@PathVariable Long id, @RequestBody @Valid GroupRequest groupRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return groupService.updateGroup(id, groupRequest, user.getId());
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        groupService.deleteGroup(id, user.getId());
    }
}
