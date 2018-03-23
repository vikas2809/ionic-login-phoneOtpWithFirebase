//creating the schema of the user collection where all the data is going to be stored

var mongoose = require('mongoose');

//defining the schema of the user table

var user_schema=mongoose.Schema;
var userSchema=new user_schema({
    first_name: {type: String},
    last_name: {type: String},
    email: { type: String, unique: true},
    password: { type: String},
    phone_number: {type: Number, unique: true},
    image: { type: String },
    role: { type: String },
    isVerified: {type: Boolean},
    created_at: { type: Date, default: Date.now()},
    updated_at: { type: Date}
});


//creating the collection with the defined schema
var User = mongoose.model('user',userSchema);

module.exports=User;