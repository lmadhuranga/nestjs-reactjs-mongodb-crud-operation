import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Subscribe {
    @ObjectIdColumn()
    id: number;
    
    @Column()
    iss: string;

    @Column()
    exp: string;

    @Column()
    sub: string;

    @Column()
    aud: string;

    @Column()
    nbf: string;

    @Column()
    iat: string;

    @Column()
    jti: string;

    @Column()
    msisdn: string;

    @Column()
    action: string;

}
