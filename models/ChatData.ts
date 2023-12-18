import { Schema, model, models } from 'mongoose';

const ChatDataSchema = new Schema({
  userId: { type: String, required: true },
  history: [{
    role: { type: String, required: true },
    parts: { type: String, required: true },
    gif: { type: String },
  }],
});


export const ChatData = models.ChatData || model("ChatData", ChatDataSchema);