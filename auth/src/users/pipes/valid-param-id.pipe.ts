import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidIdPipe implements PipeTransform {
  transform(value: string): number {
    const id = +value;

    if (isNaN(id)) {
      throw new BadRequestException('Invalid route parameter id');
    }

    return id;
  }
}
