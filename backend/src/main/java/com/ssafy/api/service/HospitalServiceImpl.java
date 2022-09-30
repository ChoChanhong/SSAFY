package com.ssafy.api.service;

import com.ssafy.api.request.CreateHospitalPostReq;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.HospitalRepository;
import com.ssafy.db.repository.UserRepository;
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
	UserRepository userRepository;

	@Autowired
	HospitalRepository hospitalRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public HospitalInfo createHospital(CreateHospitalPostReq createHospitalPostReq) {
		User user = new User();
		Hospital hospital = new Hospital();

		user.setUserId(createHospitalPostReq.getHospitalId());
		user.setUserPassword(passwordEncoder.encode(createHospitalPostReq.getHospitalPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		user.setUserName(createHospitalPostReq.getHospitalName());
		user.setUserEmail(createHospitalPostReq.getHospitalEmail());
		user.setUserIdx(1);

		long userSeq = userRepository.save(user).getUserSeq();

		hospital.setHospitalUserSeq(userSeq);
		hospital.setHospitalLicense(createHospitalPostReq.getHospitalLicense());
		hospital.setHospitalAddr(createHospitalPostReq.getHospitalAddr());
		hospital.setHospitalTel(createHospitalPostReq.getHospitalTel());
		hospital.setHospitalCRN(createHospitalPostReq.getHospitalCRN());


		long hospitalSeq = hospitalRepository.save(hospital).getHospitalSeq();

		HospitalInfo hospitalInfo = new HospitalInfo(
				userRepository.findUserByUserSeq(userSeq).get(),
				hospitalRepository.findHospitalByHospitalUserSeq(userSeq).get()
		);

		return hospitalInfo;
	}

	@Override
	public HospitalInfo getHospitalInfo(long userSeq) {
		HospitalInfo hospitalInfo = new HospitalInfo(
				userRepository.findUserByUserSeq(userSeq).get(),
				hospitalRepository.findHospitalByHospitalUserSeq(userSeq).get());

		return hospitalInfo;
	}
//
//	// 아이디 중복 검사
//	@Override
//	public boolean checkIdDuplicated(String hospitalId) {
//		if (hospitalRepository.existsByHospitalId(hospitalId)) {
//			return true; // 존재
//		}
//		return false; // 존재X
//	}
//
//	// CRN 중복 검사
//	@Override
//	public boolean checkCRNDuplicated(String hospitalCRN) {
//		if (hospitalRepository.existsByHospitalCRN(hospitalCRN)) {
//			return true; // 존재
//		}
//		return false;
//	}

//	// hospitalId를 통해 디비에서 약국 정보 조회
//	@Override
//	public Hospital getHospitalByHospitalId(String hospitalId) {
//		Hospital hospital = hospitalRepository.findByHospitalId(hospitalId).get();
//
//		return hospital;
//	}
//
// 회원 정보 수정
	@Override
	public HospitalInfo updateHospital(long userSeq, CreateHospitalPostReq updateHospitalPostReq) {
		Optional<User> updatedUser = userRepository.findUserByUserSeq(userSeq);
		Optional<Hospital> updatedHospital = hospitalRepository.findHospitalByHospitalUserSeq(userSeq);

//		updatedUser.get().setUserId(updateHospitalPostReq.getHospitalId());
		updatedUser.get().setUserPassword(passwordEncoder.encode(updateHospitalPostReq.getHospitalPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		updatedUser.get().setUserName(updateHospitalPostReq.getHospitalName());
		updatedUser.get().setUserEmail(updateHospitalPostReq.getHospitalEmail());
//		updatedUser.get().setUserIdx(1);

		long updatedUserSeq = userRepository.save(updatedUser.get()).getUserSeq();

//		updatedHospital.get().setHospitalUserSeq(userSeq);
		updatedHospital.get().setHospitalLicense(updateHospitalPostReq.getHospitalLicense());
		updatedHospital.get().setHospitalAddr(updateHospitalPostReq.getHospitalAddr());
		updatedHospital.get().setHospitalTel(updateHospitalPostReq.getHospitalTel());
		updatedHospital.get().setHospitalCRN(updateHospitalPostReq.getHospitalCRN());

		long updatedHospitalSeq = hospitalRepository.save(updatedHospital.get()).getHospitalSeq();
//		long updatedPatientSeq = patientRepository.save(updatedPatient.get()).getPatientSeq();

		HospitalInfo hospitalInfo = new HospitalInfo(
				userRepository.findUserByUserSeq(userSeq).get(),
				hospitalRepository.findHospitalByHospitalUserSeq(userSeq).get()
		);

		return hospitalInfo;
	}

	@Override
	public void deleteHospital(long userSeq) {
		userRepository.delete(userRepository.findUserByUserSeq(userSeq).get());
		hospitalRepository.delete(hospitalRepository.findHospitalByHospitalUserSeq(userSeq).get());
	}




	// 아이디로 seq 검색
	@Override
	public long findSeqbyId(String hospitalId) {

		long userSeq = userRepository.findByUserId(hospitalId).get().getUserSeq();


		return userSeq;
	}
}
