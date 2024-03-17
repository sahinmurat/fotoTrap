import { ApiProperty } from '@nestjs/swagger';
import { ComponentType } from '../models/component-type.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Component {
  @PrimaryColumn()
  @ApiProperty()
  id: string;

  @Column({
    type: 'enum',
    enum: ComponentType
  })
  @ApiProperty()
  type: string

  @Column({ name: 'created_date'})
  @ApiProperty()
  createdDate: string
}
