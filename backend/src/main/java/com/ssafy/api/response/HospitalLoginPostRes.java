package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 병원 로그인 API ([POST] /hospitals/login) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("HospitalLoginPostResponse")
public class HospitalLoginPostRes extends BaseResponseBody{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;

	public static HospitalLoginPostRes of(Integer statusCode, String message, String accessToken) {
		HospitalLoginPostRes res = new HospitalLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		return res;
	}
}