package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 약국 로그인 API ([POST] /pharms/login) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PharmLoginPostResponse")
public class PharmLoginPostRes extends BaseResponseBody{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;

	public static PharmLoginPostRes of(Integer statusCode, String message, String accessToken) {
		PharmLoginPostRes res = new PharmLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		return res;
	}
}
