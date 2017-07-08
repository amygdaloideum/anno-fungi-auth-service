import * as mongoose from 'mongoose';

export type DeckModel = mongoose.Document & {
    name: string;
    cards: string[];
}