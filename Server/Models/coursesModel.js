import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    course: String,
    description: String,
    creator: String,
    duration: Number,
    image: String,
    price:Number,
    rating: {type: Number , default:"---"},
    tags: [String],
})


courseSchema.index({ "course": "text", "description": "text","creator":"text"})

const Courses = mongoose.model('Courses',courseSchema)

export default Courses