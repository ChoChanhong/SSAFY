package com.ssafy.db.repository;

import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 환자 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findPatientByPatientSeq(long patientSeq);

    Optional<Patient> findPatientByPatientUserSeq(long patientUserSeq);

    Optional<Patient> findPatientByPatientRRN(String patientRRN);

    boolean existsByPatientRRN(String patientRRN);

    boolean existsByPatientUserSeq(long patientUserSeq);
}