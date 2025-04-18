import mongoose, {Document,Schema} from "mongoose";

export interface Iuser extends Document {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
};


const userSchema = new Schema<Iuser> ({
    username: {type:String,required: true, unique:true},
    password: {type:String,required:true},
    email: {type: String, required:true},
    phoneNumber: { type:String, required:true},
});

const User = mongoose.model<Iuser>("user",userSchema);

export default User;