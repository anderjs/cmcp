/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Token } from 'src/decorators/user';
import { User } from 'src/models/User';
import { Book } from 'src/models/Book';
import { AuditLog } from 'src/models/Audit';
import { AUDIT, BOOKS } from 'src/providers/entities';
import { FindLogDTO, FindLogsDTO } from './audit.dto';
import { Parser } from 'json2csv';
import * as fs from 'fs/promises';
import { v4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AUDIT)
    private Logs: typeof AuditLog,
    @Inject(BOOKS)
    private Books: typeof Book,
  ) {}
  async exportCSV() {
    const logs = await this.Logs.findAll();

    const parsedLogs = logs.map((log) => ({
      id: log?.dataValues?.id,
      action: log?.dataValues?.action,
      type: log?.dataValues?.type,
      entity: log?.dataValues?.entity,
      entityId: log?.dataValues?.entityId,
      metadata: JSON.stringify(log?.dataValues?.metadata, null, 2),
    }));

    const parser = new Parser();

    const temp = path.resolve(__dirname, 'temp');

    const filename = `audit-${v4()}.csv`;

    const csv = parser.parse(parsedLogs);

    const csvFilename = path.resolve(temp, filename);

    await fs.writeFile(csvFilename, csv);

    return csvFilename;
  }

  async findLogs(entity: number, user: Token): Promise<AuditLog[]> {
    const logs = await this.Logs.findAll({
      where: {
        userId: user.id as number,
        entityId: entity,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    return logs;
  }

  async findAllLogs({ page, limit }: FindLogsDTO, user: Token) {
    const offset = (+page - 1) * +limit;

    const { rows, count } = await this.Logs.findAndCountAll({
      where: {
        userId: user.id as number,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      offset,
    });

    return {
      data: rows,
      total: Math.ceil(count / limit),
      page,
      limit,
    };
  }

  async findAuditLog({ id }: FindLogDTO) {
    const log = await this.Logs.findByPk<AuditLog>(id, {
      include: [User],
    });

    if (!log) {
      throw new NotFoundException('Audit Log Not Found');
    }

    if ((log?.dataValues as AuditLog)?.entity === 'Book') {
      const book = await this.Books.findOne({
        where: {
          id: (log?.dataValues as AuditLog)?.entityId,
        },
      });

      if (!book) {
        throw new NotFoundException('Book Not Found');
      }

      const { user } = log?.dataValues as AuditLog;

      return {
        ...(log?.dataValues as AuditLog),
        user: {
          name: (user?.dataValues as User)?.name,
        },
        book: {
          ...book?.dataValues,
        },
      };
    }
  }
}
