import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscribe {
    @PrimaryGeneratedColumn()
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
