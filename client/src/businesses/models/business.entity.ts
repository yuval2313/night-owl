import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../models/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('businesses')
export class Business extends BaseEntity {
  @ApiProperty({ description: "Business's name", example: 'The Local Inn' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Metadata object containing various properties' })
  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;
}
