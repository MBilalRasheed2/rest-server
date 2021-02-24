const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        requried:true,
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        requried:true,
        trim:true,
        min:3,
        max:20
    },
    userName:{
        type:String,
        requried:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        requried:true,
        trim:true,
        unique:true,

    },
    hashed_password:{
        type:String,
        requried:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    profilePicture:{
        type:String
    }

},{
    timestamps:true
});
// userSchema.virtual('password').set(function(password){
//     this.hashed_password=bcrypt.hashSync(password,10)
// });
userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
});
userSchema.method({
    authenticate:async function(password){
        
        const res=await bcrypt.compare(password,this.hashed_password);
       
        return res;
    }
});
module.exports=mongoose.model('User',userSchema);