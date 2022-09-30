package com.ssafy.api.service;

import com.ssafy.api.request.CreatePatientPostReq;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.db.entity.Patient;

/**
 *	환자 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PatientService {

	PatientInfo createPatient(CreatePatientPostReq createPatientPostReq);

    //	@Override
    //	public User getUserByUserId(String userId) {
    //		// 디비에 유저 정보 조회 (userId 를 통한 조회).
    //		User user = userRepository.findByUserId(userId).get();
    //		return user;
    //	}
    //
    //	// userID 중복 체크
    //	@Override
    //	public boolean checkIdDuplicated(String userId) {
    //		if (userRepository.countByUserId(userId) == 0) {
    //			return true;
    //		}
    //		return false;
    //	}
    //
    //	// userRRN 중복 체크
    //	@Override
    //	public boolean checkRRNDuplicated(String userRRN) {
    //		if (userRepository.countByUserRRN(userRRN) == 0) {
    //			return true;
    //		}
    //		return false;
    //	}
    //
    //
    PatientInfo searchPatient(String patientName, String patientRRN);

    PatientInfo getPatientInfo(long userSeq);

//	PatientInfo updatePatient(CreatePatientPostReq updatePatientPostReq);

	PatientInfo updatePatient(long userSeq, CreatePatientPostReq updatePatientPostReq);
//
//    boolean checkIdDuplicated(String userId);
//
//	boolean checkRRNDuplicated(String userRRN);
//
//	public User updateUserInfo(String userId, UserRegisterPostReq updateInfo);
//
	void deletePatient(long userSeq);
}
