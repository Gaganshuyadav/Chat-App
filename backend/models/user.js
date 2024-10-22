import mongoose from "mongoose";
import bcrypt from "bcrypt";

//we can also take new Schema

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[ true, "Please Enter Your Name"],
    },
    username:{
        type: String,
        unique: true,
        required: [ true, "Please Enter Your Username "],
    },
    avatar:{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    bio:{
        type:String,
        required: [ true, "Please Enter Your Bio"],
    },
    password:{
        type:String,
        required: [ true, "Password should be greater than 8 characters"],
        select: false,
    },
  },
  {
    timestamps:true,
  }
)


//Convert password into hash password
userSchema.pre( "save", async function( next){
    if(!this.isModified("password")){
        next();
    }
    else{
        console.log("hash");
        this.password = await bcrypt.hash(this.password, 10);
    }
});


//compare password with hash password
userSchema.methods.comparePassword = function( enteredPassword){
    const result = bcrypt.compare( enteredPassword, this.password);
    return result;
}


const User = mongoose.models.User || mongoose.model( "User", userSchema);

export { User};

