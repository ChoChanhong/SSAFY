package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 병원 회원가입 API ([POST] /hospitals/regist) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("HospitalRegisterPostRequest")
public class HospitalRegisterPostReq {
	// 아이디, 비밀번호, 이메일, 면허번호, 이름, 주소, 전화번호, 사업자등록번호
	@ApiModelProperty(name = "병원 아이디", example="ssafy")
	String hospitalId;

	@ApiModelProperty(name = "병원 비밀번호", example="ssafy")
	String hospitalPassword;

	@ApiModelProperty(name = "병원 이메일", example = "ssafy@ssafy.com")
	String hospitalEmail;

	@ApiModelProperty(name = "병원 면허 번호", example = "00000")
	String hospitalLicense;

	@ApiModelProperty(name = "병원 이름", example = "철이 정형외과")
	String hospitalName;

	@ApiModelProperty(name = "병원 주소", example = "부산 강서구 녹산산업중로 333")
	String hospitalAddr;

	@ApiModelProperty(name = "병원 전화번호", example = "000-0000-0000")
	String hospitalTel;

	@ApiModelProperty(name = "병원 사업자등록번호", example = "000-00-00000")  // CRN: Company Registration Number, 사업자등록번호
	String hospitalCRN;
}