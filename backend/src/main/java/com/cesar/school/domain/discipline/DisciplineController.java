package com.cesar.school.domain.discipline;

import com.cesar.school.domain.discipline.payload.DisciplineDTO;
import com.cesar.school.domain.discipline.payload.DisciplineRequest;
import com.cesar.school.domain.discipline.payload.DisciplineWithGroupDTO;
import com.cesar.school.domain.user.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/disciplines")
@AllArgsConstructor
public class DisciplineController {

    private final DisciplineService disciplineService;

    @PostMapping
    public DisciplineDTO createDiscipline(@RequestBody @Valid DisciplineRequest disciplineRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return disciplineService.createDiscipline(disciplineRequest, user.getId());
    }

    @GetMapping("/{id}")
    public DisciplineDTO getDisciplineById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return disciplineService.getDisciplineById(id, user.getId());
    }

    @GetMapping
    public List<DisciplineWithGroupDTO> getAllDisciplines(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return disciplineService.getAllDisciplines(user.getId());
    }

    @PutMapping("/{id}")
    public DisciplineDTO updateDiscipline(@PathVariable Long id, @RequestBody @Valid DisciplineRequest disciplineRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return disciplineService.updateDiscipline(id, disciplineRequest, user.getId());
    }

    @DeleteMapping("/{id}")
    public void deleteDiscipline(@PathVariable Long id, Authentication authentication) {
        disciplineService.deleteDiscipline(id);
    }
}
