import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Hacer la colada', required: true })
  @IsNotEmpty()
  readonly title: string;
}
