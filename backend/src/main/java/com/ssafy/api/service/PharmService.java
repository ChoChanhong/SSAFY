package com.ssafy.api.service;
import com.ssafy.api.request.CreatePharmPostReq;
import com.ssafy.common.customObject.PharmInfo;
import com.ssafy.db.entity.Pharm;

import java.util.List;

/**
 *	약국 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PharmService {
    PharmInfo createPharm(CreatePharmPostReq createPharmPostReq);

    Pharm getPharm(long pharmUserSeq);

    // CRN 중복 검사
    boolean existsByPharmCRN(String pharmCRN);

    PharmInfo getPharmInfo(long userSeq);

    // 회원 정보 수정
    PharmInfo updatePharm(long userSeq, CreatePharmPostReq updatePharmPostReq);

    void deletePharm(long userSeq);

    List<Pharm> getPharmList();
}
