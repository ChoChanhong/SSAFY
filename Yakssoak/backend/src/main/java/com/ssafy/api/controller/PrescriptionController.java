package com.ssafy.api.controller;


import com.ssafy.api.request.*;
import com.ssafy.api.service.HospitalService;
import com.ssafy.api.service.PatientService;
import com.ssafy.api.service.PrescriptionService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.customObject.HospitalInfo;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.db.entity.Prescription;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 처방전 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "처방전 API", tags = {"Prescription"})
@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

	// 의존성 주입
	@Autowired
	UserService userService;
	@Autowired
	PrescriptionService	prescriptionService;
	@Autowired
	HospitalService hospitalService;
	@Autowired
	PatientService patientService;

	@PostMapping("/regist")
	@ApiOperation(value = "처방전 생성", notes = "처방전을 생성한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 402, message = "생성 권한 없음"),
			@ApiResponse(code = 403, message = "생성 권한 없음"),
			@ApiResponse(code = 405, message = "생성 권한 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> createPrescription(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="처방전 정보", required = true) CreatePrescriptionPostReq createPrescriptionPostReq) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// jwt 토큰에서 user 가져오기
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();
		HospitalInfo hospitalInfo = hospitalService.getHospitalInfo(user.getUserSeq());

		// 의사(1)만 처방전 생성 가능
		if (hospitalInfo.getUserIdx() != 1) {
			return new ResponseEntity<>("처방전 생성 권한이 없습니다.", HttpStatus.valueOf(405));
		}

		if (!patientService.existsByPatientUserSeq(createPrescriptionPostReq.getPatientUserSeq())) {
			return new ResponseEntity<>("지정된 환자가 없습니다.", HttpStatus.valueOf(402));
		} else if (createPrescriptionPostReq.getTokenId() == null) {
			return new ResponseEntity<>("토큰 ID가 없습니다.", HttpStatus.valueOf(403));
		}

		prescriptionService.createPrescription(user.getUserSeq(), createPrescriptionPostReq);
		return new ResponseEntity<>("처방전 발행이 완료되었습니다", HttpStatus.valueOf(200));
	}

	/**
	 * 처방전 약국 정보 추가
	 */
	@PutMapping(value="updatePharm")
	@ApiOperation(value = "처방전 약국 정보 추가", notes = "처방전에 약국 정보를 추가한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 402, message = "지정 권한 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> updatePrescriptionPharm(@ApiIgnore Authentication authentication,
													 @RequestBody @ApiParam(value="처방전 약국 정보 추가", required = true) UpdatePrescriptionPharmPostReq updatePrescriptionPharmPostReq) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// jwt 토큰에서 user 가져오기
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();

		// 환자(0)만 약국 지정 가능
		if (user.getUserIdx() != 0) {
			return new ResponseEntity<>("약국 지정 권한이 없습니다.", HttpStatus.valueOf(402));
		}

		// 처방전에 약국 정보 추가
		Prescription prescription = prescriptionService.updatePrescriptionPharm(updatePrescriptionPharmPostReq.getPrescriptionSeq(), updatePrescriptionPharmPostReq.getPharmUserSeq());

		if (prescription != null) {
			return new ResponseEntity<>(prescription, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}


	/**
	 * 처방전 사용 완료
	 */
	@PutMapping(value="updateCompletion")
	@ApiOperation(value = "처방전 사용 완료", notes = "처방전 사용 완료 처리한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "인증 실패(토큰 없음)"),
			@ApiResponse(code = 402, message = "수정 권한 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> updatePrescriptionCompletion(@ApiIgnore Authentication authentication,
														  @RequestBody @ApiParam(value="처방전 사용 정보 추가", required = true)UpdatePrescriptionCompletionPostReq updatePrescriptionCompletionPostReq) {

		// 토큰 확인
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(401));
		}

		// jwt 토큰에서 user 가져오기
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();

		// 약사(2)만 약국 지정 가능
		if (user.getUserIdx() != 2) {
			return new ResponseEntity<>("처방전 수정 권한이 없습니다.", HttpStatus.valueOf(402));
		}


		// 처방전 사용 완료
		Prescription prescription = prescriptionService.updatePrescriptionCompletion(updatePrescriptionCompletionPostReq.getPrescriptionSeq());

		if (prescription != null) {
			return new ResponseEntity<>(prescription, HttpStatus.valueOf(200));
		}

		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}


	/**
	 *  token Id를 통해 환자 지갑 주소 검색
	 */
	@PostMapping("/searchPatientWallet")
	@ApiOperation(value = "환자 지갑 검색", notes = "token Id를 통해 환자 지갑 주소 검색")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 402, message = "환자 없음"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> searchPatient(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="환자 지갑 검색", required = true) SearchPatientByTokenPostReq searchPatientByTokenPostReq) {

		// tokenId로 처방전 검색
		String tokenId = searchPatientByTokenPostReq.getTokenId();
		Prescription prescription;
		try {
			prescription = prescriptionService.getPrescription(Long.parseLong(tokenId));
		} catch (Exception e) {
			return new ResponseEntity<>("토큰 없음.", HttpStatus.valueOf(403));
		}

		// 처방전의 환자 seq
		long patientUserSeq = prescription.getPatientUserSeq();
		String addr = userService.getUserByUserSeq(patientUserSeq).getUserWalletAddress();

		if (addr == null) {
			return new ResponseEntity<>("환자를 검색할 수 없습니다.", HttpStatus.valueOf(402));
		}
		return new ResponseEntity<>(addr, HttpStatus.valueOf(200));
	}
}
