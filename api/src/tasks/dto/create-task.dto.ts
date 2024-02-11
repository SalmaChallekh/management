import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    name:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    description:string;
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    deadline:string;
     @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
     readonly status:string; 
    @ApiProperty({
        type:String,
        description:"this is a required proprety"
    })
    @IsString()
    @IsNotEmpty()
    readonly project:string;
}
