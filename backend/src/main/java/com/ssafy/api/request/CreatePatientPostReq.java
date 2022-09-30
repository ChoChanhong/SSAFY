package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 환자 회원가입 API ([POST] /patients) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("CreatePatientPostReq")
public class CreatePatientPostReq {

	@ApiModelProperty(name="환자 아이디", example="ssafy")
	String patientId;

	@ApiModelProperty(name="환자 비밀번호", example="ssafy")
	String patientPassword;

	@ApiModelProperty(name = "환자 이름", example = "김싸피")
	String patientName;

	@ApiModelProperty(name = "환자 이메일", example = "ssafy@ssafy.com")
	String patientEmail;

	@ApiModelProperty(name = "회원 전화번호", example = "010-0000-0000")
	String patientTel;

	@ApiModelProperty(name = "환자 주민등록번호", example = "000000-0000000")
	String patientRRN;
}