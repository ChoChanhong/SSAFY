package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.C;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 처방전 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "prescription")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "seq")
    private long prescriptionSeq;

    @Column(name = "patientUserSeq", nullable = false)
    private long patientUserSeq;

    @Column(name = "hospitalUserSeq", nullable = false)
    private long hospitalUserSeq;

    @Column(name = "pharmUserSeq", nullable = true)
    private long pharmUserSeq;

    @Column(name = "tokenId", nullable = false)
    private long tokenId;

    @Column(name = "completion", nullable = false)
    private boolean completion;

    @CreationTimestamp
    @Column(name = "REG_DTM", nullable = false)
    private LocalDateTime REG_DTM;

    @UpdateTimestamp
    @Column(name = "MOD_DTM", nullable = true)
    private LocalDateTime MOD_DTM;
}