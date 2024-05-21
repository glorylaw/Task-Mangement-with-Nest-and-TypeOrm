import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<{ message: string,statusCode:string }>{
        const {username,password} = await authCredentialsDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = this.userRepository.create({
            username,
            password:hashedPassword
        })

        try {
            await this.userRepository.save(user) 
            return { message: 'User successfully registered',statusCode:"200" }; 
        } catch (error) {
            if(error.code === "23505"){
                throw new ConflictException("User already exists")
            }else{
                throw new InternalServerErrorException()
            }
           
        }
       
    }

    async signIn(authCredentialsDto:AuthCredentialsDto) :Promise<{ message: string,statusCode:string,accessToken:string }>{
        const {username,password} = await authCredentialsDto
        const user = await this.userRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload:JwtPayload = {username}
            const accessToken:string = await this.jwtService.sign(payload)
            return {accessToken,message:"Login Successfull",statusCode:"200"}
          } else {
            throw new UnauthorizedException('Please check your login credentials');
          }
        
    }

}
