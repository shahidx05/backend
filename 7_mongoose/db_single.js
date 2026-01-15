const mongoose = require('mongoose')
const { Schema } = mongoose;
async function main() {
    await mongoose.connect(`mongodb+srv://shahidx05:2005%40Shahid@cluster0.rrnfc1t.mongodb.net/database`)

    const userSchema = new Schema({
        name: String,
        age: Number,
        city: String,
        gender: String
    })

    const User = mongoose.model("user", userSchema)

    // Create a single document

    const user1 = new User({ name: "pk", age: 22, gender: "male" })
    await user1.save()

    // or

    await User.create({
        name: "Shahid",
        age: 20,
        city: "Gwalior",
        gender: "male"
    })

    await User.insertMany([
        { name: "PK", age: 22, city: "Indore", gender: "male" },
        { name: "AK", age: 21, city: "Bhopal", gender: "female" }
    ])

    console.log("Data Inserted")

    // Find all documents
    const allUsers = await User.find({})
    console.log("All Users:", allUsers)

    // Find users by condition
    const maleUsers = await User.find({ gender: "male" })
    console.log("Male Users:", maleUsers)

    // Find one document
    const oneUser = await User.findOne({ name: "Shahid" })
    console.log("One User:", oneUser)

    /************************************
    * 🟡 UPDATE OPERATIONS
    ************************************/

    // Update one document
    await User.updateOne(
        { name: "Shahid" },       // condition
        { age: 21 }               // update
    )

    // Update multiple documents
    await User.updateMany(
        { gender: "male" },
        { city: "Delhi" }
    )

    // Find and update + return updated document
    const updatedUser = await User.findOneAndUpdate(
        { name: "PK" },
        { age: 23 },
        { new: true }            // return updated document
    )
    console.log("Updated User:", updatedUser)

    /************************************
     * 🔴 DELETE OPERATIONS
     ************************************/

    // Delete one document
    await User.deleteOne({ name: "AK" })

    // Delete multiple documents
    await User.deleteMany({ city: "Delhi" })

    console.log("Delete Operations Completed")

    /************************************
     * CLOSE CONNECTION
     ************************************/
    await mongoose.connection.close()
    console.log("MongoDB Connection Closed")
}

main()
    .then(() => console.log("connected to DB"))
    .catch((error) => console.log("error:", error))
