//package com.ssafy.db.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//
///**
// * 약국 모델 정의.
// */
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@JsonInclude(JsonInclude.Include.NON_NULL)
//@Table(name = "pharm")
//public class Pharm {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "seq")
//    private long pharmSeq;
//
//    @Column(name = "userSeq", nullable = false)
//    private long pharmUserSeq;
//
//    @Column(name = "license", nullable = false)
//    private String pharmLicense;
//
//    @Column(name = "addr", nullable = false)
//    private String pharmAddr;
//
//    @Column(name = "crn", unique = true, nullable = false) // CRN: Company Registration Number, 사업자등록번호
//    private String pharmCRN;
//
//    @CreationTimestamp
//    @Column(name = "REG_DTM", nullable = false)
//    private LocalDateTime REG_DTM;
//
//    @UpdateTimestamp
//    @Column(name = "MOD_DTM", nullable = true)
//    private LocalDateTime MOD_DTM;
//}