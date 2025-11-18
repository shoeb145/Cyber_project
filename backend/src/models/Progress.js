import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index:true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  required: true,
    index:true
  },
  startedAt: { type: Date, default: Date.now },
  
completedModules:[{ type: mongoose.Schema.Types.ObjectId, ref: "Module" } ],
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    percentage:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:["in-progress" ,"completed"],
        default:"in-progress"
    },
    completedAt:{
        type:Date
    }
  
},{timestamps:true});


export default mongoose.model("Progress",ProgressSchema)