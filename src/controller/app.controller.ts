import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  StreamableFile,
  UseGuards
} from "@nestjs/common";
import { Request, Response } from "express";
import { Message } from "src/core/app/message.utils";
import { DocumentService } from "src/services/DocumentServices/document.services";
import { UserServices } from "../services/UserServices/user.services";
import { JwtAuthGuard } from "src/services/Auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/services/Auth/guards/local-auth.guard";
import { AuthorizationService } from "src/services/Auth/auth.services";
import { RoleServices } from "../services/RoleServices/role.services";
import { EventsServices } from "../services/EventsServices/events.services";
import { CategoryServices } from "../services/Category/category.services";

@Controller('cmmf/v1/')
export class AppController {

  constructor(
    private readonly userServices: UserServices,
    private readonly documentServices: DocumentService,
    private readonly authService: AuthorizationService,
    private readonly roleService: RoleServices,
    private readonly eventService: EventsServices,
    private readonly categoryService: CategoryServices,
    private message: Message,
    ) {

  }

  @Get("/healthCheck")
  async getHello(@Res() response: Response){
    return response.status(HttpStatus.OK).json("OK");
  }
  /**
   *
   * @param response ~ this object is for inject Response express
   * @returns ~ result all User from database
   */
  @UseGuards(JwtAuthGuard)
  @Get("/user")
  async getUsers(@Res() response: Response){
    return response.json(this.message.trace(await this.userServices.getUsers(), HttpStatus.OK));
  }

  /**
   *
   * @param params  ~ require user id
   * @param response ~ this object is for inject Response express
   * @returns ~ response object User
   */
  @UseGuards(JwtAuthGuard)
  @Get("/user/:id")
  async getByIdUsers(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.userServices.getByIdUser(params), HttpStatus.OK));
  }

  /**
   *
   * @param request ~ request is object User
   * @param response ~ this object is for inject Response express
   * @returns ~ response create User ok
   */
  @UseGuards(JwtAuthGuard)
  @Post("/user")
  async postUser(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.userServices.createUser(request.body), HttpStatus.CREATED));
  }

  /**
   *
   * @param request
   * @param response ~ this object is for inject Response express
   * @returns ~ response object User
   */
  @UseGuards(JwtAuthGuard)
  @Put("/user/edit")
  async editUser(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.userServices.editUser(request.body), HttpStatus.OK));
  }

  /**
   *
   * @param params ~ id from user
   * @param response ~ this object is for inject Response express
   * @returns ~ response object User
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/user/:id')
  async deleteUser(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.userServices.deleteUser(params), HttpStatus.OK))
  }

  /**
   *
   * @param response ~ this object is for inject Response express
   * @returns ~ response is array with all documents in database
   */
  @UseGuards(JwtAuthGuard)
  @Get('/document')
  async getDocument(@Res() response: Response){
    return response.json(this.message.trace(await this.documentServices.getDocuments(), HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/document/:id")
  async DocumentById(@Param() param: string ,@Res() response: Response){
    return response.json(this.message.trace( await this.documentServices.getDocumentById(param), HttpStatus.OK));
  }
  @UseGuards(JwtAuthGuard)
  @Post("/document")
  async createDocument(@Req() request: Request,@Res() response: Response){
    return response.json(this.message.trace( await this.documentServices.createDocument(request.body), HttpStatus.CREATED));
  }

  @UseGuards(JwtAuthGuard)
  @Put("/document/edit")
  async updateDocument(@Req() request: Request,@Res() response: Response){
    return response.json(this.message.trace( await this.documentServices.editDocument(request.body), HttpStatus.CREATED));
  }

  @Post("/document/download/:id")
  async downloadDocument(@Param() param: string ,@Res() response: Response){
    const data = await this.documentServices.download(param);
    response.set("Content-Disposition", "attachment;filename="+data.name)
    response.set("Content-Type", "text/*");
    return response.send(data.file)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/document/:id")
  async DeleteByIdDocument(@Param() param: string ,@Res() response: Response){
    return response.json(this.message.trace( await this.documentServices.deleteDocument(param), HttpStatus.OK));
  }

  /**
   *
   * @param request ~ require username and password
   * @returns ~ return token for Login || AuthorizationException
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request) {
    return this.authService.login(request.body.username);
  }

  /**
   *
   * @param req ~ require param token in bear Auth header
   * @returns  ~ validate Token
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get("/role")
  async getRole(@Res() response: Response){
    return response.json(this.message.trace(await this.roleService.get(),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/role/:id")
  async getRoleId(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.roleService.getOne(params),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Post("/role")
  async createRole(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.roleService.create(request.body),HttpStatus.CREATED));
  }

  @UseGuards(JwtAuthGuard)
  @Put("/role/edit")
  async editRole(@Res() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.roleService.edit(request.body),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/role/:id")
  async deleteRole(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.roleService.delete(params),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/category")
  async getCategory(@Res() response: Response){
    return response.json(this.message.trace(await this.categoryService.getCategory(),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/category/:id")
  async getCategoryId(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.categoryService.getByIdCategory(params),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Post("/category")
  async createCategory(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.categoryService.createCategory(request.body),HttpStatus.CREATED));
  }

  @UseGuards(JwtAuthGuard)
  @Put("/category/edit")
  async editCategory(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.categoryService.editCategory(request.body),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/category/:id")
  async deleteCategory(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.categoryService.deleteCategory(params),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/event")
  async getEvent(@Res() response: Response){
    return response.json(this.message.trace(await this.eventService.getEvents(),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/event/:id")
  async getEventId(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.eventService.getEventId(params),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Post("/event")
  async createEvent(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.eventService.createEvents(request.body),HttpStatus.CREATED));
  }

  @UseGuards(JwtAuthGuard)
  @Put("/event/edit")
  async editEvent(@Req() request: Request, @Res() response: Response){
    return response.json(this.message.trace(await this.eventService.editEvent(request.body),HttpStatus.OK));
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/event/:id")
  async deleteEvent(@Param() params: string, @Res() response: Response){
    return response.json(this.message.trace(await this.eventService.deleteEvent(params),HttpStatus.OK));
  }


}
