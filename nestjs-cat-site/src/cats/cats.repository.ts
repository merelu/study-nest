import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatsRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  //mongoose 스키마에서 validation 에러를 뿜지만 잘 안될 대 try catch로 에러처리를 해준다.
  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return !!result;
    } catch (err) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatsRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
