import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { INVALID_DATE, INVALID_NAME } from '../constants/error.constants';
import { ALPHABETS_SPACE_REGEX, DATE_REGEX } from '../constants/regular-expression.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'User first name is required',
  })
  @Matches(ALPHABETS_SPACE_REGEX, {
    message: INVALID_NAME,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({
    message: 'User last name is required',
  })
  @Matches(ALPHABETS_SPACE_REGEX, {
    message: INVALID_NAME,
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Date of birth is required',
  })
  @IsString()
  @Matches(DATE_REGEX, {
    message: INVALID_DATE,
  })
  birthDate: string;

  @IsString()
  @IsNotEmpty({
    message: 'User current address is required',
  })
  address: string;
}

export class UserDetailsDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Matches(ALPHABETS_SPACE_REGEX, {
    message: INVALID_NAME,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @Matches(ALPHABETS_SPACE_REGEX, {
    message: INVALID_NAME,
  })
  lastName: string;

  @IsString()
  @IsOptional()
  @Matches(DATE_REGEX, {
    message: INVALID_DATE,
  })
  birthDate: string;

  @IsString()
  @IsOptional()
  address: string;
}
