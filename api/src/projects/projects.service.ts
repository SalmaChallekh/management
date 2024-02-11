import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interfaces/project.interface';
import { IManager } from 'src/managers/interfaces/manager.interface';
import { IStatus } from 'src/status/interfaces/status.interface';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects')
    private projectModel: Model<IProject>,
    /*      @InjectModel('managers')
        private managerModel: Model<IManager>,  */
    @InjectModel('users')
    private usersModel: Model<IUser>,

    @InjectModel('status')
    private statusModel: Model<IStatus>
  ) { }
  async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    const newproject = new this.projectModel(createProjectDto)
    
    await this.usersModel.updateOne({ _id: createProjectDto.manager },
      { $push: { projects: newproject._id } })
    await this.statusModel.updateOne({ _id: createProjectDto.status },
      { $push: { projects: newproject._id } })
    return newproject.save()
  }

  async getAllprojects(): Promise<IProject[]> {
    const projectsData = await this.projectModel.find().populate('manager').populate('status')
    if (!projectsData || projectsData.length == 0) {
      throw new NotFoundException('projects data not found')
    }
    return projectsData
  }

  async getproject(projectId: string): Promise<IProject> {
    const existingproject = await this.projectModel.findById(projectId).populate('manager').populate('status').exec()
    if (!existingproject) {
      throw new NotFoundException(`Project with id ${projectId} not found`)
    }
    return existingproject
  }
  //getprojectbyManager
  async getprojectbyidmanager(manager: string): Promise<IProject[]> {
    //const idArray = managerId.split(',');
    //const objectId = new Types.ObjectId(managerId);
    const existingprojectbymanager = await this.projectModel.find({ manager: manager }).populate("status").exec()
    if (!existingprojectbymanager) {
      throw new NotFoundException(`Project with id  not found`)
    }
    return existingprojectbymanager
  }

  async updateproject(projectId: string, updateProjectDto: UpdateProjectDto) {
    const existingproject = await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto, { new: true })
    if (!existingproject) {
      throw new NotFoundException(`Project with ${projectId} not found`)
    }
    return existingproject
  }

  /*  async deleteproject(projectId: string) {
     const deletedproject = await this.projectModel.findByIdAndDelete(projectId)
     await this.managerModel.updateOne({ _id: deletedproject.manager },
       { $pull: { projects: deletedproject._id } })
     await this.statusModel.updateOne({ _id: deletedproject.status },
       { $pull: { projects: deletedproject._id } })
     if (!deletedproject) {
       throw new NotFoundException(`project with id ${projectId} not found`)
     }
     return deletedproject
   } */
}

