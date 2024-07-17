import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TodoDto {
  @ApiProperty({ example: 1, required: true })
  readonly id: number;

  @ApiProperty({ example: 'Hacer la colada', required: true })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: true, required: true })
  @IsNotEmpty()
  readonly isCompleted: boolean;

  @ApiProperty({ example: new Date(), required: true })
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty({ example: new Date(), required: true })
  @IsNotEmpty()
  readonly updatedAt: Date;

  @ApiProperty({ example: new Date(), required: false })
  readonly deletedAt: Date;
}
