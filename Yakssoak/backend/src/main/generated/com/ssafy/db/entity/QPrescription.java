package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPrescription is a Querydsl query type for Prescription
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPrescription extends EntityPathBase<Prescription> {

    private static final long serialVersionUID = 1402997980L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPrescription prescription = new QPrescription("prescription");

    public final QHospital hospitalSeq;

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final QPharm pharmSeq;

    public final NumberPath<Long> prescriptionSeq = createNumber("prescriptionSeq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public final QUser userSeq;

    public QPrescription(String variable) {
        this(Prescription.class, forVariable(variable), INITS);
    }

    public QPrescription(Path<? extends Prescription> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPrescription(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPrescription(PathMetadata metadata, PathInits inits) {
        this(Prescription.class, metadata, inits);
    }

    public QPrescription(Class<? extends Prescription> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hospitalSeq = inits.isInitialized("hospitalSeq") ? new QHospital(forProperty("hospitalSeq")) : null;
        this.pharmSeq = inits.isInitialized("pharmSeq") ? new QPharm(forProperty("pharmSeq")) : null;
        this.userSeq = inits.isInitialized("userSeq") ? new QUser(forProperty("userSeq")) : null;
    }

}

