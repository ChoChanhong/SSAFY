package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * 유저 회원가입 API ([POST] /users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {

	@ApiModelProperty(name="회원 아이디", example="ssafy")
	String userId;

	@ApiModelProperty(name="회원 비밀번호", example="ssafy")
	String userPassword;

	@ApiModelProperty(name = "회원 이름", example = "김싸피")
	String userName;

	@ApiModelProperty(name = "회원 이메일", example = "ssafy@ssafy.com")
	String userEmail;

	@ApiModelProperty(name = "회원 전화번호", example = "010-0000-0000")
	String userTel;
}