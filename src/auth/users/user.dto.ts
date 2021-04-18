import { IsEmail, IsNotEmpty, Equals, MinLength } from 'class-validator'

export class registerDTO {
    @IsNotEmpty()
    @MinLength(5, { each: true })
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5, { each: true })
    password: string

    @IsNotEmpty()
    @MinLength(5, { each: true })
    @Equals('password')
    cpassword: string
}

export class loginDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}