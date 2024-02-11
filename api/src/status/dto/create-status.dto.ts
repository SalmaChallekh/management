import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class CreateStatusDto {
    @ApiProperty({
        type:String,
        description:"this is a required property"
    })
    @IsString()
    @IsNotEmpty()
    status:string
 
}
