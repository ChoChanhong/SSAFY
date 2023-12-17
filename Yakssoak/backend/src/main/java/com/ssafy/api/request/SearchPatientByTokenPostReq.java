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
@ApiModel("SearchPatientByTokenPostReq")
public class SearchPatientByTokenPostReq {

	@ApiModelProperty(name = "토큰 아이디", example = "00000")
	String tokenId;
}