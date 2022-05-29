const mongoose = require("mongoose");

//address schema
const addressSchema = new mongoose.Schema({
        street: String,
        city: String
})


// We create a schema in mongo 
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=>Date.now(),
    },
    updatedAt: {
        type: Date,
        default: ()=>Date.now(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema
})

// we cannot use arrow function beacuase we need to use this inside the function as a function scope
userSchema.methods.sayHi = function() {
    console.log(`Hi, My name is ${this.name}`);
}

// Static method can be used on Model directly
userSchema.statics.findByName = function(name) {
    return this.find({name: new RegExp(name, 'i')});
}

// can be used to chain queries
userSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, 'i')})
}

userSchema.virtual('namedEmail').get(function() {
    return `${this.name} <${this.email}>`;
});


// middleware
userSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
})

userSchema.post('save', function(doc, next){
    doc.sayHi(); // we cannot use this in middleware as it will reference to this of middleware function
    next();
})


// this will create the model with the name User and will use userSchema 
module.exports = mongoose.model("User", userSchema);


/// find and where gives query which can chained