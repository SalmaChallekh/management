import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 constructor(private mailerService:MailerService){}
 async sendUserConfirmation(user:any,token:string){
  const url=`example.com/auth/confirm?token=${token}`
  await this.mailerService.sendMail({
      to:user.email,
      subject:'welcome to Nice Page ! confirm ur email',
      template:'./confirmation',
      context:{
          name:user.name,
          url,
      }
  })
}

}
