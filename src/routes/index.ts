import { Router } from 'express'
import healthRoutes from './healthRoutes'
import taskRoutes from './taskRoutes'
import authRoutes from './authRoutes'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/tasks', taskRoutes)
apiRoutes.use('/auth', authRoutes)

export default apiRoutes
