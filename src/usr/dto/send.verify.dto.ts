import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SendVerifyDto {
  @ApiProperty()
  @IsEmail()
  email: string
}