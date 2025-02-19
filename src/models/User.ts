import { CallbackError, Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { string, z } from "zod";
export const User = z.strictObject({
  name: z.string({ required_error: 'name is required' }).min(4, 'name must have 4 or more chars').max(30, 'name must be under 30 chars').regex(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, 'invalid user name'),
  email: z.string({ required_error: 'email is required' }).email('invalid email'),
  password: z.string({ required_error: 'password is required' }).length(8, 'password should have 8 chars').regex(/^[\x21-\x7E]+$/, 'invalid password'),
  avatar: z.instanceof(Buffer)
});
export type UserType = z.infer<typeof User>;
type UserDoc = {
  name: string,
  email: string,
  avatar: string
};
export const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: [true, 'name is required.'],
    maxlength: 30,
    minlength: 4,
    validator: {
      validate: (value: string) => User.pick({ name: true }).safeParse({ name: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid user name.`
    }
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
    validator: {
      validate: (value: string) => User.pick({ email: true }).safeParse({ email: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
    unique: true,
    valodator: {
      validate: (value: string) => User.pick({ password: true }).safeParse({ password: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid password.`
    }
  },
  avatar: {
    type: Buffer,
    required: [true, 'profile pic is required.']
  }
}, {
  timestamps: true,
  toJSON: {
    versionKey: false, // Remove __v field
    transform: (_, ret): UserDoc => {
      delete ret.password;
      ret.avatar = `http://localhost:${process.env.PORT}/user-avatar/${ret._id}.jpg`
      return { email: ret.email, name: ret.name, avatar: ret.avatar };
    },
  },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
  next();
});

UserSchema.pre('insertMany', async function (next, docs) {
  try {
    const documents = Array.isArray(docs) ? docs : [docs];
    await Promise.all(documents.map(async (doc) => {
      if (doc.password) doc.password = await bcrypt.hash(doc.password, await bcrypt.genSalt(12));
    }));
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

UserSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], async function (this: any, next) {
  const update = this.getUpdate();
  if (update?.password !== null) update.password = await bcrypt.hash(update.password, await bcrypt.genSalt(12));
  next();
});

export const UserModel = model<UserType>('user_model', UserSchema);