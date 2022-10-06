package com.ssafy.api.controller;

import com.ssafy.api.request.CreateHospitalPostReq;
import com.ssafy.api.request.SearchPatientPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.HospitalService;
import com.ssafy.api.service.PatientService;
import com.ssafy.api.service.PrescriptionService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.common.customObject.PrescriptionInfo;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Hospital;
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
 * 병원 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "병원 API", tags = {"Hospital"})
@RestController
@RequestMapping("/hospitals")
public class HospitalController {

	// 의존성 주입
	@Autowired
	UserService userService;
	@Autowired
	HospitalService hospitalService;
	@Autowired
	PatientService patientService;
	@Autowired
	PrescriptionService prescriptionService;
	@Autowired
	PasswordEncoder passwordEncoder;

	/**
	 * 병원 회원가입
	 */
	@PostMapping("/regist")
	@ApiOperation(value = "회원 가입", notes = "병원 회원가입")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 400, message = "가입 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "가입 양식 오류"),
			@ApiResponse(code = 402, message = "등록된 아이디", response = BaseResponseBody.class),
			@ApiResponse(code = 403, message = "등록된 CRN", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) CreateHospitalPostReq createHospitalPostReq) {

		if (createHospitalPostReq.getHospitalId() == null ||
			createHospitalPostReq.getHospitalPassword() == null ||
			createHospitalPostReq.getHospitalName() == null ||
			createHospitalPostReq.getHospitalDoctor() == null ||
			createHospitalPostReq.getHospitalEmail() == null ||
			createHospitalPostReq.getHospitalCode() == null ||
			createHospitalPostReq.getHospitalLicense() == null ||
			createHospitalPostReq.getHospitalAddr() == null ||
			createHospitalPostReq.getHospitalTel() == null ||
			createHospitalPostReq.getHospitalCRN() == null ||
			createHospitalPostReq.getHospitalWalletAddr() == null) {
				return new ResponseEntity<>("가입에 필요한 모든 데이터를 입력해주세요.", HttpStatus.valueOf(400));
		}

		String hospitalId = createHospitalPostReq.getHospitalId();
		String hospitalCRN = createHospitalPostReq.getHospitalCRN();

		// Id와 CRN 중복 체크
		if (userService.existsByUserId(hospitalId)) {
			return new ResponseEntity<>(hospitalId + " 은/는 등록된 아이디입니다.", HttpStatus.valueOf(402));
		} else if (hospitalService.existsByHospitalCRN(hospitalCRN)) {
			return new ResponseEntity<>(hospitalCRN + " 은/는 등록된 CRN입니다.", HttpStatus.valueOf(403));
		}

		// 등록된 Id와 CRN이 없는 경우 가입 진행
		hospitalService.createHospital(createHospitalPostReq);

		if (userService.existsByUserId(hospitalId)) {
			return new ResponseEntity<>(createHospitalPostReq.getHospitalId() + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("가입에 실패하였습니다.", HttpStatus.valueOf(400));
	}

	/**
	 * 병원 로그인
	 */
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {

		String hospitalId = loginInfo.getUserId();
		String hospitalPassword = loginInfo.getUserPassword();

		User user = userService.getUserByUserId(hospitalId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(hospitalPassword, user.getUserPassword()) && user.getUserIdx() == 1) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(hospitalId)));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}

	/**
	 * 병원 정보 조회
	 */
	@GetMapping("/me")
	@ApiOperation(value = "병원 정보 조회", notes = "로그인한 병원의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getPatientInfo(@ApiIgnore Authentication authentication) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// jwt 토큰에서 user 가져오기
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();

		// 병원 정보 가져오기
		HospitalInfo hospitalInfo = hospitalService.getHospitalInfo(user.getUserSeq());

		// 병원 정보 반환
		if (hospitalInfo != null) {
			return new ResponseEntity<HospitalInfo>(hospitalInfo, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("등록된 병원이 없습니다", HttpStatus.valueOf(404));
	}


	/**
	 * 병원 정보 수정
	 */
	@PutMapping(value="me")
	@ApiOperation(value = "병원 정보 수정", notes = "로그인한 병원의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 402, message = "등록된 아이디"),
			@ApiResponse(code = 403, message = "등록된 CRN"),
			@ApiResponse(code = 404, message = "병원 정보 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> updatePatientInfo(@ApiIgnore Authentication authentication,
											   @RequestBody @ApiParam(value="병원 정보 수정", required = true) CreateHospitalPostReq updateHospitalInfo) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// 토큰에 저장된 정보
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		User user = userDetails.getUser();
		Hospital hospital = hospitalService.getHospital(user.getUserSeq());

		// 병원 없음
		if (!userService.existsByUserId(user.getUserId())) { // 등록된 병원이 없습니다.
			return new ResponseEntity<>("등록된 병원이 없습니다.", HttpStatus.valueOf(404));
		}

		String updateHospitalId = updateHospitalInfo.getHospitalId();
		String updateHospitalCRN = updateHospitalInfo.getHospitalCRN();

		// Id와 CRN 중복 불가
		if (!user.getUserId().equals(updateHospitalId) && userService.existsByUserId(updateHospitalId)) { // 아이디가 현재와 다를시 중복 조회
			return new ResponseEntity<>(updateHospitalId + "은/는 등록된 아이디입니다.", HttpStatus.valueOf(402));
		} else if (!hospital.getHospitalCRN().equals(updateHospitalCRN) && hospitalService.existsByHospitalCRN(updateHospitalCRN)) { // CRN이 현재와 다를시 중복 조회
			return new ResponseEntity<>(updateHospitalCRN + "은/는 등록된 CRN입니다.", HttpStatus.valueOf(403));
		}

		// 병원 정보 업데이트
		HospitalInfo hospitalInfo = hospitalService.updateHospital(user.getUserSeq(), updateHospitalInfo);

		if (hospitalInfo != null) {
			return new ResponseEntity<>(hospitalInfo, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	/**
	 * 병원 정보 삭제
	 */
	@DeleteMapping(value="me")
	@ApiOperation(value = "병원 탈퇴", notes = "로그인한 병원의 탈퇴를 처리한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> deleteHospital(@ApiIgnore Authentication authentication) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// 토큰에 저장된 정보
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();

		if (user == null) {
			return new ResponseEntity<>(user.getUserId() + "의 병원 정보가 없습니다", HttpStatus.valueOf(404));
		}

		// 병원 삭제
		hospitalService.deleteHospital(user.getUserSeq());
		return new ResponseEntity<>(user.getUserId() + "의 병원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
	}


	/**
	 * 환자 처방전 조회
	 */
	@GetMapping("/prescriptionList")
	@ApiOperation(value = "환자 처방전 조회", notes = "로그인한 환자의 처방전 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 404, message = "처방전 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getPrescriptionList(@ApiIgnore Authentication authentication) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// 토큰에 저장된 정보
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();

		// 처방전 리스트 목록
		ArrayList<Prescription> prescriptions = new ArrayList<>();
		prescriptions.addAll(prescriptionService.getHospitalPrescriptionList(user.getUserSeq()));

		// 처방전 없음
		if (prescriptions.isEmpty()) {
			return new ResponseEntity<>("처방전 없음", HttpStatus.valueOf(404));
		}

		// 처방전 내용 복원
		ArrayList<PrescriptionInfo> prescriptionInfos = new ArrayList<>();
		for ( Prescription p: prescriptions ) {
			// 환자 정보
			PrescriptionInfo prescriptionInfo = prescriptionService.getPrescriptionInfo(p);
			prescriptionInfos.add(prescriptionInfo);
		}

		// 처방전 정보 리턴
		return new ResponseEntity<List<PrescriptionInfo>>(prescriptionInfos, HttpStatus.valueOf(200));
	}



	/**
	 *  이름과 주민등록번호를 통해 환자 검색
	 */
	@PostMapping("/search")
	@ApiOperation(value = "환자 검색", notes = "로그인한 병원의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 402, message = "환자 없음"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> searchPatient(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="병원 정보 수정", required = true) SearchPatientPostReq searchPatientPostReq) {

			PatientInfo patientInfo = patientService.searchPatient(searchPatientPostReq.getPatientName(), searchPatientPostReq.getPatientRRN());

			if (patientInfo != null) {
				return new ResponseEntity<PatientInfo>(patientInfo, HttpStatus.valueOf(200));
			}

		return new ResponseEntity<>("환자를 검색할 수 없습니다.", HttpStatus.valueOf(402));
	}
}
