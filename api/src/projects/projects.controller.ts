import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get('manager/:id')

  async getprojectbymanager(@Res() response,@Param('id') managerId: string) {
    try {
      
      const existingproject=await this.projectsService.getprojectbyidmanager(managerId)
    return response.status(HttpStatus.OK).json({
      message:"Project found by ID Manager successfully !",
      status:HttpStatus.OK,
      data:existingproject
    })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
  @Post()
  async createProject(@Res() response ,@Body() createProjectDto: CreateProjectDto) {
    try {
      const newprojet=await this.projectsService.createProject(createProjectDto)
      return response.status(HttpStatus.CREATED).json({
        message:'Project Created successfully !',
        status:HttpStatus.CREATED,
        data:newprojet
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
 async  getAllprojects(@Res() response) {
    try {
      const projectsData=await this.projectsService.getAllprojects()
      return response.status(HttpStatus.OK).json({
        message:'All projects data found successfully ! ',
        status:HttpStatus.OK,
        data:projectsData
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
  @ApiParam({
    name:"id",
    required:true,
    description:"should be an id of projects that exists in the database",
    type:String
  })
  async getproject(@Res() response,@Param('id') projectId: string) {
    try {
      const existingproject=await this.projectsService.getproject(projectId)
    return response.status(HttpStatus.OK).json({
      message:"Project found by ID successfully !",
      status:HttpStatus.OK,
      data:existingproject
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
  async updateproject(@Res() response,@Param('id') projectId: string, @Body() updateProjetDto: UpdateProjectDto) {
    try {
      const existingprojet=await this.projectsService.updateproject(projectId,updateProjetDto)
      return response.status(HttpStatus.OK).json({
        message:"Project updated successfully",
        status:HttpStatus.OK,
        data:existingprojet
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
 /*  @Delete(':id')
  async deleteproject(@Res() response,@Param('id') projetcId: string) {
    try {
      const deletedprojet=await this.projectsService.deleteproject(projetcId)
      return response.status(HttpStatus.OK).json({
        message:"Project deleted successfully",
        status:HttpStatus.OK,
        data:deletedprojet
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } */



}
