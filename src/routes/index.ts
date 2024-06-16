import AddressRouter from './address.routes'
import ClientRouter from './client.routes'
import { Router } from 'express'

const router = Router()

router.use('/clients', ClientRouter)
router.use('/address', AddressRouter)

export default router
