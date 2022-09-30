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
    Prescription createPrescription(CreatePrescriptionPostReq createPrescriptionPostReq);

    PrescriptionInfo getPrescriptionInfo(Prescription prescription);

    // 환자가 처방전 리스트 조회
    List<Prescription> getPatientPrescriptionList(long userSeq);
}
