package com.ssafy.api.service;
import com.ssafy.api.request.CreatePharmPostReq;
import com.ssafy.common.customObject.PharmInfo;
import com.ssafy.db.entity.Pharm;

/**
 *	약국 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PharmService {
    PharmInfo createPharm(CreatePharmPostReq createPharmPostReq);

//    PharmInfo getPharmInfo(long userSeq);
//
//// 회원 정보 수정
//    PharmInfo updatePharm(long userSeq, CreatePharmPostReq updatePharmPostReq);
//
//    void deletePharm(long userSeq);
}
