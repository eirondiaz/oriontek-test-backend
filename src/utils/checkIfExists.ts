import { StatusCodes } from 'http-status-codes'
import { EntityTarget, FindOptionsWhere } from 'typeorm'
import { AppDataSource as dbConfig } from '../config/db'

export class ValidationError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number = StatusCodes.BAD_REQUEST) {
    super(message)
    this.name = 'ValidationError'
    this.statusCode = statusCode
  }
}

export const checkIfExists = async <T>(
  model: EntityTarget<T>,
  conditions: FindOptionsWhere<T>
): Promise<void> => {
  const repository = dbConfig.getRepository(model)
  const exists = await repository.findOne({ where: conditions })
  if (exists) {
    const field = Object.keys(conditions)[0]
    throw new Error(`${field} already exists`)
  }
}
