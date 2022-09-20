package com.ssafy.api.service;

import com.ssafy.api.request.HospitalRegisterPostReq;
import com.ssafy.api.request.PharmRegisterPostReq;
import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.Pharm;
import com.ssafy.db.repository.HospitalRepository;
import com.ssafy.db.repository.PharmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 *	병원 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("hospitalService")
public class HospitalServiceImpl implements HospitalService {
	@Autowired
	HospitalRepository hospitalRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public Hospital createHospital(HospitalRegisterPostReq hospitalRegisterPostReq) {
		Hospital hospital = new Hospital();

		// 아이디, 비밀번호, 이메일, 면허번호, 이름, 주소, 전화번호, 사업자등록번호
		hospital.setHospitalId(hospitalRegisterPostReq.getHospitalId());
		hospital.setHospitalPassword(passwordEncoder.encode(hospitalRegisterPostReq.getHospitalPassword()));
		hospital.setHospitalEmail(hospitalRegisterPostReq.getHospitalEmail());
		hospital.setHospitalLicense(hospitalRegisterPostReq.getHospitalLicense());
		hospital.setHospitalName(hospitalRegisterPostReq.getHospitalName());
		hospital.setHospitalAddr(hospitalRegisterPostReq.getHospitalAddr());
		hospital.setHospitalTel(hospitalRegisterPostReq.getHospitalTel());
		hospital.setHospitalCRN(hospitalRegisterPostReq.getHospitalCRN());

		return hospitalRepository.save(hospital);
	}


	// 아이디 중복 검사
	@Override
	public boolean checkIdDuplicated(String hospitalId) {
		if (hospitalRepository.existsByHospitalId(hospitalId)) {
			return true; // 존재
		}
		return false; // 존재X
	}

	// CRN 중복 검사
	@Override
	public boolean checkCRNDuplicated(String hospitalCRN) {
		if (hospitalRepository.existsByHospitalCRN(hospitalCRN)) {
			return true; // 존재
		}
		return false;
	}

	// hospitalId를 통해 디비에서 약국 정보 조회
	@Override
	public Hospital getHospitalByHospitalId(String hospitalId) {
		Hospital hospital = hospitalRepository.findByHospitalId(hospitalId).get();

		return hospital;
	}

	// 약국 정보 수정
	@Override
	public Hospital updateHospitalInfo(String hospitalId, HospitalRegisterPostReq hospitalUpdatePostReq) {
		Optional<Hospital> updatedHospital = hospitalRepository.findByHospitalId(hospitalId);

		if (updatedHospital.isPresent()) {
			updatedHospital.get().setHospitalId(hospitalUpdatePostReq.getHospitalId());

			// 아이디, 비밀번호, 이메일, 면허번호, 이름, 주소, 전화번호, 사업자등록번호
			updatedHospital.get().setHospitalId(hospitalUpdatePostReq.getHospitalId());
			updatedHospital.get().setHospitalPassword(passwordEncoder.encode(hospitalUpdatePostReq.getHospitalPassword()));
			updatedHospital.get().setHospitalEmail(hospitalUpdatePostReq.getHospitalEmail());
			updatedHospital.get().setHospitalLicense(hospitalUpdatePostReq.getHospitalLicense());
			updatedHospital.get().setHospitalName(hospitalUpdatePostReq.getHospitalName());
			updatedHospital.get().setHospitalAddr(hospitalUpdatePostReq.getHospitalAddr());
			updatedHospital.get().setHospitalTel(hospitalUpdatePostReq.getHospitalTel());
			updatedHospital.get().setHospitalCRN(hospitalUpdatePostReq.getHospitalCRN());
		}

		hospitalRepository.save(updatedHospital.get());

		return updatedHospital.get();
	}

	@Override
	public void deleteHospital(Hospital hospital) {
		hospitalRepository.delete(hospital);
	}
}
