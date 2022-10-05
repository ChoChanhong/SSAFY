package com.ssafy.api.service;

import com.ssafy.api.request.CreateHospitalPostReq;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.db.entity.Hospital;

/**
 *	병원 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface HospitalService {
	HospitalInfo createHospital(CreateHospitalPostReq createHospitalPostReq); // 약국 회원가입

	HospitalInfo getHospitalInfo(long userSeq);

	Hospital getHospital(long hospitalUserSeq);

	// CRN 중복 검사
	boolean existsByHospitalCRN(String hospitalCRN);

	// 회원 정보 수정
	HospitalInfo updateHospital(long userSeq, CreateHospitalPostReq updateHospitalPostReq);

	void deleteHospital(long userSeq);

    // 아이디로 seq 검색
    long findSeqbyId(String hospitalId);
}
