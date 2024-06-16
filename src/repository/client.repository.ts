import { FindOptionsWhere, Like } from 'typeorm'
import { Client } from '../model'
import { ClientBody } from './../interfaces/client.interface'
import { checkIfExists } from '../utils/checkIfExists'
import { AppDataSource as dbConfig } from '../config/db'

export const getClientRepository = async (
  id: string
): Promise<Client | null> => {
  const client = await Client.findOneBy({ id })
  return client
}

export const listClientRepository = async (
  search: string
): Promise<Client[]> => {
  console.log(search)
  const clientList = await Client.find({
    where: search
      ? [
          { name: Like(`%${search}%`), status: true },
          { lastName: Like(`%${search}%`), status: true },
          { email: Like(`%${search}%`), status: true },
          { phoneNumber: Like(`%${search}%`), status: true },
        ]
      : { status: true },
  })
  return clientList
}

export const createClientRepository = async (
  body: ClientBody
): Promise<void> => {
  await Promise.all([
    checkIfExists(Client, { email: body.email } as FindOptionsWhere<Client>),
    checkIfExists(Client, {
      phoneNumber: body.phoneNumber,
    } as FindOptionsWhere<Client>),
  ])

  const client = new Client()

  await dbConfig.getRepository(Client).save({ ...client, ...body })
}

export const updateClientRepository = async (
  id: string,
  body: ClientBody
): Promise<void> => {
  const findClient = await Client.findOne({ where: { id, status: true } })
  if (!findClient) throw new Error('client not found')

  await dbConfig.getRepository(Client).save({ ...findClient, ...body })
}

export const deleteClientRepository = async (id: string): Promise<void> => {
  const findClient = await Client.findOne({ where: { id, status: true } })
  if (!findClient) throw new Error('client not found')

  await dbConfig
    .getRepository(Client)
    .save({ ...findClient, status: !findClient.status })
}
