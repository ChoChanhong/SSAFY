package com.ssafy.common.customObject;

import com.ssafy.db.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionInfo {
    PatientInfo patientInfo;
    HospitalInfo hospitalInfo;
    PharmInfo pharmInfo;
    Prescription prescription;
}