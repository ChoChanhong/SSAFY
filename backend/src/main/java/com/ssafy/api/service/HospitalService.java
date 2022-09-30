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

	//	// hospitalId를 통해 디비에서 약국 정보 조회
	//	@Override
	//	public Hospital getHospitalByHospitalId(String hospitalId) {
	//		Hospital hospital = hospitalRepository.findByHospitalId(hospitalId).get();
	//
	//		return hospital;
	//	}
	//
	// 회원 정보 수정
	HospitalInfo updateHospital(long userSeq, CreateHospitalPostReq updateHospitalPostReq);

	void deleteHospital(long userSeq);

    // 아이디로 seq 검색
    long findSeqbyId(String hospitalId);

//	boolean checkIdDuplicated(String hospitalId); // 아이디 중복검사
//
//	boolean checkCRNDuplicated(String hospitalCRN); // 사업자등록번호 중복검사
//
//	Hospital getHospitalByHospitalId(String hospitalId); // hospitalId를 통해 디비에서 약국 정보 조회
//
//	Hospital updateHospitalInfo(String hospitalId, CreateHospitalPostReq hospitalUpdatePostReq); // 약국 정보 수정
//
//	void deleteHospital(Hospital hospital);
}
