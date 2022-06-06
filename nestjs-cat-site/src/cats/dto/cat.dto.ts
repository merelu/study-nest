import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends OmitType(Cat, ['password'] as const) {
  @ApiProperty({
    example: '3280199',
    description: 'id',
  })
  id: string;
}
