package com.cesar.school.domain.student;

import com.cesar.school.domain.group.Group;
import com.cesar.school.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "students")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @ManyToMany(mappedBy = "students")
    private Set<Group> groups;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
