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

import java.util.List;
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
		user.setUserWalletAddress(createPharmPostReq.getPharmWalletAddr());
		user.setUserIdx(2);

		long userSeq = userRepository.save(user).getUserSeq();

		pharm.setPharmUserSeq(userSeq);
		pharm.setPharmPharmacist(createPharmPostReq.getPharmPharmacist());
		pharm.setPharmLicense(createPharmPostReq.getPharmLicense());
		pharm.setPharmCode(createPharmPostReq.getPharmCode());
		pharm.setPharmAddr(createPharmPostReq.getPharmAddr());
		pharm.setPharmTel(createPharmPostReq.getPharmTel());
		pharm.setPharmCRN(createPharmPostReq.getPharmCRN());

		long pharmUserSeq = pharmRepository.save(pharm).getPharmUserSeq();

		// pharmInfo
		User inputU = userRepository.findUserByUserSeq(userSeq).get();
		Pharm inputM = pharmRepository.findPharmByPharmUserSeq(pharmUserSeq).get();

		PharmInfo pharmInfo = new PharmInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputM.getPharmSeq(), inputM.getPharmUserSeq(), inputM.getPharmPharmacist(),inputM.getPharmLicense(), inputM.getPharmCode(),
				inputM.getPharmAddr(), inputM.getPharmTel(), inputM.getPharmCRN(), inputM.getREG_DTM(), inputM.getMOD_DTM());

		return pharmInfo;
	}

	@Override
	public Pharm getPharm(long pharmUserSeq) {
		return pharmRepository.findPharmByPharmUserSeq(pharmUserSeq).get();
	}

	// CRN 중복 검사
	@Override
	public boolean existsByPharmCRN(String pharmCRN) {
		if (pharmRepository.existsByPharmCRN(pharmCRN)) {
			return true; // 존재
		}
		return false;
	}

	@Override
	public PharmInfo getPharmInfo(long userSeq) {
		// pharmInfo
		User inputU = userRepository.findUserByUserSeq(userSeq).get();
		Pharm inputM = pharmRepository.findPharmByPharmUserSeq(userSeq).get();

		PharmInfo pharmInfo = new PharmInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputM.getPharmSeq(), inputM.getPharmUserSeq(), inputM.getPharmPharmacist(),inputM.getPharmLicense(), inputM.getPharmCode(),
				inputM.getPharmAddr(), inputM.getPharmTel(), inputM.getPharmCRN(), inputM.getREG_DTM(), inputM.getMOD_DTM());

		return pharmInfo;
	}

	// 회원 정보 수정
	@Override
	public PharmInfo updatePharm(long userSeq, CreatePharmPostReq updatePharmPostReq) {
		Optional<User> updatedUser = userRepository.findUserByUserSeq(userSeq);
		Optional<Pharm> updatedPharm = pharmRepository.findPharmByPharmUserSeq(userSeq);

		updatedUser.get().setUserPassword(passwordEncoder.encode(updatePharmPostReq.getPharmPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		updatedUser.get().setUserName(updatePharmPostReq.getPharmName());
		updatedUser.get().setUserEmail(updatePharmPostReq.getPharmEmail());
		updatedUser.get().setUserWalletAddress(updatePharmPostReq.getPharmWalletAddr());

		long updatedUserSeq = userRepository.save(updatedUser.get()).getUserSeq();

		updatedPharm.get().setPharmPharmacist(updatePharmPostReq.getPharmPharmacist());
		updatedPharm.get().setPharmLicense(updatePharmPostReq.getPharmLicense());
		updatedPharm.get().setPharmCode(updatePharmPostReq.getPharmCode());
		updatedPharm.get().setPharmAddr(updatePharmPostReq.getPharmAddr());
		updatedPharm.get().setPharmTel(updatePharmPostReq.getPharmTel());
		updatedPharm.get().setPharmCRN(updatePharmPostReq.getPharmCRN());

		long updatedPharmUserSeq = pharmRepository.save(updatedPharm.get()).getPharmUserSeq();

		// pharmInfo
		User inputU = userRepository.findUserByUserSeq(updatedUserSeq).get();
		Pharm inputM = pharmRepository.findPharmByPharmUserSeq(updatedPharmUserSeq).get();

		PharmInfo pharmInfo = new PharmInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputM.getPharmSeq(), inputM.getPharmUserSeq(), inputM.getPharmPharmacist(),inputM.getPharmLicense(), inputM.getPharmCode(),
				inputM.getPharmAddr(), inputM.getPharmTel(), inputM.getPharmCRN(), inputM.getREG_DTM(), inputM.getMOD_DTM());

		return pharmInfo;
	}

	@Override
	public void deletePharm(long userSeq) {
		userRepository.delete(userRepository.findUserByUserSeq(userSeq).get());
		pharmRepository.delete(pharmRepository.findPharmByPharmUserSeq(userSeq).get());
	}

	@Override
	public List<Pharm> getPharmList() {

		return pharmRepository.findAll();
	}

}