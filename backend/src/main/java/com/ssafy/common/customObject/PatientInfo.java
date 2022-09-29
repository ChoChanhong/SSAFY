package com.ssafy.common.customObject;

import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientInfo {
    User user;
    Patient patient;

//    String patientId;
//    String patientPassword;
//    String patientName;
//    String patientEmail;
//    String patientRRN;
//    String patientWalletAddr;
}