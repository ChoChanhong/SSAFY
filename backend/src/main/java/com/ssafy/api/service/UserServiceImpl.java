package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
//import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).

		User user = userRepository.findByUserId(userId).get();
		return user;
	}


	@Override
	public User createWallet(long Seq, String walletAddr) {
		User user = userRepository.findUserByUserSeq(Seq).get();

		user.setUserWalletAddress(walletAddr);

		long userSeq = userRepository.save(user).getUserSeq();

		return userRepository.findUserByUserSeq(userSeq).get();
	}




	/*
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
	 */
}
