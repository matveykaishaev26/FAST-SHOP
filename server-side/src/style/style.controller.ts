import { Controller } from '@nestjs/common';
import { StyleService } from './style.service';

@Controller('style')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}
}
