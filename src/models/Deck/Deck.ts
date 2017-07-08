import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import * as cuid from 'cuid';
import * as mongoose from 'mongoose';
import { DeckModel } from './Deck.d';

const deckSchema = new mongoose.Schema({
    cards: [ String ],
    name: String
}, { timestamps: true });

export const Deck: mongoose.Model<DeckModel> = mongoose.model<DeckModel>('Account', deckSchema);
