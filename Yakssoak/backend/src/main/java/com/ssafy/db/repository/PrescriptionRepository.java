package com.ssafy.db.repository;

import com.ssafy.db.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 약국 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    Optional<Prescription> findPrescriptionByPrescriptionSeq(long prescriptionSeq);
    Optional<Prescription> findPrescriptionByTokenId(long tokenId);
    List<Prescription> findAllByPatientUserSeq(long patientUserSeq);
    List<Prescription> findAllByHospitalUserSeq(long hospitalUserSeq);
    List<Prescription> findAllByPharmUserSeq(long pharmUserSeq);
}