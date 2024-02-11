import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateDmholidayDto {
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    dateofleave:string;
    @ApiProperty({
        type:Number,
        description:"this is a required property"
    })
    @IsNumber()
    @IsNotEmpty()
    numberofdays:number
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    holiday:string;
    /* @ApiProperty({
        type:String,
        description:"this is a required proprety"
    })
    @IsString()
    @IsNotEmpty()
    readonly user:string; */
}
