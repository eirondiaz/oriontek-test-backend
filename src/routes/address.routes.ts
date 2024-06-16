import {
  getAddressCtrl,
  listAddressCtrl,
  createAddressCtrl,
  updateAddressCtrl,
  deleteAddressCtrl,
} from './../controllers/address.controller'
import { Router } from 'express'

const router = Router()

router.get('/', listAddressCtrl)
router.get('/:id', getAddressCtrl)
router.post('/', createAddressCtrl)
router.put('/:id', updateAddressCtrl)
router.delete('/:id', deleteAddressCtrl)

export default router
