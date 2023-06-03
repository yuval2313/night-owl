import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CBadRequestException } from '../../errors/bad-request.error';

@Injectable()
export class ValidIdPipe implements PipeTransform {
  constructor(
    @InjectPinoLogger(ValidIdPipe.name)
    private readonly logger: PinoLogger,
  ) {}

  transform(value: string): number {
    this.logger.info('Transforming id route parameter to number');
    const id = +value;

    this.logger.info('Validating id route parameter');
    if (isNaN(id)) {
      throw new CBadRequestException('Invalid route parameter id', {
        routeParam: value,
      });
    }

    this.logger.info('successfully validated id route parameter');
    return id;
  }
}
