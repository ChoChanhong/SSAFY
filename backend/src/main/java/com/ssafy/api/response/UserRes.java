package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="회원 아이디")
	String userId;

	@ApiModelProperty(name="회원 비밀번호")
	String userPassword;

	@ApiModelProperty(name = "회원 이름")
	String userName;

	@ApiModelProperty(name = "회원 주민등록번호")
	String userRRN;

	@ApiModelProperty(name = "회원 전화번호")
	String userTel;

	@ApiModelProperty(name = "회원 이메일")
	String userEmail;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		return res;
	}
}
