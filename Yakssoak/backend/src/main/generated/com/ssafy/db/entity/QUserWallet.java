package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserWallet is a Querydsl query type for UserWallet
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserWallet extends EntityPathBase<UserWallet> {

    private static final long serialVersionUID = 335714534L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserWallet userWallet = new QUserWallet("userWallet");

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public final QUser userSeq;

    public final StringPath userWalletAddress = createString("userWalletAddress");

    public final NumberPath<Long> userWalletSeq = createNumber("userWalletSeq", Long.class);

    public QUserWallet(String variable) {
        this(UserWallet.class, forVariable(variable), INITS);
    }

    public QUserWallet(Path<? extends UserWallet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserWallet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserWallet(PathMetadata metadata, PathInits inits) {
        this(UserWallet.class, metadata, inits);
    }

    public QUserWallet(Class<? extends UserWallet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userSeq = inits.isInitialized("userSeq") ? new QUser(forProperty("userSeq")) : null;
    }

}

