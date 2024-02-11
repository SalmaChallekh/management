import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createuser(@Res()response,@Body() createUserDto: CreateUserDto) {
    try {
      const newuser=await this.usersService.createuser(createUserDto)
      return response.status(HttpStatus.CREATED).json({
        message:"User created successfully !",
        status:HttpStatus.CREATED,
        data:newuser
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
  @Get('items')
  async findAllUserByitems(@Query('items') items: string, @Res() response) {
    try {
      const existingUser = await this.usersService.findAllUserByitems(items);
      return response.status(HttpStatus.OK).json({
        message : "User found successfully",
        status: HttpStatus.OK,
        data : existingUser
      })
    }
    catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message : error.message,
        status: HttpStatus.BAD_REQUEST,
        data : null
      })
    }
  }
/*   @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard) */
  @Get()
  async getallusers(@Res()response) {
    try {
      const usersData=await this.usersService.getallusers()
    return response.status(HttpStatus.OK).json({
      message:"All users data found successfully !",
      status:HttpStatus.OK,
      data:usersData
    })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

 /*  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard) */
  @Get(':id')
  @ApiParam({
    name:"id",
    required:true,
    description:"should be an id of user that exists in the database",
    type:String
  })
  async getuser(@Res()response,@Param('id') userId: string) {
    try {
      const existinguser=await this.usersService.getuser(userId)
      return response.status(HttpStatus.OK).json({
        message:'User found by Id successfully',
        status:HttpStatus.OK,
        data:existinguser
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Patch(':id')
  async updateuser(@Res()response ,@Param('id') userId: string, @Body() UpdateUserDto: UpdateUserDto) {
    try {
      const existinguser=await this.usersService.updateuser(userId,UpdateUserDto)
      return response.status(HttpStatus.OK).json({
        message:'User updated successfully ! ',
        status:HttpStatus.OK,
        data:existinguser
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Delete(':id')
  async deleteuser(@Res() response,@Param('id') userId: string) {
    try {
      const deleteduser=await this.usersService.deleteuser(userId)
      return response.status(HttpStatus.OK).json({
        message:"User deleted successfully !",
        status:HttpStatus.OK,
        data:deleteduser
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
