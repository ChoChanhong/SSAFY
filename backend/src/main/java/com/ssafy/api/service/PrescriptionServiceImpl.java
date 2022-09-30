package com.ssafy.api.service;

import com.ssafy.api.request.CreatePrescriptionPostReq;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.common.customObject.PharmInfo;
import com.ssafy.common.customObject.PrescriptionInfo;
import com.ssafy.db.entity.Prescription;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
//import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	처방전 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("prescriptionService")
public class PrescriptionServiceImpl implements PrescriptionService {
	@Autowired
	PrescriptionRepository prescriptionRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PatientRepository patientRepository;

	@Autowired
	HospitalRepository hospitalRepository;

	@Autowired
	PharmRepository pharmRepository;

	@Override
	public Prescription createPrescription(CreatePrescriptionPostReq createPrescriptionPostReq) {
		Prescription prescription = new Prescription();

		prescription.setPatientUserSeq(createPrescriptionPostReq.getPatientUserSeq());
		prescription.setHospitalUserSeq(createPrescriptionPostReq.getHospitalUserSeq());
		prescription.setTokenId(createPrescriptionPostReq.getTokenId());
		prescription.setCompletion(false);

		long prescriptionSeq = prescriptionRepository.save(prescription).getPrescriptionSeq();

		return prescriptionRepository.findPrescriptionByPrescriptionSeq(prescriptionSeq).get();
	}


	@Override
	public PrescriptionInfo getPrescriptionInfo(Prescription prescription) {
					// 환자 정보
			PatientInfo patientInfo = new PatientInfo(
					userRepository.findUserByUserSeq(prescription.getPatientUserSeq()).get(),
					patientRepository.findPatientByPatientUserSeq(prescription.getPatientUserSeq()).get()
					);
			// 병원 정보
			HospitalInfo hospitalInfo = new HospitalInfo(
					userRepository.findUserByUserSeq(prescription.getHospitalUserSeq()).get(),
					hospitalRepository.findHospitalByHospitalUserSeq(prescription.getHospitalUserSeq()).get()
			);
			// 약국정보
			if (prescription.getPharmUserSeq() == 0) {
				PrescriptionInfo prescriptionInfo = new PrescriptionInfo(patientInfo, hospitalInfo, null, prescription);
				return prescriptionInfo;
			}
			// 약국이 있으면 약국정보까지
			PharmInfo pharmInfo = new PharmInfo(
					userRepository.findUserByUserSeq(prescription.getPharmUserSeq()).get(),
					pharmRepository.findPharmByPharmUserSeq(prescription.getPharmUserSeq()).get()
			);

			PrescriptionInfo prescriptionInfo = new PrescriptionInfo(patientInfo, hospitalInfo, pharmInfo, prescription);

			return prescriptionInfo;
	}

	@Override
	public Prescription updatePrescriptionPharm(long prescriptionSeq, long pharmUserSeq) {
		Prescription prescription = prescriptionRepository.findPrescriptionByPrescriptionSeq(prescriptionSeq).get();

		prescription.setPharmUserSeq(pharmUserSeq);

		long seq = prescriptionRepository.save(prescription).getPrescriptionSeq();

		return prescriptionRepository.findPrescriptionByPrescriptionSeq(seq).get();
	}

	@Override
	public Prescription updatePrescriptionCompletion(long prescriptionSeq) {
		Prescription prescription = prescriptionRepository.findPrescriptionByPrescriptionSeq(prescriptionSeq).get();

		prescription.setCompletion(true);

		long seq = prescriptionRepository.save(prescription).getPrescriptionSeq();

		return prescriptionRepository.findPrescriptionByPrescriptionSeq(seq).get();
	}


	// 처방전 리스트 조회(환자)
	@Override
	public List<Prescription> getPatientPrescriptionList(long patientUserSeq) {

		return prescriptionRepository.findAllByPatientUserSeq(patientUserSeq);
	}


	// 처방전 리스트 조회(병원)
	@Override
	public List<Prescription> getHospitalPrescriptionList(long hospitalUserSeq) {

		return prescriptionRepository.findAllByHospitalUserSeq(hospitalUserSeq);
	}

	// 처방전 리스트 조회(약국)
	@Override
	public List<Prescription> getPharmPrescriptionList(long pharmUserSeq) {

		return prescriptionRepository.findAllByPharmUserSeq(pharmUserSeq);
	}

}
