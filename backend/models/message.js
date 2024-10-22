import { Schema, Types, model} from "mongoose";

const messageSchema = Schema({
    sender:{
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    chat:{
        type: Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    content:{
        type: String,
    },
    attachments:[{
        public_id: {
            type: String,
        },
        url:{
            type: String,
        }
      },       
    ],
  },
  {
    timestamps: true,
})


const Message = model( "Message", messageSchema);
export {Message};

    