import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ClientBody } from '../interfaces/client.interface'
import { ValidationError } from '../utils/checkIfExists'
import {
  getClientRepository,
  listClientRepository,
  createClientRepository,
  deleteClientRepository,
  updateClientRepository,
} from '../repository/client.repository'

export const getClientCtrl = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await getClientRepository(id)

    return res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}

export const listClientCtrl = async (req: Request, res: Response) => {
  const { search } = req.query

  try {
    const data = await listClientRepository(String(search || ''))

    return res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}

export const createClientCtrl = async (
  req: Request<unknown, unknown, ClientBody>,
  res: Response
) => {
  const { body } = req

  try {
    await createClientRepository(body)

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

export const updateClientCtrl = async (
  req: Request<Record<string, any>, unknown, ClientBody>,
  res: Response
) => {
  const { id } = req.params
  const { body } = req

  try {
    await updateClientRepository(id, body)

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

export const deleteClientCtrl = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await deleteClientRepository(id)

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
