package com.ssafy.db.repository;

import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.Pharm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 약국 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PharmRepository extends JpaRepository<Pharm, Long> {

    Optional<Pharm> findPharmByPharmSeq(long pharmSeq);
    Optional<Pharm> findPharmByPharmUserSeq(long pharmUserSeq);

    boolean existsByPharmCRN(String pharmCRN);

    List<Pharm> findAll();
}