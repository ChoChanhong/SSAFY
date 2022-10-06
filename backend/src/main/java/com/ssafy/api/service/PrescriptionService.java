package com.ssafy.api.service;

import com.ssafy.api.request.CreatePrescriptionPostReq;
import com.ssafy.common.customObject.PrescriptionInfo;
import com.ssafy.db.entity.Prescription;
import com.ssafy.db.entity.User;

import java.util.List;

/**
 *	처방전 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PrescriptionService {
//    Prescription createPrescription(CreatePrescriptionPostReq createPrescriptionPostReq);
    Prescription createPrescription(long hospitalUserSeq, CreatePrescriptionPostReq createPrescriptionPostReq);

    PrescriptionInfo getPrescriptionInfo(Prescription prescription);

    Prescription updatePrescriptionPharm(long prescriptionSeq, long pharmUserSeq);

    Prescription getPrescription(long tokenId);

    Prescription updatePrescriptionCompletion(long prescriptionSeq);

    // 환자가 처방전 리스트 조회
    List<Prescription> getPatientPrescriptionList(long userSeq);

    // 처방전 리스트 조회(병원)
    List<Prescription> getHospitalPrescriptionList(long userSeq);

    // 처방전 리스트 조회(약국)
    List<Prescription> getPharmPrescriptionList(long pharmUserSeq);
}
