/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class FindAll {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}