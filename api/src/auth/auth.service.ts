import { BadGatewayException, BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from "argon2";
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private configService:ConfigService,
        private jwtService:JwtService
    ){}
    async signUp(CreateUserDto:CreateUserDto):Promise<any> {
        //check if user exists
        const userxists=await this.usersService.findByUserName(
            CreateUserDto.userName
        )
        if(userxists){
            throw new BadRequestException("User already exists")
        }
        const hash=await this.hashData(CreateUserDto.password)
        const newuser=await this.usersService.createuser({
            ...CreateUserDto,
            //password:hash
        })
        const tokens=await this.getTokens(newuser._id,newuser.password)
        return tokens
    }
    async signIn(data:CreateLoginDto){
        const user=await this.usersService.findByUserName(data.userName)
        if(!user)throw new BadRequestException('User does not exist');
        const passwordMatches=await argon2.verify(user.password,data.password)
        if(!passwordMatches) throw new BadRequestException('Password is incorrect')
        const tokens=await this.getTokens(user._id,user.userName)
        await this.updateRefreshToken(user._id,tokens.refreshToken)
        return {tokens:tokens.accessToken,user}

    }
    hashData(data:string){
        return argon2.hash(data)
    }
    //generate access token and refresh token 
    async getTokens(userId:string,userName:string){
        const [accessToken,refreshToken]=await Promise.all([
            this.jwtService.signAsync({
                sub:userId,userName
            },
            {
                secret:this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn:'7d'
            }),
            this.jwtService.signAsync({
                sub:userId,userName
            },
            {
                secret:this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn:'8d'
            })
        ])
        return {accessToken,refreshToken}
    }
    async refreshTokens(userId:string,refreshToken:string){
        const user=await this.usersService.getuser(userId)
        if(!user|| !user.refreshToken) throw new ForbiddenException('Access Denied')
        const refreshTokenMatches=await argon2.verify(
            user.refreshToken,
            refreshToken
        )
        if(!refreshTokenMatches) throw new ForbiddenException('Access Denied')
        const Tokens=await this.getTokens(user._id,user.userName)
        await this.updateRefreshToken(user._id,Tokens.refreshToken)
        return Tokens
    }
    async updateRefreshToken(userId:string,refreshToken:string){
        const hashedRefreshToken=await this.hashData(refreshToken)
        await this.usersService.updateuser(userId,{
            refreshToken:hashedRefreshToken
        })
    }
    async logOut(userId:string){
            this.usersService.updateuser(userId,{refreshToken:null})
        }

        async updateProfil( userId:string , updateuserDto:UpdateUserDto ){
            const user=await this.usersService.updateuser(userId , updateuserDto )
          
            const tokens=await this.getTokens(user._id,user.userName)
            await this.updateRefreshToken(user._id,tokens.refreshToken)
            return {tokens:tokens.accessToken,user}
    
        }

}
