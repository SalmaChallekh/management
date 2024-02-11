import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateUserDto {
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
   items:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    fullName:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    userName:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    password:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    email:string;
    refreshToken:string
    @ApiProperty({
        type:Number,
        description:"this is a required property"
    })
    @IsNumber()
    @IsNotEmpty()
    phone:number;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    adress:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    city:string;
    @ApiProperty({
        type:Number,
        description:"this is a required property"
    })
    @IsNumber()
    @IsNotEmpty()
    zipCode:number; 

     @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    situationprof:string;
    /* @ApiProperty({
        type:String,
        description:"this is a required proprety"
    })
    @IsString()
    @IsNotEmpty()
    readonly taskemployee:string; */

    /* @ApiProperty({
        type:Boolean,
        description:"this is a required property"
    })
    @IsNotEmpty()
    @IsBoolean()
    disponibility:boolean; */
    
}
