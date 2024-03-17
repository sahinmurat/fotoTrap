import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { ComponentDto } from './dto/component.dto';
import { Component } from './entities/component.entity';
import { ForbiddenResponse, InternalServerError, NotFoundResponse, UnauthorizedResponse } from './models/exampleSwaggerResponses';

@ApiBearerAuth()
@Controller('api/v1/')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @UseGuards(AuthGuard)
  @ApiTags('Endpoints')
  @Post('create-component')
  @ApiResponse({ status: 201, type: Component })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 500, type: InternalServerError })
  @ApiBody({ type: ComponentDto })
  async createComponent(@Request() req, @Body() data: ComponentDto): Promise<Component> {
    return await this.appService.createComponent(data, req.user.email)
  }

  @UseGuards(AuthGuard)
  @ApiTags('Endpoints')
  @Get('components')
  @ApiResponse({ status: 201, type: Component })
  @ApiResponse({ status: 401, type: UnauthorizedResponse })
  @ApiResponse({ status: 403, type: ForbiddenResponse })
  @ApiResponse({ status: 404, type: NotFoundResponse })
  @ApiResponse({ status: 500, type: InternalServerError })
  async editComponent(@Request() req): Promise<Component[]> {
    return await this.appService.getComponent( req.user.email)
  } 
}



