import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   index: {
      type: Number,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   isActive: {
      type: Boolean,
      default: false
   },
   registered: {
      type: Date,
      required: true
   },
   age: {
      type: Number,
      required: true
   },
   gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
   },
   eyeColor: {
      type: String,
      required: true
   },
   favoriteFruit: {
      type: String,
      required: true
   },
   company: {
      title: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      phone: {
         type: String,
         required: true
      },
      location: {
         country: {
            type: String,
            required: true
         },
         address: {
            type: String,
            required: true
         }
      }
   },
   tags: [{
      type: String
   }]
}, {
   collection: 'users'
});

const User = mongoose.model('User', userSchema);

export default User;