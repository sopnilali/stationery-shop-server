import { model, Schema } from 'mongoose'
import { UserInferface } from './user.interface'
import validator from 'validator'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
) // Automatically adds `createdAt` and `updatedAt`

const User = model<UserInferface>('users', userSchema)

export default User
