import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ComponentDto } from './dto/component.dto';
import { Component } from './entities/component.entity';
import { User } from './entities/user.entity';
import { ErrorHandler } from './utils/ErrorHandler';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>
  ) { }

  async createComponent(data: ComponentDto, userEmail: string): Promise<Component> {
    try {
      const componentData = { ...data, id: uuid() };
      const component = this.componentRepository.create(componentData)
      const componentResult = await this.componentRepository.save(component)
      return componentResult
    } catch (error) {
      ErrorHandler.sendError(error, 'Error on saving component')
    }
  }

  async getComponent( userEmail: string): Promise<Component[]> {
    try {
    const components = await this.componentRepository.find()
    return components
    } catch (error) {
      ErrorHandler.sendError(error, 'Error on edit component')
    }
  }

}