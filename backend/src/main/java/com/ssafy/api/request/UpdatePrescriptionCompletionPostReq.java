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
@ApiModel("UpdatePrescriptionPharmPostReq")
public class UpdatePrescriptionCompletionPostReq {

	@ApiModelProperty(name = "처방전 번호", example="0000000")
	long prescriptionSeq;
}