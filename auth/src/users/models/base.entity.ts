import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ description: 'Generated identifier', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Create date' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ description: 'Update date' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ApiProperty({ description: 'Delete date' })
  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
