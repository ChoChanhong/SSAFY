package com.ssafy.api.service;

import com.ssafy.api.request.CreatePatientPostReq;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.db.entity.Patient;

/**
 *	환자 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PatientService {

	PatientInfo createPatient(CreatePatientPostReq createPatientPostReq);

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
