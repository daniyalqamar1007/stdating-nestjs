import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

class PreferredAgeDto {
  @IsOptional()
  @IsNumber()
  @Min(18)
  min?: number;

  @IsOptional()
  @IsNumber()
  @Max(100)
  max?: number;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  iam?: string;

  @IsOptional()
  @IsString()
  otp?: string;

  @IsOptional()
  @IsString()
  lookingFor?: string;

  @IsOptional()
  @IsString()
  relationShipGoal?: string;

  @IsOptional()
  @IsBoolean()
  flyToMeet?: boolean;

  @IsOptional()
  @ValidateNested()
  preferredAge?: PreferredAgeDto;

  @IsOptional()
  @IsString()
  height?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  ethnicity?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  healthCondition?: string[];

  @IsOptional()
  @IsString()
  aboutYourSelf?: string;

  @IsOptional()
  @IsString()
  aboutYourMatch?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsString()
  sexualOrientation?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
