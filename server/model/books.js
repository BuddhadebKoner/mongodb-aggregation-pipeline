import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
   _id: {
      type: Number,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   author_id: {
      type: Number,
      required: true,
      ref: 'Author'
   },
   genre: {
      type: String,
      required: true
   }
}, {
   collection: 'books'
});

const Book = mongoose.model('Book', bookSchema);

export default Book;