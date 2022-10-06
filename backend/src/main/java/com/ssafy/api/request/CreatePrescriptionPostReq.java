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
@ApiModel("CreatePrescriptionPostReq")
public class CreatePrescriptionPostReq {

	@ApiModelProperty(name = "환자 번호", example="0000000")
	long patientUserSeq;

//	@ApiModelProperty(name = "병원 번호", example="000000")
//	long hospitalUserSeq;

	@ApiModelProperty(name = "토큰 ID", example = "000000000")
//	long tokenId;
	String tokenId;
}