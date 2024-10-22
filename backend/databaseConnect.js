import mongoose from "mongoose";

const connectDB = ( uri)=>{
    mongoose.connect(uri, { dbName:"ChapApp"})
    .then( ( data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err)=>{
        console.log("error in database connection");
        console.log(err);
    })
};

export { connectDB};


