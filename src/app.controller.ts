import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Console } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private todos: string[] = [];

  @Get()
  getHello(): string[] {
    return this.todos;
  }

  @Post()
  addTodo(@Body() todo: string) {
    this.todos.push(todo);
    return { message: 'success' };
  }

  @Put(':id')
  updateTodo(@Param('id') id: number, @Body() updatedTodo: string) {
    if (id >= 0 && id < this.todos.length) {
      this.todos[id] = updatedTodo;
      return { message: 'success' };
    } else {
      return { message: 'Todo not found' };
    }
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    if (id >= 0 && id < this.todos.length) {
      this.todos.splice(id, 1);
      return { message: 'success' };
    } else {
      return { message: 'Todo not found' };
    }
  }

  @Post('longest-common')
  async findLongest(
    @Body() strs: { data: string[] },
  ): Promise<{ message: string; prefix: string }> {
    const res = await this.appService.findLongestCommonPrefix(strs.data);
    return { message: 'success', prefix: res };
  }
}
