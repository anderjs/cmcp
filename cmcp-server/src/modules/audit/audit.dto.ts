/* eslint-disable prettier/prettier */
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const findLogs = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
});

export const findLog = z.object({
  id: z.coerce.number()
});



export class FindLogDTO extends createZodDto(findLog) {}

export class FindLogsDTO extends createZodDto(findLogs) {}
