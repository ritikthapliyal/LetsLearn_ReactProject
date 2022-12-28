import Courses from '../Models/coursesModel.js'


export const getAllCourses = async (req,res) => {
    
    const limit = req.query.limit
    const offset = req.query.offset
    const count = await Courses.count().then((count)=> {return count})
    const canFetchMore = count >= offset ? true : false
    
    console.log(limit,offset,count)

    try{
        const courses = await Courses.find().skip(offset).limit(limit)
        res.status(200).json({result : courses,canFetchMore})
    }
    catch(error){
        res.status(404).json({message:error})
    }

}


export const addCourse = async (req,res) => {
    
    try{
        
        let newCourse = await Courses.create({...req.body})
        return res.status(201).json(newCourse)
    }
    catch(error){
        return res.status(409).json({message:error})
    }

}



export const getSearchResult = async (req,res) => {
    

    const type = req.query.type
    const value = req.query.value

    if(type === "query"){
        
        try{
            const result = await Courses.find({ $text: { $search: `${value}` } })
            return res.status(200).json({result: result})
        }
        catch(error){
            return res.status(409).json({message:error})
        }
    
    }
    else if (type === "tag"){

            try{
                const result = await Courses.find( { tags: `${value}` } )
                return res.status(200).json({result: result})
            }
            catch(error){
                return res.status(409).json({message:error})
            }
    }
    else
        return res.status(404).json({message:"Not Found"})
    

}


export const getAllTags = async (req,res) => {

    try{
        const tags = await Courses.find({},{tags:1,_id:0})
        const freq = {}

        tags.forEach(obj => {

            obj.tags.forEach(tag =>{
                if(!freq[tag]){
                    freq[tag] = 1
                }
                else{
                    freq[tag] += 1
                }
            })

        })

        return res.status(200).json({result: freq})
    }

    catch(err){
        return res.status(404).json({result: err})
    }



}

export const getCourse = async (req,res) =>{
    try{
        const course = await Courses.find({_id : `${req.params.id}`})
        res.status(200).json({result:course})
    }
    catch(error){
        res.status(404).json({message:error})
    }
}   


