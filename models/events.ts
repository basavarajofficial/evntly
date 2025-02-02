import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['online', 'offline'], required: true },
  image: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
});

// Delete existing model if it exists
delete mongoose.models.Event;

export const Event = mongoose.model('Event', eventSchema);
