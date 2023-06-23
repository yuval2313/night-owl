import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CApiBearerAuth } from '../decorators/custom-api-bearer-auth.decorator';
import { Business } from './models/business.entity';
import { CreateBusinessDto } from './req-dtos/create-business.dto';
import { UpdateBusinessDto } from './req-dtos/update-business.dto';

@ApiTags('businesses')
@CApiBearerAuth()
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @ApiOperation({ summary: 'This route creates a new business' })
  @ApiCreatedResponse({
    type: Business,
    description: 'Successfully created business',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @Post()
  createBusiness(@Body() createBusinessDto: CreateBusinessDto): void {}

  @ApiOperation({ summary: 'This route updates a business' })
  @ApiParam({ type: String, name: 'businessId', description: 'Business id' })
  @ApiOkResponse({
    type: Business,
    description: 'Successfully updated business',
  })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find business' })
  @Patch('/:businessId')
  updateBusiness(
    @Param('businessId') businessId: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ): void {}

  @ApiOperation({
    summary: 'This route removes a business',
    description: 'Performs a soft deletion',
  })
  @ApiParam({ type: String, name: 'businessId', description: 'Business id' })
  @ApiOkResponse({
    type: Business,
    description: 'Successfully removed business',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Not authorized to perform this action',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find business' })
  @Delete('/:businessId')
  removeBusiness(@Param('businessId') businessId: string): void {}

  @ApiOperation({ summary: 'This route gets a business by id' })
  @ApiParam({ type: String, name: 'businessId', description: 'Business id' })
  @ApiOkResponse({
    type: Business,
    description: 'Successfully retrieved business',
  })
  @ApiNotFoundResponse({ description: 'Not Found: Could not find business' })
  @Get('/:businessId')
  getBusinessById(@Param('businessId') businessId: string): void {}
}
