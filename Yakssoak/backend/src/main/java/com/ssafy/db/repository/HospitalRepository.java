package com.ssafy.db.repository;

import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 병원 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    Optional<Hospital> findHospitalByHospitalUserSeq(long hospitalUserSeq);

    boolean existsByHospitalCRN(String hospitalCRN); // 중복 체크를 위해 hospitalCRN가 존재하는지 확인
}