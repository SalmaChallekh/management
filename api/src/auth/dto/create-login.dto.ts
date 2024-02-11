import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLoginDto{
    @ApiProperty({
        type:String,
        description:"this is a required Property"
    })
    @IsNotEmpty()
    readonly userName:string;
    @ApiProperty({
        type:String,
        description:"this is a required Property"
    })
    @IsNotEmpty()
    readonly password:string
}