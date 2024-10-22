import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    sender:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    receiver:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:  true,
    },
    status:{
        type: String,
        default: "pending",
        enum: [ "pending", "accepted", "rejected"],
    }
 },{
    timestamps: true,
})

export const Request = mongoose.model( "Request", requestSchema);



