import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SituationprofService } from './situationprof.service';
import { CreateSituationprofDto } from './dto/create-situationprof.dto';
import { UpdateSituationprofDto } from './dto/update-situationprof.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('situationprof')
@ApiTags('situationprof')
export class SituationprofController {
  constructor(private readonly situationprofService: SituationprofService) {}

  @Post() 
  async createsituation(@Res() response,@Body() createSituationprofDto: CreateSituationprofDto) {
    try {
      const newsituation=await this.situationprofService.createsituation(createSituationprofDto)
      return response.status(HttpStatus.CREATED).json({
        message:"situation prof created successfully! ",
        status:HttpStatus.CREATED,
        data:newsituation
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }

  }

  @Get()
  async getallsituation(@Res()response) {
    try {
      const situationData=await this.situationprofService.getallsituation()
    return response.status(HttpStatus.OK).json({
      message:"All situations data found successfully !",
      status:HttpStatus.OK,
      data:situationData
    })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }


  @Get(':id')
  async getsituation(@Res()response,@Param('id') situationprofId: string) {
    try {
      const existingsituation=await this.situationprofService.getsituation(situationprofId)
      return response.status(HttpStatus.OK).json({
        message:'Situation found by Id successfully',
        status:HttpStatus.OK,
        data:existingsituation
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
  async updatesituation(@Res()response ,@Param('id') situationprofId: string, @Body() updateSituationprofDto: UpdateSituationprofDto) {
    try {
      const existingsituation=await this.situationprofService.updatesituation(situationprofId,updateSituationprofDto)
      return response.status(HttpStatus.OK).json({
        message:'Situation updated successfully ! ',
        status:HttpStatus.OK,
        data:existingsituation
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
  async deletesituation(@Res() response,@Param('id') situationprofId: string) {
    try {
      const deletedsituation=await this.situationprofService.deletesituation(situationprofId)
      return response.status(HttpStatus.OK).json({
        message:"Situation deleted successfully !",
        status:HttpStatus.OK,
        data:deletedsituation
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
