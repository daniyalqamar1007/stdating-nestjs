import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async verifyLogin(@Body() dto: { email: string; password: string }) {
    console.log(dto);
    return await this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Request() req) {
    console.log(req.user);
    return this.authService.test(req.user);
  }
}
