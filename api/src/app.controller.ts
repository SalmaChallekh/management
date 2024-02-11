import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 
  @Get("mail")
  async signUp(){
    const token=Math.floor(1000+Math.random()*9000).toString()
    const user={name:"salma",email:"salma.challekh@gmail.com"}
    await this.appService.sendUserConfirmation(user,token)
  }
}
