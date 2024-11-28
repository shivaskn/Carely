import express from 'express'
import {careersSubmit} from '../controllers/careersController.js'
const careersRouter = express.Router()

careersRouter.post('/careers',careersSubmit)

export default careersRouter