const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  role: {
    type: String,
    enum: ['1', '2'],
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  profile_img: {
    type: String,
    default: 'profile/default_profile.png',
  },
  designation: {
    type: String,
    default: 'developer',
  },
});

const User = mongoose.model('User', userSchema);

// Blog Schema
const blogSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  blog_title: {
    type: String,
    required: true,
  },
  blog_content: {
    type: String,
  },
  image_url: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accept', 'Reject', 'Revert', 'Draft'],
    default: 'Draft',
  },
  remarks: {
    type: String,
  },
  deleted_at: {
    type: Date,
  },
  published_at: {
    type: Date,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

// Tag Schema
const tagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

// BlogTag Schema
const blogTagSchema = new Schema({
  blog_id: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  tag_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    required: true,
  },
});

const BlogTag = mongoose.model('BlogTag', blogTagSchema);

module.exports = { User, Blog, Tag, BlogTag };
