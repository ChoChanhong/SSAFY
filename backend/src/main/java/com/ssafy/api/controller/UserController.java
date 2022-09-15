package com.ssafy.api.controller;

import com.ssafy.api.request.UserUpdatePasswordPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.User;
//import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired  // 의존성 주입
	UserService userService;

	@PostMapping("/regist")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 비밀번호, 이름, 주민등록번호, 연락처, 이메일</strong>을 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		String userId = registerInfo.getUserId();
		String userRRN = registerInfo.getUserRRN();

		// 아이디와 주민등록번호 중복 체크 후 회원가입 진행
		if (userService.checkIdDuplicated(userId) && userService.checkRRNDuplicated(userRRN)) {

			User user = userService.createUser(registerInfo);
			return new ResponseEntity<>(userId + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
 		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
 		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
 		 */
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);

		if (user != null) {
			return new ResponseEntity<User>(user, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@PutMapping(value="me")
	@ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 404, message = "바디 정보 오류"),
			@ApiResponse(code = 405, message = "무결성 오류"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> updateUserInfo(@ApiIgnore Authentication authentication,
											@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq updateInfo) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();

		if (userId.equals(updateInfo.getUserId())) {
			User user = userService.updateUserInfo(userId, updateInfo);
			if (user == null)
				return new ResponseEntity<>("무결성 오류입니다", HttpStatus.valueOf(405));
			return new ResponseEntity<>(user, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@DeleteMapping(value="me")
	@ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원 본인의 탈퇴를 처리한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> deleteUser(@ApiIgnore Authentication authentication) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);

		if (user == null) {
			return new ResponseEntity<>(userId + "의 회원 정보가 없습니다", HttpStatus.valueOf(404));
		}
		userService.deleteUser(user);
		return new ResponseEntity<>(userId + "의 회원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
	}
}
