import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post("signup")
    signUp(@Body() authCredentialsDto:AuthCredentialsDto ):Promise<{ message: string,statusCode:string }>{

        return this.authService.signUp(authCredentialsDto)
    }

    @Post("signin")
    signIn(@Body() authCredentialsDto:AuthCredentialsDto ):Promise<{ message: string,statusCode:string,accessToken:string }>{

        return this.authService.signIn(authCredentialsDto)
    }
}
