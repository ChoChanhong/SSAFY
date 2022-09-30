package com.ssafy.api.service;

import com.ssafy.api.request.CreatePharmPostReq;
import com.ssafy.common.customObject.PharmInfo;
import com.ssafy.db.entity.Pharm;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PharmRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 *	약국 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("pharmService")
public class PharmServiceImpl implements PharmService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PharmRepository pharmRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public PharmInfo createPharm(CreatePharmPostReq createPharmPostReq) {
		User user = new User();
		Pharm pharm = new Pharm();

		user.setUserId(createPharmPostReq.getPharmId());
		user.setUserPassword(passwordEncoder.encode(createPharmPostReq.getPharmPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		user.setUserName(createPharmPostReq.getPharmName());
		user.setUserEmail(createPharmPostReq.getPharmEmail());
		user.setUserIdx(2);

		long userSeq = userRepository.save(user).getUserSeq();

		pharm.setPharmUserSeq(userSeq);
		pharm.setPharmLicense(createPharmPostReq.getPharmLicense());
		pharm.setPharmAddr(createPharmPostReq.getPharmAddr());
		pharm.setPharmTel(createPharmPostReq.getPharmTel());
		pharm.setPharmCRN(createPharmPostReq.getPharmCRN());

		long pharmSeq = pharmRepository.save(pharm).getPharmSeq();

		PharmInfo pharmInfo = new PharmInfo(
				userRepository.findUserByUserSeq(userSeq).get(),
				pharmRepository.findPharmByPharmUserSeq(userSeq).get()
		);

		return pharmInfo;
	}

//	@Override
//	public PharmInfo getPharmInfo(long userSeq) {
//		PharmInfo pharmInfo = new PharmInfo(
//				userRepository.findUserByUserSeq(userSeq).get(),
//				pharmRepository.findPharmByPharmUserSeq(userSeq).get()
//		);
//
//		return pharmInfo;
//	}
////
////	// 아이디 중복 검사
////	@Override
////	public boolean checkIdDuplicated(String hospitalId) {
////		if (hospitalRepository.existsByHospitalId(hospitalId)) {
////			return true; // 존재
////		}
////		return false; // 존재X
////	}
////
////	// CRN 중복 검사
////	@Override
////	public boolean checkCRNDuplicated(String hospitalCRN) {
////		if (hospitalRepository.existsByHospitalCRN(hospitalCRN)) {
////			return true; // 존재
////		}
////		return false;
////	}
//
//	//	// hospitalId를 통해 디비에서 약국 정보 조회
////	@Override
////	public Hospital getHospitalByHospitalId(String hospitalId) {
////		Hospital hospital = hospitalRepository.findByHospitalId(hospitalId).get();
////
////		return hospital;
////	}
////
//// 회원 정보 수정
//	@Override
//	public PharmInfo updatePharm(long userSeq, CreatePharmPostReq updatePharmPostReq) {
//		Optional<User> updatedUser = userRepository.findUserByUserSeq(userSeq);
//		Optional<Pharm> updatedPharm = pharmRepository.findPharmByPharmUserSeq(userSeq);
//
//		updatedUser.get().setUserPassword(passwordEncoder.encode(updatePharmPostReq.getPharmPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
//		updatedUser.get().setUserName(updatePharmPostReq.getPharmName());
//		updatedUser.get().setUserEmail(updatePharmPostReq.getPharmEmail());
////		updatedUser.get().setUserIdx(1);
//
//		long updatedUserSeq = userRepository.save(updatedUser.get()).getUserSeq();
//
//
//		updatedPharm.get().setPharmLicense(updatePharmPostReq.getPharmLicense());
//		updatedPharm.get().setPharmAddr(updatePharmPostReq.getPharmAddr());
//		updatedPharm.get().setPharmTel(updatePharmPostReq.getPharmTel());
//		updatedPharm.get().setPharmCRN(updatePharmPostReq.getPharmCRN());
//
//		long updatedPharmSeq = pharmRepository.save(updatedPharm.get()).getPharmSeq();
//
//		PharmInfo pharmInfo = new PharmInfo(
//				userRepository.findUserByUserSeq(userSeq).get(),
//				pharmRepository.findPharmByPharmUserSeq(userSeq).get()
//		);
//
//		return pharmInfo;
//	}
//
//	@Override
//	public void deletePharm(long userSeq) {
//		userRepository.delete(userRepository.findUserByUserSeq(userSeq).get());
//		pharmRepository.delete(pharmRepository.findPharmByPharmUserSeq(userSeq).get());
//	}

}
