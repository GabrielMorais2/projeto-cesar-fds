package com.cesar.school.domain.evaluation;

import com.cesar.school.domain.evaluation.payload.EvaluationRequest;
import com.cesar.school.domain.evaluation.payload.EvaluationResponse;
import com.cesar.school.domain.user.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/evaluations")
@AllArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping
    public EvaluationResponse createEvaluation(@RequestBody EvaluationRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        request.setUserId(user.getId());
        return evaluationService.createEvaluation(request);
    }

    @GetMapping("/{id}")
    public EvaluationResponse getEvaluationById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return evaluationService.getEvaluationById(id, user.getId());
    }

    @GetMapping
    public List<EvaluationResponse> getAllEvaluations(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return evaluationService.getAllEvaluations(user.getId());
    }

    @PutMapping("/{id}")
    public EvaluationResponse updateEvaluation(@PathVariable Long id, @RequestBody EvaluationRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        request.setUserId(user.getId());
        return evaluationService.updateEvaluation(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteEvaluation(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        evaluationService.deleteEvaluation(id, user.getId());
    }

    @PostMapping("/{id}/send")
    public EvaluationResponse sendEvaluation(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return evaluationService.sendEvaluation(id, user.getId());
    }
}
