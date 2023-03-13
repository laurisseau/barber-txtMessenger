import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
  },

  number: {
    type: String,
    required: [true, 'A number is required'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

contactSchema.pre('save', async function (next) {
  this.number = await '+1' + this.number;

  next();
});

const Contacts = mongoose.model('Contacts', contactSchema);

export default Contacts;
