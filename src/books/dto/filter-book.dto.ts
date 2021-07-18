import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  category: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  min_year: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_year: string;
}
