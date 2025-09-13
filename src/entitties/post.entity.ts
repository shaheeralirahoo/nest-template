import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.Entity";
import { UserEntity } from "./User.entity";

@Entity("Post")
export class PostEntity extends BaseEntity {

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    image: string;


    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "createdby" })
    user: UserEntity;

    @Column({ type: "int" })
    createdby: number;
}
