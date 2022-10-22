const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema;

const FileSchema = new schema({
    path:{
        type:String,
        required:true,
    },
    originalName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minLength:3
    },
    downloadCount:{
        type:String,
        required:true,
        default:0
    }
})
FileSchema.pre('save', async function(next) {
   
        if(this.password != null && this.password !== ''){
       this.password = await bcrypt.hash(this.password , 10);
    
    
        }
    
    next()
})

module.exports = mongoose.model('file', FileSchema);