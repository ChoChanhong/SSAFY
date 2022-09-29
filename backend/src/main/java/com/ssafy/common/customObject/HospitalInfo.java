package com.ssafy.common.customObject;

import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HospitalInfo {
    User user;
    Hospital hospital;
}