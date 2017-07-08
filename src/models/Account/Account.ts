import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import * as cuid from 'cuid';
import * as mongoose from 'mongoose';
import { AccountModel } from './Account.d';

const accountSchema = new mongoose.Schema({
  userId: String,
  username: { type: String, unique: true },
  password: String,
  decks: [String],
}, { timestamps: true });

/**
 * Password hash middleware.
 */
accountSchema.pre('save', function save(this: any, next: Function): void {
  const account = this;
  account.cuid = cuid();
  if (!account.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(account.password, salt, () => { }, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      account.password = hash;
      next();
    });
  });
});

accountSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: any, isMatch: any) => {}): void {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

export const Account: mongoose.Model<AccountModel> = mongoose.model<AccountModel>('Account', accountSchema);
//export const Account = mongoose.model('Account', accountSchema);
