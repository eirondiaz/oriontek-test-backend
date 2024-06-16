import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AddressBody } from '../interfaces/address.interface'
import { ValidationError } from '../utils/checkIfExists'
import {
  getAddressRepository,
  listAddressRepository,
  createAddressRepository,
  updateAddressRepository,
  deleteAddressRepository,
} from '../repository/address.repository'

export const getAddressCtrl = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await getAddressRepository(id)

    return res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}

export const listAddressCtrl = async (req: Request, res: Response) => {
  const { search, clientId } = req.query

  try {
    const data = await listAddressRepository(String(search || ''), String(clientId || ''))

    return res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}

export const createAddressCtrl = async (
  req: Request<unknown, unknown, AddressBody>,
  res: Response
) => {
  const { body } = req

  try {
    await createAddressRepository(body)

    return res.status(StatusCodes.NO_CONTENT).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}

export const updateAddressCtrl = async (
  req: Request<Record<string, any>, unknown, AddressBody>,
  res: Response
) => {
  const { id } = req.params
  const { body } = req

  try {
    await updateAddressRepository(id, body)

    return res.status(StatusCodes.NO_CONTENT).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}

export const deleteAddressCtrl = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteAddressRepository(id)

    return res.status(StatusCodes.NO_CONTENT).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.statusCode).json({ message: error.message })
    }
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}
