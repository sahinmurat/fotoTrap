import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn()
    @ApiProperty()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: "first_name", nullable: true })
    firstName: string

    @Column({ name: "last_name", nullable: true })
    lastName: string
}