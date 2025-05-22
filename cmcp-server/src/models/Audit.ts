/* eslint-disable prettier/prettier */
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'audit_logs',
  timestamps: true,
})
export class AuditLog extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  entity: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  entityId: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  metadata: object;

  @Column({
    type: DataType.ENUM('CREATE', 'UPDATE', 'SOFT_DELETE', 'DELETE', 'RESTORE'),
    allowNull: false,
  })
  type: 'CREATE' | 'UPDATE' | 'SOFT_DELETE' | 'DELETE' | 'RESTORE';
}

/**
 * Represents an audit log entry in the system.
 * @remarks
 * This model is mapped to the `audit_logs` table and is used to track actions performed by users on various entities.
 * @property userId - The ID of the user who performed the action. Can be null if the action was not performed by a user.
 * @property user - The associated user instance.
 * @property action - The action performed (e.g., 'create', 'update', 'delete').
 * @property entity - The name of the entity on which the action was performed.
 * @property entityId - The ID of the entity instance affected by the action. Can be null.
 * @property metadata - Additional metadata related to the action, stored as a JSON object. Can be null.
 */
