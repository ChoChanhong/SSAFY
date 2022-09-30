package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 환자 검색 API ([POST] /) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("SearchPatientPostReq")
public class SearchPatientPostReq {

	@ApiModelProperty(name = "환자 이름", example = "김싸피")
	String patientName;

	@ApiModelProperty(name = "환자 주민등록번호", example = "000000-0000000")
	String patientRRN;
}