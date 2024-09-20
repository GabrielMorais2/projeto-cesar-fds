package com.cesar.school.domain.group;

import com.cesar.school.domain.evaluation.EvaluationService;
import com.cesar.school.domain.evaluation.payload.EvaluationResponse;
import com.cesar.school.domain.group.payload.GroupDTO;
import com.cesar.school.domain.group.payload.GroupRequestDTO;
import com.cesar.school.domain.user.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/groups")
@AllArgsConstructor
public class GroupController {


    private final GroupService groupService;

    @GetMapping
    public List<GroupDTO> getAllEvaluations(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return groupService.getAllGroups(user.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupDTO> getGroupById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        GroupDTO group = groupService.getGroupById(id, user.getId());
        return ResponseEntity.ok(group);
    }


    @PostMapping
    public ResponseEntity<GroupDTO> createGroup(@Valid @RequestBody GroupRequestDTO groupRequestDTO, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        GroupDTO createdGroup = groupService.createGroup(groupRequestDTO, user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGroup);
    }


    @PutMapping("/{id}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long id, @Valid @RequestBody GroupRequestDTO groupRequestDTO, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        GroupDTO updatedGroup = groupService.updateGroup(id, groupRequestDTO);
        return ResponseEntity.ok(updatedGroup);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }

}
