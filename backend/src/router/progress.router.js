import express from 'express'
import { coursesProgress, enrollProgress, lessonProgress } from '../controllers/progress.controller.js'


const progressRoute = express.Router()

progressRoute.get("/user/:userId",coursesProgress)
progressRoute.post("/course/enroll",enrollProgress)
progressRoute.post("/lesson/complete",lessonProgress)


export default progressRoute