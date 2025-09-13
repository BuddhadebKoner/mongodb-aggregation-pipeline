import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
   _id: {
      type: Number,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   birth_year: {
      type: Number,
      required: true
   }
}, {
   collection: 'authors'
});

const Author = mongoose.model('Author', authorSchema);

export default Author;