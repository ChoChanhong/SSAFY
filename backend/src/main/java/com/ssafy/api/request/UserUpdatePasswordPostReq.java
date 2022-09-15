package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 비밀번호 수정 API ([POST] /users/me) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserUpdatePasswordPostReq {

	@ApiModelProperty(name="회원 비밀번호", example="ssafy")
	String userPassword;
}