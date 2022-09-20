package com.ssafy.api.controller;

import com.ssafy.api.request.PharmLoginPostReq;
import com.ssafy.api.request.PharmRegisterPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.PharmLoginPostRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.PharmService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Pharm;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.apache.commons.collections4.bag.SynchronizedSortedBag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 약국 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "약국 API", tags = {"Pharm"})
@RestController
@RequestMapping("/pharms")
public class PharmController {

	@Autowired  // 의존성 주입
	UserService userService;

	@Autowired
	PharmService pharmService;

	@Autowired
	PasswordEncoder passwordEncoder;

	/**
	 * 약국 회원가입
	 */
	@PostMapping("/regist")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 비밀번호, 이메일, 면허 번호, 이름, 주소, 전화번호, 사업자등록번호</strong>을 통해 회원가입 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "아이디 중복"),
			@ApiResponse(code = 402, message = "사업자등록번호 중복")
	})
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) PharmRegisterPostReq pharmRegisterPostReq) {

		String pharmId = pharmRegisterPostReq.getPharmId();
		String pharmCRN = pharmRegisterPostReq.getPharmCRN();

//		 아이디와 사업자등록번호 중복 체크 후 회원가입 진행
		if (!pharmService.checkIdDuplicated(pharmId) && !pharmService.checkCRNDuplicated(pharmCRN)) {
			Pharm pharm = pharmService.createPharm(pharmRegisterPostReq);

			return new ResponseEntity<>(pharmId + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));
		}

		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}


	// 약국 아이디 중복 체크
	@GetMapping("me/{pharmId}")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@ApiOperation(value = "아이디 중복 체크", notes = "중복이면 true, 없다면 false")
	public ResponseEntity<Boolean> checkId(@PathVariable("pharmId") String pharmId) {
		return new ResponseEntity<Boolean>(pharmService.checkIdDuplicated(pharmId), HttpStatus.OK);
	}

	/**
	 * 약국 로그인
	 */
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = PharmLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<PharmLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) PharmLoginPostReq pharmLoginPostReq) {
		String pharmId = pharmLoginPostReq.getPharmId();
		String pharmPassword = pharmLoginPostReq.getPharmPassword();

		Pharm pharm = pharmService.getPharmByPharmId(pharmId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(pharmPassword, pharm.getPharmPassword())) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(PharmLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(pharmId)));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(PharmLoginPostRes.of(401, "Invalid Password", null));
	}


	/**
	 * 약국 정보 조회
	 */
	@GetMapping("/me")
	@ApiOperation(value = "약국 정보 조회", notes = "로그인한 약국의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getPharmInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String pharmId = userDetails.getUsername();
		Pharm pharm = pharmService.getPharmByPharmId(pharmId);

		if (pharm != null) {
			return new ResponseEntity<Pharm>(pharm, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	/**
	 * 약국 정보 수정
	 */
	@PutMapping(value="me")
	@ApiOperation(value = "약국 정보 수정", notes = "로그인한 약국의 정보를 수정한다.")
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
											@RequestBody @ApiParam(value="회원가입 정보", required = true) PharmRegisterPostReq pharmUpdatePostReq) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String pharmId = userDetails.getUsername();

		if (pharmId.equals(pharmUpdatePostReq.getPharmId())) {
			Pharm pharm = pharmService.updatePhramInfo(pharmId, pharmUpdatePostReq);

			if (pharm == null)
				return new ResponseEntity<>("무결성 오류입니다", HttpStatus.valueOf(405));
			return new ResponseEntity<>(pharm, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}


	/**
	 * 약국 정보 삭제
	 */
	@DeleteMapping(value="me")
	@ApiOperation(value = "약국 탈퇴", notes = "로그인한 약국의 탈퇴를 처리한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> deletePharm(@ApiIgnore Authentication authentication) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String pharmId = userDetails.getUsername();
		Pharm pharm = pharmService.getPharmByPharmId(pharmId);

		if (pharm == null) {
			return new ResponseEntity<>(pharmId + "의 약국 정보가 없습니다", HttpStatus.valueOf(404));
		}
		pharmService.deletePharm(pharm);
		return new ResponseEntity<>(pharmId + "의 약국 정보가 삭제되었습니다", HttpStatus.valueOf(200));
	}
}
