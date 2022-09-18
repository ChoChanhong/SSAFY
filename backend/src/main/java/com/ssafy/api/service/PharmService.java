package com.ssafy.api.service;

import com.ssafy.api.request.PharmRegisterPostReq;
import com.ssafy.db.entity.Pharm;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PharmService {
	Pharm createPharm(PharmRegisterPostReq pharmRegisterPostReq); // 약국 회원가입

	boolean checkIdDuplicated(String pharmId); // 아이디 중복검사

	boolean checkCRNDuplicated(String pharmCRN); // 사업자등록번호 중복검사

	Pharm getPharmByPharmId(String pharmId); // pharmId를 통해 디비에서 약국 정보 조회

	Pharm updatePhramInfo(String pharmId, PharmRegisterPostReq pharmUpdatePostReq); // 약국 정보 수정

	void deletePharm(Pharm pharm);
}
