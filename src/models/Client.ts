import mongoose, { CallbackError, Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { string, z } from "zod";
export const Client = z.strictObject({
  name: z.string({ required_error: 'name is required' }).min(4, 'name must have 4 or more chars').max(30, 'name must be under 30 chars').regex(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, 'invalid user name'),
  email: z.string({ required_error: 'email is required' }).email('invalid email'),
  password: z.string({ required_error: 'password is required' }).length(8, 'password should have 8 chars').regex(/^[\x21-\x7E]+$/, 'invalid password'),
  isSeller: z.enum(['on','off']).transform((val)=>{
    const map = {'on':true,'off':false};
    return map[val];
  }),
  avatar: z.instanceof(Buffer),
});
export type ClientType = z.infer<typeof Client>;
type ClientDoc = {
  name: string,
  email: string,
  avatar: string,
  _id: mongoose.Types.ObjectId,
  isSeller: Boolean
};
export const ClientSchema = new Schema<ClientType>({
  name: {
    type: String,
    required: [true, 'name is required.'],
    maxlength: 30,
    minlength: 4,
    validator: {
      validate: (value: string) => Client.pick({ name: true }).safeParse({ name: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid user name.`
    }
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
    validator: {
      validate: (value: string) => Client.pick({ email: true }).safeParse({ email: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
    unique: true,
    valodator: {
      validate: (value: string) => Client.pick({ password: true }).safeParse({ password: value }).success,
      message: (props: { value: string; }) => `${props.value} is not a valid password.`
    }
  },
  avatar: {
    type: Buffer,
    required: [true, 'profile pic is required.']
  },
  isSeller: {
    type: Boolean,
    required: [true, 'isSeller field is required.'],
  },
}, {
  timestamps: true,
  toJSON: {
    versionKey: false, // Remove __v field
    transform: (_, ret): ClientDoc => {
      delete ret.password;
      ret.avatar = `http://localhost:${process.env.PORT}/client-avatar/${ret._id}.jpg`
      return { email: ret.email, name: ret.name, avatar: ret.avatar, _id: ret._id, isSeller: ret.isSeller };
    },
  },
});

ClientSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
  next();
});

ClientSchema.pre('insertMany', async function (next, docs) {
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

ClientSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], async function (this: any, next) {
  const update = this.getUpdate();
  if (update?.password !== null) update.password = await bcrypt.hash(update.password, await bcrypt.genSalt(12));
  next();
});

export const ClientModel = model<ClientType>('client_model', ClientSchema);