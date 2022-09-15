package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

import java.util.Optional;
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
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();

		user.setUserId(userRegisterInfo.getUserId());
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		user.setUserName(userRegisterInfo.getUserName());
		user.setUserRRN(userRegisterInfo.getUserRRN());
		user.setUserTel(userRegisterInfo.getUserTel());
		user.setUserEmail(userRegisterInfo.getUserEmail());

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepository.findByUserId(userId).get();
		return user;
	}

	// userID 중복 체크
	@Override
	public boolean checkIdDuplicated(String userId) {
		if (userRepository.countByUserId(userId) == 0) {
			return true;
		}
		return false;
	}

	// userRRN 중복 체크
	@Override
	public boolean checkRRNDuplicated(String userRRN) {
		if (userRepository.countByUserRRN(userRRN) == 0) {
			return true;
		}
		return false;
	}

	// 회원 정보 수정
	@Override
	public User updateUserInfo(String userId, UserRegisterPostReq updateInfo) {
		Optional<User> updatedUser = userRepository.findByUserId(userId);

		if (updatedUser.isPresent()) {
			updatedUser.get().setUserId(updateInfo.getUserId());

			if (userRepository.countByUserId(updateInfo.getUserId()) != 0) {
				if (!updatedUser.get().getUserId().equals(updateInfo.getUserId())) {
					return null;
				}
			}
			updatedUser.get().setUserId(updateInfo.getUserId());
			updatedUser.get().setUserPassword(passwordEncoder.encode(updateInfo.getUserPassword()));
			updatedUser.get().setUserName(updateInfo.getUserName());
			updatedUser.get().setUserRRN(updateInfo.getUserRRN());
			updatedUser.get().setUserTel(updateInfo.getUserTel());
			updatedUser.get().setUserEmail(updateInfo.getUserEmail());

		}
		userRepository.save(updatedUser.get());
		return updatedUser.get();
	}

	@Override
	public void deleteUser(User user) { userRepository.delete(user); }
}
