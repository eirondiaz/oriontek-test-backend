import { Like } from 'typeorm'
import { Address, Client } from '../model'
import { AddressBody } from './../interfaces/address.interface'
import { ValidationError } from '../utils/checkIfExists'
import { AppDataSource as dbConfig } from '../config/db'

export const getAddressRepository = async (
  id: string
): Promise<Address | null> => {
  const address = await Address.findOneBy({ id })
  return address
}

export const listAddressRepository = async (
  search: string,
  clientId: string
): Promise<Address[]> => {
  console.log(search)
  const addressList = await Address.find({
    relations: ['client'],
    where: search
      ? [
          {
            address: Like(`%${search}%`),
            status: true,
            ...(clientId && { client: { id: clientId, status: true } }),
          },
          {
            city: Like(`%${search}%`),
            status: true,
            ...(clientId && { client: { id: clientId, status: true } }),
          },
          {
            state: Like(`%${search}%`),
            status: true,
            ...(clientId && { client: { id: clientId, status: true } }),
          },
          {
            country: Like(`%${search}%`),
            status: true,
            ...(clientId && { client: { id: clientId, status: true } }),
          },
          {
            client: [{ name: Like(`%${search}%`) }, { lastName: Like(`%${search}%`) }],
            status: true,
            ...(clientId && { client: { id: clientId, status: true } }),
          },
        ]
      : {
          ...(clientId && { client: { id: clientId, status: true } }),
          status: true,
        },
  })
  return addressList
}

export const createAddressRepository = async (
  body: AddressBody
): Promise<void> => {
  const client = await Client.findOne({
    where: { id: body.clientId, status: true },
  })
  if (!client) throw new ValidationError('client not found')

  const address = new Address()
  await dbConfig.getRepository(Address).save({ ...address, ...body, client })
}

export const updateAddressRepository = async (
  id: string,
  body: AddressBody
): Promise<void> => {
  const findAddress = await Address.findOne({ where: { id, status: true } })
  if (!findAddress) throw new Error('address not found')

  const client = await Client.findOne({
    where: { id: body.clientId, status: true },
  })
  if (!client) throw new ValidationError('client not found')

  await dbConfig
    .getRepository(Address)
    .save({ ...findAddress, ...body, client })
}

export const deleteAddressRepository = async (id: string): Promise<void> => {
  const findAddress = await Address.findOne({ where: { id, status: true } })
  if (!findAddress) throw new Error('address not found')

  await dbConfig
    .getRepository(Address)
    .save({ ...findAddress, status: !findAddress.status })
}
