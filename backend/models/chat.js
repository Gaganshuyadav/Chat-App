import mongoose, { Schema, Types} from "mongoose";

const chatSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    groupChat:{
        type: Boolean, 
        default: false,
    },
    creator:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    members:[{
        type: Types.ObjectId,
        ref:"User",
    }],
  },
  {
    timestamps: true,
  }  
)

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export { Chat};


