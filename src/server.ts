import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function server() {
  try {
    const connectDB = await mongoose.connect(config.database_url as string, {
      dbName: config.database_name,
    })
    if (connectDB) {
      console.log('Mongodb is connected')
    }
    app.listen(config.port, function () {
      console.log(`Server is running on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

server()
