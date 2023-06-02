import { BadRequestException, HttpExceptionOptions } from '@nestjs/common';
import { CustomHttpException } from '../interfaces/http-exception.interface';

export class CBadRequestException
  extends BadRequestException
  implements CustomHttpException
{
  data: Record<string, any>;

  constructor(
    errMessage: string,
    data: Record<string, any>,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(errMessage, descriptionOrOptions);
    this.data = data;
  }
}
