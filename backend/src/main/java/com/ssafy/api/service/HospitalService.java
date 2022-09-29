//package com.ssafy.api.service;
//
//import com.ssafy.api.request.HospitalRegisterPostReq;
//import com.ssafy.api.request.PharmRegisterPostReq;
//import com.ssafy.db.entity.Hospital;
//import com.ssafy.db.entity.Pharm;
//
///**
// *	병원 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
// */
//public interface HospitalService {
//	Hospital createHospital(HospitalRegisterPostReq hospitalRegisterPostReq); // 약국 회원가입
//
//	boolean checkIdDuplicated(String hospitalId); // 아이디 중복검사
//
//	boolean checkCRNDuplicated(String hospitalCRN); // 사업자등록번호 중복검사
//
//	Hospital getHospitalByHospitalId(String hospitalId); // hospitalId를 통해 디비에서 약국 정보 조회
//
//	Hospital updateHospitalInfo(String hospitalId, HospitalRegisterPostReq hospitalUpdatePostReq); // 약국 정보 수정
//
//	void deleteHospital(Hospital hospital);
//}
