import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Client } from './Client'

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  address: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  zipCode: number

  @Column()
  country: string

  @ManyToOne((type) => Client, (client) => client.id, { onDelete: 'CASCADE' })
  client!: Client

  @Column({ default: true })
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
