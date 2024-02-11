import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
var cors=require('cors')
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
  const config=new DocumentBuilder().setTitle('Pfe_App')
  .addTag('auth')
  .addTag('users')
  .addTag('admins')
  .addTag('managers')
  .addTag('employees')
  .addTag('projects')
  .addTag('tasks')
  .addTag('holidays')
  .addTag('status')
  .addBearerAuth({
    description:`Please enter token in following format: Bearer<JWT>`,
    name:'Authorisation',
    bearerFormat:'Bearer',
    scheme:'Bearer',
    type:'http',
    in:'Header'
  },'access-token')
  .build()
  const document=SwaggerModule.createDocument(app,config)
  
  SwaggerModule.setup('project',app,document)
  await app.listen(5000);
}
bootstrap();
