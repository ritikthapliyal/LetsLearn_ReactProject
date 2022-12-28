import express from 'express'
import {addCourse, getAllCourses , getAllTags, getSearchResult , getCourse} from '../controllers/courses.js'

const courses = express.Router();

courses.get('/search/',getSearchResult)
courses.get('/tags/',getAllTags)
courses.get('/:id',getCourse)
courses.get('/',getAllCourses)
courses.post('/',addCourse)

export default courses