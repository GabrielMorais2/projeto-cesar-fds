package com.cesar.school.domain.group;

import com.cesar.school.domain.evaluation.EvaluationService;
import com.cesar.school.domain.evaluation.payload.EvaluationResponse;
import com.cesar.school.domain.group.payload.GroupDTO;
import com.cesar.school.domain.user.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
