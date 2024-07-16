import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Hacer la colada', required: true })
  @IsNotEmpty()
  readonly title: string;
}
