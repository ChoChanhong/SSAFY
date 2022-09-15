package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QHospital is a Querydsl query type for Hospital
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QHospital extends EntityPathBase<Hospital> {

    private static final long serialVersionUID = -291629060L;

    public static final QHospital hospital = new QHospital("hospital");

    public final StringPath hospitalAddr = createString("hospitalAddr");

    public final StringPath hospitalCRN = createString("hospitalCRN");

    public final StringPath hospitalEmail = createString("hospitalEmail");

    public final StringPath hospitalId = createString("hospitalId");

    public final StringPath hospitalLicense = createString("hospitalLicense");

    public final StringPath hospitalName = createString("hospitalName");

    public final StringPath hospitalPassword = createString("hospitalPassword");

    public final NumberPath<Long> hospitalSeq = createNumber("hospitalSeq", Long.class);

    public final StringPath hospitalTel = createString("hospitalTel");

    public final StringPath hospitalWalletAddress = createString("hospitalWalletAddress");

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public QHospital(String variable) {
        super(Hospital.class, forVariable(variable));
    }

    public QHospital(Path<? extends Hospital> path) {
        super(path.getType(), path.getMetadata());
    }

    public QHospital(PathMetadata metadata) {
        super(Hospital.class, metadata);
    }

}

