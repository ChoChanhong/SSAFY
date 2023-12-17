package com.ssafy.api.controller;

import com.ssafy.api.request.SearchPatientPostReq;
import com.ssafy.api.service.PatientService;
import com.ssafy.common.customObject.PatientInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/")
public class UserController {

	// 의존성 주입
	@Autowired
	UserService userService;
	@Autowired
	PatientService patientService;
	@Autowired
	PasswordEncoder passwordEncoder;

	/**
	 *  이름과 주민등록번호를 통해 환자 검색
	 */
	@PostMapping("/search")
	@ApiOperation(value = "환자 검색", notes = "로그인한 병원의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 404, message = "환자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> searchPatient(
			@RequestBody @ApiParam(value="병원 정보 수정", required = true) SearchPatientPostReq searchPatientPostReq) {

		PatientInfo patientInfo = patientService.searchPatient(searchPatientPostReq.getPatientName(), searchPatientPostReq.getPatientRRN());

		if (patientInfo != null) {
			return new ResponseEntity<PatientInfo>(patientInfo, HttpStatus.valueOf(200));
		}

		return new ResponseEntity<>("환자를 검색할 수 없습니다.", HttpStatus.valueOf(404));
	}
}
