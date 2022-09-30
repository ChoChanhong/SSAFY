package com.ssafy.common.customObject;

import com.ssafy.db.entity.Hospital;
import com.ssafy.db.entity.Pharm;
import com.ssafy.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PharmInfo {
    User user;
    Pharm pharm;
}