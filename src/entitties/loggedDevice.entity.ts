import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.Entity";
import { UserEntity } from "./User.entity";


@Entity("loggedDevices")
@Index("IDX_userRecord", ["userRecord"])
@Index("IDX_authToken", ["authToken"])
@Index("IDX_deviceIdentity", ["deviceIdentity"])
export class LoggedDeviceEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userRecord" })
  user: UserEntity;

  @Column({ type: "int" })
  userRecord: number;

  @Column({ type: "text",nullable:true })
  authToken?: string | null;

  @Column({ type: "text" })
  deviceIdentity: string | null;

  @Column({ type: "text" })
  fcmToken: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

