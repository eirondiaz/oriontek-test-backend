import {
  getClientCtrl,
  listClientCtrl,
  createClientCtrl,
  updateClientCtrl,
  deleteClientCtrl,
} from './../controllers/client.controller'
import { Router } from 'express'

const router = Router()

router.get('/', listClientCtrl)
router.get('/:id', getClientCtrl)
router.post('/', createClientCtrl)
router.put('/:id', updateClientCtrl)
router.delete('/:id', deleteClientCtrl)

export default router
