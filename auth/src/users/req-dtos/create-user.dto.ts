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

const passwordCompexityOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const passwordValidationOptions: ValidationOptions = {
  message(args: ValidationArguments) {
    const { value } = args;

    const { minLength, minLowercase, minUppercase, minNumbers, minSymbols } =
      passwordCompexityOptions;

    if (value.length < minLength)
      return 'password must be longer than or equal to 8 characters';
    return `password is not strong enough and should contain at least: ${minLowercase} lowercase, ${minUppercase} uppercase, ${minNumbers} numerical, and ${minSymbols} special characters`;
  },
};

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsStrongPassword(passwordCompexityOptions, passwordValidationOptions)
  password: string;
}
