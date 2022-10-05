package com.ssafy.api.service;

import com.ssafy.api.request.CreatePatientPostReq;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.db.entity.Patient;

/**
 *	환자 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PatientService {

	PatientInfo createPatient(CreatePatientPostReq createPatientPostReq);

    PatientInfo searchPatient(String patientName, String patientRRN);

    PatientInfo getPatientInfo(long userSeq);

    Patient getPatient(long patientUserSeq);

    // RRN 중복 검사
    boolean existsByPatientRRN(String patientRRN);

    PatientInfo updatePatient(long userSeq, CreatePatientPostReq updatePatientPostReq);

	void deletePatient(long userSeq);
}
