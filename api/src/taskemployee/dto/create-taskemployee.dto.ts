import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskemployeeDto {
    @ApiProperty({
        type:String,
        description:"this is a required proprety"
    })
    @IsString()
    @IsNotEmpty()
    readonly task:string;
    @ApiProperty({
        type:String,
        description:"this is a required proprety"
    })
    @IsString()
    @IsNotEmpty()
    readonly employee:string;
}
