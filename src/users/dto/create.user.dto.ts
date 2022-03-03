import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example:'1', description: 'Уникальный идентификатор'})
    readonly id: number;

    @ApiProperty({example:'info@blogium.ru', description: 'Электронный адрес'})
    @IsString({message: 'Только строковые значения'})
    @IsEmail({}, {message: "Неккоректный E-mail"})
    readonly email: string;

    @ApiProperty({example:'*********', description: 'пароль'})
    @Length(6, 32, {message: 'Пароль должен содержать от 6 до 32 символов'})
    @IsString({message: 'Только строковые значения'})
    readonly password: string;
}