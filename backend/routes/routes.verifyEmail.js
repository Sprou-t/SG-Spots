import express from 'express'
import { handleVerification } from '../controller/controller.verifyEmail.js'

const router = express.Router()

router.get('/', handleVerification)

export default router