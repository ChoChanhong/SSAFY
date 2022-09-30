package com.ssafy.api.service;

import com.ssafy.api.request.CreatePatientPostReq;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PatientRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
//import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	환자 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("patientService")
public class PatientServiceImpl implements PatientService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public PatientInfo createPatient(CreatePatientPostReq createPatientPostReq) {
		User user = new User();
		Patient patient = new Patient();

		user.setUserId(createPatientPostReq.getPatientId());
		user.setUserPassword(passwordEncoder.encode(createPatientPostReq.getPatientPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		user.setUserName(createPatientPostReq.getPatientName());
		user.setUserEmail(createPatientPostReq.getPatientEmail());
		user.setUserIdx(0);

		long userSeq = userRepository.save(user).getUserSeq();

		patient.setPatientUserSeq(userSeq);
		patient.setPatientRRN(createPatientPostReq.getPatientRRN());

		long patientSeq = patientRepository.save(patient).getPatientSeq();

		PatientInfo patientInfo = new PatientInfo();
		patientInfo.setUser(userRepository.findUserByUserSeq(userSeq).get());
		patientInfo.setPatient(patientRepository.findPatientByPatientSeq(patientSeq).get());

		return patientInfo;
	}

	@Override
	public PatientInfo getPatientInfo(long userSeq) {
		PatientInfo patientInfo = new PatientInfo(
				userRepository.findUserByUserSeq(userSeq).get(),
				patientRepository.findPatientByPatientUserSeq(userSeq).get() );

		return patientInfo;
	}

	// 회원 정보 수정
	@Override
	public PatientInfo updatePatient(long userSeq, CreatePatientPostReq updatePatientPostReq) {
//		Optional<PatientInfo> updatePatientInfo = PatientInfo
		Optional<User> updatedUser = userRepository.findUserByUserSeq(userSeq);
		Optional<Patient> updatedPatient = patientRepository.findPatientByPatientUserSeq(userSeq);
//		User user = new User();
//		Patient patient = new Patient();

//		updatedUser.get().setUserId(updatePatientPostReq.getPatientId());
		updatedUser.get().setUserPassword(passwordEncoder.encode(updatePatientPostReq.getPatientPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		updatedUser.get().setUserName(updatePatientPostReq.getPatientName());
		updatedUser.get().setUserEmail(updatePatientPostReq.getPatientEmail());
//		updatedUser.get().setUserIdx(0);

		long updatedUserSeq = userRepository.save(updatedUser.get()).getUserSeq();

//		updatedPatient.get().setPatientUserSeq(userSeq);
		updatedPatient.get().setPatientRRN(updatePatientPostReq.getPatientRRN());

		long updatedPatientSeq = patientRepository.save(updatedPatient.get()).getPatientSeq();

		PatientInfo patientInfo = new PatientInfo();
		patientInfo.setUser(userRepository.findUserByUserSeq(userSeq).get());
		patientInfo.setPatient(patientRepository.findPatientByPatientSeq(updatedPatientSeq).get());

		return patientInfo;
	}

	@Override
	public void deletePatient(long userSeq) {
		userRepository.delete(userRepository.findUserByUserSeq(userSeq).get());
		patientRepository.delete(patientRepository.findPatientByPatientUserSeq(userSeq).get());
	}


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
	@Override
	public PatientInfo searchPatient(String patientName, String patientRRN) {

		// 주민등록번호로 검색
		Patient patient = patientRepository.findPatientByPatientRRN(patientRRN).get();

		// 이름 체크
		User user = userRepository.findUserByUserSeq(patient.getPatientUserSeq()).get();
		if (patientName.equals(user.getUserName())) {
			return new PatientInfo(user, patient);
		}

		return null;
	}

}
