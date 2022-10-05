package com.ssafy.common.customObject;

import com.ssafy.db.entity.Pharm;
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
public class PharmInfo {
//    User user;
//    Pharm pharm;

    long userSeq;
    String userId;
    String userPassword;
    String userName;
    String userEmail;
    int userIdx;
    String userWalletAddress;
    LocalDateTime userREG_DTM;
    LocalDateTime userMOD_DTM;

    long pharmSeq;
    long pharmUserSeq;
    String pharmPharmacist;
    String pharmLicense;
    String pharmCode;
    String pharmAddr;
    String pharmTel;
    String pharmCRN;
    LocalDateTime pharmREG_DTM;
    LocalDateTime pharmMOD_DTM;
}