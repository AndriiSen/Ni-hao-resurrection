import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Redirect } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { RegService } from './reg.service';
import { Reg } from './schemas/reg.schema';

@Controller('reg')
export class RegController {

    constructor( private readonly regService: RegService ){
         
    }
  @Get()
  getAllUsers(): Promise<Reg[]>{
    return this.regService.getAllUsers();
  }
 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: createUserDto): Promise<Reg> {
    
    return this.regService.create(createUserDto);
  }

  @Delete()
  removeUsers(): Promise<Reg[]>{
    return this.regService.removeUsers();
  }
  
  
}
