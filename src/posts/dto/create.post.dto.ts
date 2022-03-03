import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example:'info@blogium.ru', description: 'Электронный адрес'})
    readonly email: string;

    @ApiProperty({example:'*********', description: 'пароль'})
    readonly password: string;
}