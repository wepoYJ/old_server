import { IsEmail, Length, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class RegDto {
  @ApiProperty({
    description: '姓名',
    type: String,
  })
  @Length(2, 15)
  readonly name: string

  @ApiProperty({
    description: '密码',
    type: String,
  })
  @Length(6, 20)
  readonly password: string

  @ApiProperty({
    description: '邮箱',
    type: String,
  })
  @IsEmail()
  readonly email: string

  @ApiProperty({
    description: '验证码',
    type: String,
  })
  @IsDefined()
  readonly code: string
}