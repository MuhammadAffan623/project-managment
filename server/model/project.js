const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        maxLength: 20
    },
    description: {
        type: String,
    },
    imagePath:{
        type: String,
    },
    startDate: {
        type: String
    },
  
    githubLink: {
        type: String
    },
    liveUrl: {
        type: String
    },
    projectBy:{
        type:ObjectId,
        ref:"User"
    },
    archieve: {
        type: Boolean,
        default: false
    },
    techStack: [{ type: String }],
    // techStack: {type:Array,text:String},
    completed: {
        type: Boolean,
        default: false
    }
});

const Project = mongoose.model("Project", projectSchema);
module.exports =  Project ;