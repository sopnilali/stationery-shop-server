import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  database_name: process.env.DATABASE_NAME,
  node_env: process.env.NODE_ENV,
}
