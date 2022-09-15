package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 병원 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "hospital")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "seq")
    private long hospitalSeq;

    @Column(name = "id", unique = true, nullable = false)
    private String hospitalId;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", nullable = false)
    String hospitalPassword;

    @Column(name = "email", nullable = false)
    private String hospitalEmail;

    @Column(name = "license", unique = true, nullable = false)
    private String hospitalLicense;

    @Column(name = "name", nullable = false)
    private String hospitalName;

    @Column(name = "addr", nullable = false)
    private String hospitalAddr;

    @Column(name = "tel", nullable = false)
    private String hospitalTel;

    @Column(name = "crn", unique = true, nullable = false) // CRN: Company Registration Number, 사업자등록번호
    private String hospitalCRN;

    @Column(name = "wallet_addr", nullable = true)
    private String hospitalWalletAddress;

    @CreationTimestamp
    @Column(name = "REG_DTM", nullable = false)
    private LocalDateTime REG_DTM;

    @UpdateTimestamp
    @Column(name = "MOD_DTM", nullable = true)
    private LocalDateTime MOD_DTM;
}