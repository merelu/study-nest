import { CatsService } from './cats.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from './../common/exceptions/http-exception.filter';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats() {
    return { cats: 'getCats' };
  }

  @Get(':id')
  getCat(@Param('id', ParseIntPipe) params: number) {
    return `${params} cat`;
  }
}
