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
		user.setUserWalletAddress(createHospitalPostReq.getHospitalWalletAddr());
		user.setUserIdx(1);

		long userSeq = userRepository.save(user).getUserSeq();

		hospital.setHospitalUserSeq(userSeq);
		hospital.setHospitalDoctor(createHospitalPostReq.getHospitalDoctor());
		hospital.setHospitalLicense(createHospitalPostReq.getHospitalLicense());
		hospital.setHospitalCode(createHospitalPostReq.getHospitalCode());
		hospital.setHospitalAddr(createHospitalPostReq.getHospitalAddr());
		hospital.setHospitalTel(createHospitalPostReq.getHospitalTel());
		hospital.setHospitalCRN(createHospitalPostReq.getHospitalCRN());


		long hospitalUserSeq = hospitalRepository.save(hospital).getHospitalUserSeq();

		// hospitalInfo
		User inputU = userRepository.findUserByUserSeq(userSeq).get();
		Hospital inputH = hospitalRepository.findHospitalByHospitalUserSeq(hospitalUserSeq).get();

		HospitalInfo hospitalInfo = new HospitalInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputH.getHospitalSeq(), inputH.getHospitalUserSeq(), inputH.getHospitalDoctor(), inputH.getHospitalLicense(), inputH.getHospitalCode(),
				inputH.getHospitalAddr(), inputH.getHospitalTel(), inputH.getHospitalCRN(), inputH.getREG_DTM(), inputH.getMOD_DTM());

		return hospitalInfo;
	}

	@Override
	public HospitalInfo getHospitalInfo(long userSeq) {

		// hospitalInfo
		User inputU = userRepository.findUserByUserSeq(userSeq).get();
		Hospital inputH = hospitalRepository.findHospitalByHospitalUserSeq(userSeq).get();

		HospitalInfo hospitalInfo = new HospitalInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputH.getHospitalSeq(), inputH.getHospitalUserSeq(), inputH.getHospitalDoctor(), inputH.getHospitalLicense(), inputH.getHospitalCode(),
				inputH.getHospitalAddr(), inputH.getHospitalTel(), inputH.getHospitalCRN(), inputH.getREG_DTM(), inputH.getMOD_DTM());

		return  hospitalInfo;
	}

	@Override
	public Hospital getHospital(long hospitalUserSeq) {
		return hospitalRepository.findHospitalByHospitalUserSeq(hospitalUserSeq).get();
	}


	// CRN 중복 검사
	@Override
	public boolean existsByHospitalCRN(String hospitalCRN) {
		if (hospitalRepository.existsByHospitalCRN(hospitalCRN)) {
			return true; // 존재
		}
		return false;
	}

// 회원 정보 수정
	@Override
	public HospitalInfo updateHospital(long userSeq, CreateHospitalPostReq updateHospitalPostReq) {
		Optional<User> updatedUser = userRepository.findUserByUserSeq(userSeq);
		Optional<Hospital> updatedHospital = hospitalRepository.findHospitalByHospitalUserSeq(userSeq);

		updatedUser.get().setUserId(updateHospitalPostReq.getHospitalId());
		updatedUser.get().setUserPassword(passwordEncoder.encode(updateHospitalPostReq.getHospitalPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		updatedUser.get().setUserName(updateHospitalPostReq.getHospitalName());
		updatedUser.get().setUserEmail(updateHospitalPostReq.getHospitalEmail());

		long updatedUserSeq = userRepository.save(updatedUser.get()).getUserSeq();

		updatedHospital.get().setHospitalDoctor(updateHospitalPostReq.getHospitalDoctor());
		updatedHospital.get().setHospitalLicense(updateHospitalPostReq.getHospitalLicense());
		updatedHospital.get().setHospitalCode(updateHospitalPostReq.getHospitalCode());
		updatedHospital.get().setHospitalAddr(updateHospitalPostReq.getHospitalAddr());
		updatedHospital.get().setHospitalTel(updateHospitalPostReq.getHospitalTel());
		updatedHospital.get().setHospitalCRN(updateHospitalPostReq.getHospitalCRN());

		long updatedHospitalUserSeq = hospitalRepository.save(updatedHospital.get()).getHospitalUserSeq();

		// hospitalInfo
		User inputU = userRepository.findUserByUserSeq(updatedUserSeq).get();
		Hospital inputH = hospitalRepository.findHospitalByHospitalUserSeq(updatedHospitalUserSeq).get();

		HospitalInfo hospitalInfo = new HospitalInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputH.getHospitalSeq(), inputH.getHospitalUserSeq(), inputH.getHospitalDoctor(), inputH.getHospitalLicense(), inputH.getHospitalCode(),
				inputH.getHospitalAddr(), inputH.getHospitalTel(), inputH.getHospitalCRN(), inputH.getREG_DTM(), inputH.getMOD_DTM());

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
		return userRepository.findByUserId(hospitalId).get().getUserSeq();
	}
}
