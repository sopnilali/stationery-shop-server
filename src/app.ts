import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import productRouter from './modules/products/product.router'
import orderRouter from './modules/orders/order.router'
import userRouter from './modules/users/user.router'

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/', productRouter)
app.use('/api/', orderRouter)
app.use('/api/', userRouter)

// home routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Welcome to the Stationery Shop API! ⚡',
  })
})

// error handling middleware start

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Could not found ${req.url}`)
  res.status(404)
  res.json({
    status: false,
    message: error.message,
    stack: error.stack,
  })
  next(error)
})

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    })
    next(err)
  }
)
// error handling middleware end

export default app
