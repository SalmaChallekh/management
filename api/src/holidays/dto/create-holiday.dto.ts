import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateHolidayDto {
    @ApiProperty({
        type:String,
        description:"this is a required proprety"
    })
    @IsString()
    @IsNotEmpty()
    holiday:string;
}
