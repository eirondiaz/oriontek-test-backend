import { DataSource } from 'typeorm'
import { Client, Address } from '../model'
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 0,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.NAME || '',
  synchronize: true,
  // logging: true,
  entities: [Client, Address],
})
