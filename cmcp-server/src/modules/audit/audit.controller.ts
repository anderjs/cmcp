/* eslint-disable prettier/prettier */
import {
  Get,
  Res,
  Query,
  Param,
  Logger,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { Token, User } from 'src/decorators/user';
import { ErrorInterceptor } from 'src/interceptors/error';
import { ResponseInterceptor } from 'src/interceptors/response';
import { FindLogDTO, FindLogsDTO } from './audit.dto';
import { unlink, createReadStream } from 'fs';
import { Response } from 'express';

@Controller('audit')
export class AuditController {
  private logger = new Logger();

  constructor(private auditService: AuditService) {}

  @Get('/export')
  async exportLogs(@Res() res: Response) {
    try {
      const csv = await this.auditService.exportCSV();

      const file = createReadStream(csv);

      res.setHeader(
        'Content-Disposition',
        'attachment; filename="audit_logs.csv"',
      );

      file.pipe(res);

      file.on('end', () => {
        unlink(csv, (err) => {
          if (err) {
            this.logger.error('Error streaming file', err?.name);
          }
        });
      });

      file.on('error', () => {
        this.logger.error('Error streaming file');

        res.status(500).end('Error streaming file');
      });
    } catch {
      res.status(500);
    }
  }

  @Get('/logs')
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async findAllLogs(@User() user: Token, @Query() query: FindLogsDTO) {
    const logs = await this.auditService.findAllLogs(query, user);

    return logs;
  }

  @Get('/logs/:id')
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async findAuditLog(@User() user: Token, @Param() { id }: FindLogDTO) {
    const auditLog = await this.auditService.findAuditLog({ id });

    return auditLog;
  }

  @Get('/:entity')
  @UseInterceptors(ErrorInterceptor)
  @UseInterceptors(ResponseInterceptor)
  async entityLogs(
    @User() user: Token,
    @Param() { entity }: { entity: string },
  ) {
    const logs = await this.auditService.findLogs(+entity, user);

    return logs;
  }
}
