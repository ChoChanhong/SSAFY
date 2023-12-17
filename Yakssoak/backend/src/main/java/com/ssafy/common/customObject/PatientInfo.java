package com.ssafy.common.customObject;

import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientInfo {

    // userSeq, userId, userPassword, userName, userEmail, userIdx, userWalletAddress, userREG_DTM, userMOD_DTM
    // patientSeq, patientUserSeq, patientRRN, patientREG_DTM, patientMOD_DTM

    long userSeq;
    String userId;
    String userPassword;
    String userName;
    String userEmail;
    int userIdx;
    String userWalletAddress;
    LocalDateTime userREG_DTM;
    LocalDateTime userMOD_DTM;

    long patientSeq;
    long patientUserSeq;
    String patientRRN;
    LocalDateTime patientREG_DTM;
    LocalDateTime patientMOD_DTM;


}