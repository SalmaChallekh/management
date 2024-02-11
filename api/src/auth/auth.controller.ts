import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { Request, response } from "express";
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() CreateUserDto:CreateUserDto){
    return this.authService.signUp(CreateUserDto)
  }
  @Post('signin')
  signin(@Body() data:CreateLoginDto){
    return this.authService.signIn(data)
  } 
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req:Request){
    const userId=req.user['sub']
    const refreshToken=req.user['refreshToken']
    return this.authService.refreshTokens(userId,refreshToken)
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req:Request){
    this.authService.logOut(req.user['sub'])
  }
    @Patch(':id')
    async updateuser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
      return this.authService.updateProfil(userId, updateUserDto)
     
    }
    
  }

