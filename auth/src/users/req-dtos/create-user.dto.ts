import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsStrongPasswordOptions,
  ValidationOptions,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';

const passwordComplexityOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const { minLength, minLowercase, minUppercase, minNumbers, minSymbols } =
  passwordComplexityOptions;

const passwordValidationOptions: ValidationOptions = {
  message(args: ValidationArguments) {
    const { value } = args;

    if (value?.length < minLength)
      return 'password must be longer than or equal to 8 characters';
    return `password should contain at least: ${minLowercase} lowercase, ${minUppercase} uppercase, ${minNumbers} numerical, and ${minSymbols} special characters`;
  },
};

export class CreateUserDto {
  @ApiProperty({ minimum: 3, maximum: 50, example: 'Yuval' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    minimum: 8,
    maximum: 50,
    description: `strong password containing at least: ${minLowercase} lowercase, ${minUppercase} uppercase, ${minNumbers} numerical, and ${minSymbols} special characters`,
    example: 'C0mplexP@ssword',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @IsStrongPassword(passwordComplexityOptions, passwordValidationOptions)
  password: string;
}
