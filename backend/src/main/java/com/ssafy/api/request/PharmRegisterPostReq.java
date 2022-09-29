//package com.ssafy.api.request;
//
//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
//import lombok.Getter;
//import lombok.Setter;
//
///**
// * 약국 회원가입 API ([POST] /pharms/regist) 요청에 필요한 리퀘스트 바디 정의.
// */
//@Getter
//@Setter
//@ApiModel("PharmRegisterPostRequest")
//public class PharmRegisterPostReq {
//	// 아이디, 비밀번호, 이메일, 면허번호, 이름, 주소, 전화번호, 사업자등록번호
//	@ApiModelProperty(name = "약국 아이디", example="ssafy")
//	String pharmId;
//
//	@ApiModelProperty(name = "약국 비밀번호", example="ssafy")
//	String pharmPassword;
//
//	@ApiModelProperty(name = "약국 이메일", example = "ssafy@ssafy.com")
//	String pharmEmail;
//
//	@ApiModelProperty(name = "약국 면허 번호", example = "00000")
//	String pharmLicense;
//
//	@ApiModelProperty(name = "약국 이름", example = "철이네 약국")
//	String pharmName;
//
//	@ApiModelProperty(name = "약국 주소", example = "부산 강서구 녹산산업중로 333")
//	String pharmAddr;
//
//	@ApiModelProperty(name = "약국 전화번호", example = "000-0000-0000")
//	String pharmTel;
//
//	@ApiModelProperty(name = "약국 사업자등록번호", example = "000-00-00000")  // CRN: Company Registration Number, 사업자등록번호
//	String pharmCRN;
//}