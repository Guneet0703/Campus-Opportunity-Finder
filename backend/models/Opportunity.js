const mongoose = require('mongoose');
const validator = require('validator');

const CATEGORIES = [
  'Internship',
  'Hackathon',
  'Workshop',
  'Coding Contest',
  'Scholarship',
  'Others',
];

const OpportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Opportunity title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: 'Category must be one of: ' + CATEGORIES.join(', '),
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility is required'],
      trim: true,
    },
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    registrationLink: {
      type: String,
      required: [true, 'Registration link is required'],
      trim: true,
      validate: {
        validator: (value) =>
          validator.isURL(value, { require_protocol: true }),
        message: 'Registration link must be a valid URL (including http/https)',
      },
    },
  },
  { timestamps: true }
);

OpportunitySchema.index({ title: 'text', organizer: 'text' });

OpportunitySchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Opportunity', OpportunitySchema);
