import mongoose from "mongoose";


const topicSchema = new mongoose.Schema({
    topic:{
        type: String,
        required : true
    },
    tags: {
        type: Array,
        required: true
    }
})

const topic = mongoose.model('topics', topicSchema)

export default topic;