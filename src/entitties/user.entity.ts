import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.Entity';
import { Role } from 'src/utils/app.enums';

@Entity("User")
export class UserEntity extends BaseEntity {

    @Column({ enum: Role, default: Role.User })
    role: Role;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
