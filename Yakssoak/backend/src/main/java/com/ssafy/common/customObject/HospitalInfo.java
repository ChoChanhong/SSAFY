package com.ssafy.common.customObject;

import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HospitalInfo {
//    User user;
//    Hospital hospital;

    long userSeq;
    String userId;
    String userPassword;
    String userName;
    String userEmail;
    int userIdx;
    String userWalletAddress;
    LocalDateTime userREG_DTM;
    LocalDateTime userMOD_DTM;

    long hospitalSeq;
    long hospitalUserSeq;
    String hospitalDoctor;
    String hospitalLicense;
    String hospitalCode;
    String hospitalAddr;
    String hospitalTel;
    String hospitalCRN;
    LocalDateTime patientREG_DTM;
    LocalDateTime patientMOD_DTM;
}