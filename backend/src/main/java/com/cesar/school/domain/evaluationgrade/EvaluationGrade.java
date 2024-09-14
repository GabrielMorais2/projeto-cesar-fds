package com.cesar.school.domain.evaluationgrade;
import com.cesar.school.domain.evaluation.Evaluation;
import com.cesar.school.domain.student.Student;
import com.cesar.school.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "evaluation_grade")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EvaluationGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evaluation_id")
    private Evaluation evaluation;

    @ManyToOne
    @JoinColumn(name = "evaluator_id")
    private Student evaluator;

    @ManyToOne
    @JoinColumn(name = "evaluated_id")
    private Student evaluated;

    private int criticalThinkingCreativity;
    private int communication;
    private int collaboration;
    private int deliveryQuality;
    private int attendance;
    private int deliveriesDeadlines;
    private String comment;

}
