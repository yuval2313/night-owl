import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  data: Record<string, any>;

  constructor(
    response: string | Record<string, any>,
    statusCode: number,
    data: Record<string, any>,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    const { description, httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);

    super(
      HttpException.createBody(response, description, statusCode),
      statusCode,
      httpExceptionOptions,
    );

    this.data = data;
  }
}
