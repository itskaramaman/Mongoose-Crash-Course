const mongoose = require('mongoose');
const User = require('./User');

// connect to mongoose, takes two other callbacks for connection success and error
// call backs are not required as mongoose queue up the commands and only executes once mongoDB
// is connected
mongoose.connect("mongodb://localhost/testdb",
    ()=> console.log("DB connected"),
    (e)=>console.error(e)
);

run3();
async function run3() {
    try {
        // const user = await User.findOne({name: "Sally"});
        // console.log(user);
        // user.sayHi();

        // console.log("user using static");
        // const userUsingStatic = await User.findByName("Sally");
        // console.log(userUsingStatic);

        // console.log("user using query");
        // const userUsingQuery = await User.find().byName("Sally");
        // console.log(userUsingQuery);

        console.log("using virtual namedEmail");
        const virtualUser = await User.findOne({name: "Sally", email:"TEst@test.com"});
        console.log(virtualUser);
        await virtualUser.save();
        console.log(virtualUser);
        // console.log(virtualUser.namedEmail);
    } catch (e) {
        console.error(e);
    }
}

// run2();
async function run2() {
    try {
        // const user = await User.findById("6293bf32241f79448d4419d8");
        // console.log("Using findById");

        // const user = await User.find({name: 'Kyle'}); findOne, exists
        const user = await User
            .where("age")
            .gt("12")
            .where("name")
            .equals("Sally")
            .populate("bestFriend")  // best way to joins, it will find all the bestfriends of this user
            .limit(2)
            .select("age"); // we have used where clause in mongoDB

        // Add a bestfriend
        // user[0].bestFriend = "6293bbbae50bce9ab5a508be";
        // await user[0].save();
        console.log(user);
    } catch (e) {
        console.error(e);
    }
}

// run();
async function run() {
    // const user = await User.create({name: 'Karam', age: 26}); // this and next two lines create a new user
    // const user = new User({name: 'Kyle', age: 26});
    // await user.save();

    try {
        const user = await User.create({
            name: 'Kyle',
            age: 28,
            email: 'TEst@test.com',
            hobbies: ["Weight Lifting", "Bowling"],
            address: {
                street: "Main St"
            }
        })
    
        user.name = "Sally";
        await user.save();
        console.log(user);
    } catch (e) {
        console.log(e.message);
    }

    
}


