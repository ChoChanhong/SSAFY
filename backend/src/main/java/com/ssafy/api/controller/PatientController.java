package com.ssafy.api.controller;

import com.ssafy.api.request.CreatePatientPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.PatientService;
import com.ssafy.api.service.PrescriptionService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.common.customObject.PharmInfo;
import com.ssafy.common.customObject.PrescriptionInfo;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Prescription;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

/**
 * 환자 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "환자 API", tags = {"Patient"})
@RestController
@RequestMapping("/patients")
public class PatientController {

	@Autowired  // 의존성 주입
	UserService userService;

	@Autowired
	PatientService patientService;

	@Autowired
	PrescriptionService prescriptionService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/regist")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 비밀번호, 이름, 주민등록번호, 연락처, 이메일</strong>을 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) CreatePatientPostReq createPatientPostReq) {

		patientService.createPatient(createPatientPostReq);

		return new ResponseEntity<>(createPatientPostReq.getPatientId() + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));

//		String patientId =
//
//		String userId = registerInfo.getUserId();
////		String userRRN = registerInfo.getUserRRN();
//
//		//
//		if (patientService.)
		// 아이디와 주민등록번호 중복 체크 후 회원가입 진행
//		if (userService.checkIdDuplicated(userId) && userService.checkRRNDuplicated(userRRN)) {
//
//			User user = userService.createUser(registerInfo);
//			return new ResponseEntity<>(userId + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));
//		}
//		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String patientId = loginInfo.getUserId();
		String patientPassword = loginInfo.getUserPassword();

		User user = userService.getUserByUserId(patientId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(patientPassword, user.getUserPassword()) && user.getUserIdx() == 0) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(patientId)));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}

	@GetMapping("/me")
	@ApiOperation(value = "환자 정보 조회", notes = "로그인한 환자의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getPatientInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		long userSeq = userService.getUserByUserId(userId).getUserSeq();

		PatientInfo patientInfo = patientService.getPatientInfo(userSeq);

		System.out.println(patientInfo.getPatient().getPatientRRN());

		if (patientInfo != null) {
			return new ResponseEntity<PatientInfo>(patientInfo, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@PutMapping(value="me")
	@ApiOperation(value = "환자 정보 수정", notes = "로그인한 환자의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 404, message = "바디 정보 오류"),
			@ApiResponse(code = 405, message = "무결성 오류"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> updatePatientInfo(@ApiIgnore Authentication authentication,
											@RequestBody @ApiParam(value="환자 정보 수정", required = true) CreatePatientPostReq updatePatientInfo) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		long userSeq = userDetails.getUser().getUserSeq();

		// id 변경 금지
		if (userId.equals(updatePatientInfo.getPatientId())) {
			PatientInfo patientInfo = patientService.updatePatient(userSeq, updatePatientInfo);
			if (patientInfo == null)
				return new ResponseEntity<>("무결성 오류입니다", HttpStatus.valueOf(405));
			return new ResponseEntity<>(patientInfo, HttpStatus.valueOf(200));
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
	public ResponseEntity<?> deletePatient(@ApiIgnore Authentication authentication) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		long userSeq = userService.getUserByUserId(userId).getUserSeq();

		if (user == null) {
			return new ResponseEntity<>(userId + "의 회원 정보가 없습니다", HttpStatus.valueOf(404));
		}
		patientService.deletePatient(userSeq);
		return new ResponseEntity<>(userId + "의 회원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
	}


	@GetMapping("/prescriptionList")
	@ApiOperation(value = "환자 처방전 조회", notes = "로그인한 환자의 처방전 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getPrescriptionList(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		long userSeq = userService.getUserByUserId(userId).getUserSeq();

//		PatientInfo patientInfo = patientService.getPatientInfo(userSeq);

		// 처방전 리스트 목록
		ArrayList<Prescription> prescriptions = new ArrayList<>();
		prescriptions.addAll(prescriptionService.getPatientPrescriptionList(userSeq));

		// 처방전 내용 복원
		ArrayList<PrescriptionInfo> prescriptionInfos = new ArrayList<>();
		for ( Prescription p: prescriptions ) {
			 	// 환자 정보
				PrescriptionInfo prescriptionInfo = prescriptionService.getPrescriptionInfo(p);
				prescriptionInfos.add(prescriptionInfo);
		}


		if (prescriptionInfos.isEmpty()) {
			return new ResponseEntity<>("처방전 없음", HttpStatus.valueOf(400));
		}
		return new ResponseEntity<List<PrescriptionInfo>>(prescriptionInfos, HttpStatus.valueOf(200));

	}

}
