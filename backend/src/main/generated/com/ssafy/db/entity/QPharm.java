package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QPharm is a Querydsl query type for Pharm
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPharm extends EntityPathBase<Pharm> {

    private static final long serialVersionUID = 468063970L;

    public static final QPharm pharm = new QPharm("pharm");

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final StringPath pharmAddr = createString("pharmAddr");

    public final StringPath pharmCRN = createString("pharmCRN");

    public final StringPath pharmEmail = createString("pharmEmail");

    public final StringPath pharmId = createString("pharmId");

    public final StringPath pharmLicense = createString("pharmLicense");

    public final StringPath pharmName = createString("pharmName");

    public final StringPath pharmPassword = createString("pharmPassword");

    public final NumberPath<Long> pharmSeq = createNumber("pharmSeq", Long.class);

    public final StringPath pharmTel = createString("pharmTel");

    public final StringPath pharmWalletAddress = createString("pharmWalletAddress");

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public QPharm(String variable) {
        super(Pharm.class, forVariable(variable));
    }

    public QPharm(Path<? extends Pharm> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPharm(PathMetadata metadata) {
        super(Pharm.class, metadata);
    }

}

