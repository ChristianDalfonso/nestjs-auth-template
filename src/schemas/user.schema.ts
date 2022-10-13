import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 16,
  })
  username: string;

  @Prop({
    required: true,
    minlength: 7,
    maxlength: 100,
  })
  password: string;

  @Prop({ required: true, minlength: 1, maxlength: 16 })
  firstname: string;

  @Prop({ required: true, minlength: 1, maxlength: 16 })
  lastname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: Function) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    bcrypt.hash(this['password'], 10, (err, hash) => {
      this['password'] = hash;
      return next();
    });
  } catch (err) {
    return next(err);
  }
});
