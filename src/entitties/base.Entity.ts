import {
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    isDeleted: Date | null;

    @Column({ default: true })
    isActive: boolean;
}
