//package com.ssafy.api.service;
//
//import com.ssafy.api.request.PharmRegisterPostReq;
//import com.ssafy.api.request.UserRegisterPostReq;
//import com.ssafy.db.entity.Pharm;
//import com.ssafy.db.entity.User;
//import com.ssafy.db.repository.PharmRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
///**
// *	약국 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
// */
//@Service("pharmService")
//public class PharmServiceImpl implements PharmService {
//	@Autowired
//	PharmRepository pharmRepository;
//
//	@Autowired
//	PasswordEncoder passwordEncoder;
//
//	@Override
//	public Pharm createPharm(PharmRegisterPostReq pharmRegisterPostReq) {
//		Pharm pharm = new Pharm();
//
//		// 아이디, 비밀번호, 이메일, 면허번호, 이름, 주소, 전화번호, 사업자등록번호
//		pharm.setPharmId(pharmRegisterPostReq.getPharmId());
//		pharm.setPharmPassword(passwordEncoder.encode(pharmRegisterPostReq.getPharmPassword()));
//		pharm.setPharmEmail(pharmRegisterPostReq.getPharmEmail());
//		pharm.setPharmLicense(pharmRegisterPostReq.getPharmLicense());
//		pharm.setPharmName(pharmRegisterPostReq.getPharmName());
//		pharm.setPharmAddr(pharmRegisterPostReq.getPharmAddr());
//		pharm.setPharmTel(pharmRegisterPostReq.getPharmTel());
//		pharm.setPharmCRN(pharmRegisterPostReq.getPharmCRN());
//
//		return pharmRepository.save(pharm);
//	}
//
//	// 아이디 중복 검사
//	@Override
//	public boolean checkIdDuplicated(String pharmId) {
//		if (pharmRepository.existsByPharmId(pharmId)) {
//			return true; // 존재
//		}
//		return false; // 존재X
//	}
//
//	// CRN 중복 검사
//	@Override
//	public boolean checkCRNDuplicated(String pharmCRN) {
//		if (pharmRepository.existsByPharmCRN(pharmCRN)) {
//			return true; // 존재
//		}
//		return false;
//	}
//
//	// pharmId를 통해 디비에서 약국 정보 조회
//	@Override
//	public Pharm getPharmByPharmId(String pharmId) {
//		Pharm pharm = pharmRepository.findByPharmId(pharmId).get();
//
//		return pharm;
//	}
//
//	// 약국 정보 수정
//	@Override
//	public Pharm updatePhramInfo(String pharmId, PharmRegisterPostReq pharmUpdatePostReq) {
//		Optional<Pharm> updatedPharm = pharmRepository.findByPharmId(pharmId);
//
//		if (updatedPharm.isPresent()) {
//			updatedPharm.get().setPharmId(pharmUpdatePostReq.getPharmId());
////			아이디는 변경 불가!!
////			if (pharmRepository.existsByPharmId(pharmId)) {
////				if (updatedPharm.get().getPharmId().equals(pharmUpdatePostReq.getPharmId())) {
////					return null;
////				}
////			}
//
//			// 아이디, 비밀번호, 이메일, 면허번호, 이름, 주소, 전화번호, 사업자등록번호
//			updatedPharm.get().setPharmId(pharmUpdatePostReq.getPharmId());
//			updatedPharm.get().setPharmPassword(passwordEncoder.encode(pharmUpdatePostReq.getPharmPassword()));
//			updatedPharm.get().setPharmEmail(pharmUpdatePostReq.getPharmEmail());
//			updatedPharm.get().setPharmLicense(pharmUpdatePostReq.getPharmLicense());
//			updatedPharm.get().setPharmName(pharmUpdatePostReq.getPharmName());
//			updatedPharm.get().setPharmAddr(pharmUpdatePostReq.getPharmAddr());
//			updatedPharm.get().setPharmTel(pharmUpdatePostReq.getPharmTel());
//			updatedPharm.get().setPharmCRN(pharmUpdatePostReq.getPharmCRN());
//		}
//
//		pharmRepository.save(updatedPharm.get());
//		return updatedPharm.get();
//	}
//
//	@Override
//	public void deletePharm(Pharm pharm) { pharmRepository.delete(pharm); }
//}
