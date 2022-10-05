package com.ssafy.api.service;

import com.ssafy.api.request.CreatePrescriptionPostReq;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.common.customObject.PharmInfo;
import com.ssafy.common.customObject.PrescriptionInfo;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
	public Prescription createPrescription(long hospitalUserSeq, CreatePrescriptionPostReq createPrescriptionPostReq) {
		Prescription prescription = new Prescription();

		prescription.setPatientUserSeq(createPrescriptionPostReq.getPatientUserSeq());
//		prescription.setHospitalUserSeq(createPrescriptionPostReq.getHospitalUserSeq());
		prescription.setHospitalUserSeq(hospitalUserSeq);
		prescription.setTokenId(createPrescriptionPostReq.getTokenId());
		prescription.setCompletion(false);

		long prescriptionSeq = prescriptionRepository.save(prescription).getPrescriptionSeq();

		return prescriptionRepository.findPrescriptionByPrescriptionSeq(prescriptionSeq).get();
	}


	@Override
	public PrescriptionInfo getPrescriptionInfo(Prescription prescription) {

			// patientInfo
			User inputPU = userRepository.findUserByUserSeq(prescription.getPatientUserSeq()).get();
			Patient inputP = patientRepository.findPatientByPatientUserSeq(prescription.getPatientUserSeq()).get();

			PatientInfo patientInfo = new PatientInfo(
					inputPU.getUserSeq(), inputPU.getUserId(), inputPU.getUserPassword(), inputPU.getUserName(),
					inputPU.getUserEmail(), inputPU.getUserIdx(), inputPU.getUserWalletAddress(), inputPU.getREG_DTM(), inputPU.getMOD_DTM(),
					inputP.getPatientSeq(), inputP.getPatientUserSeq(), inputP.getPatientRRN(), inputP.getREG_DTM(), inputP.getMOD_DTM());

			// hospitalInfo
			User inputU = userRepository.findUserByUserSeq(prescription.getHospitalUserSeq()).get();
			Hospital inputH = hospitalRepository.findHospitalByHospitalUserSeq(prescription.getHospitalUserSeq()).get();

			HospitalInfo hospitalInfo = new HospitalInfo(
					inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
					inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
					inputH.getHospitalSeq(), inputH.getHospitalUserSeq(), inputH.getHospitalDoctor(), inputH.getHospitalLicense(), inputH.getHospitalCode(),
					inputH.getHospitalAddr(), inputH.getHospitalTel(), inputH.getHospitalCRN(), inputH.getREG_DTM(), inputH.getMOD_DTM());


			// pharmInfo
			if (prescription.getPharmUserSeq() == 0) {
				PrescriptionInfo prescriptionInfo = new PrescriptionInfo(patientInfo, hospitalInfo, null, prescription);
				return prescriptionInfo;
			}

			// 약국이 있으면 약국정보까지
			User inputMU = userRepository.findUserByUserSeq(prescription.getPharmUserSeq()).get();
			Pharm inputM = pharmRepository.findPharmByPharmUserSeq(prescription.getPharmUserSeq()).get();

			PharmInfo pharmInfo = new PharmInfo(
					inputMU.getUserSeq(), inputMU.getUserId(), inputMU.getUserPassword(), inputMU.getUserName(),
					inputMU.getUserEmail(), inputMU.getUserIdx(), inputMU.getUserWalletAddress(), inputMU.getREG_DTM(), inputU.getMOD_DTM(),
					inputM.getPharmSeq(), inputM.getPharmUserSeq(), inputM.getPharmPharmacist(),inputM.getPharmLicense(), inputM.getPharmCode(),
					inputM.getPharmAddr(), inputM.getPharmTel(), inputM.getPharmCRN(), inputM.getREG_DTM(), inputM.getMOD_DTM());

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
