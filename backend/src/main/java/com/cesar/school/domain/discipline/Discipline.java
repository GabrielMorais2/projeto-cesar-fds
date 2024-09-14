package com.cesar.school.domain.discipline;

import com.cesar.school.domain.group.Group;
import com.cesar.school.domain.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "disciplines")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(
        scope = Discipline.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Discipline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String semester;

    @OneToMany(mappedBy = "discipline")
    private List<Group> groups;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

