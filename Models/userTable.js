const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: false
  },
  email: {
    type: String,
    unique: false
  },
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  },
  linkPrecedence: {
    type: String,
    enum: ['primary', 'secondary'],
  },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;