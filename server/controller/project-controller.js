const Project = require("../model/project");

const addToarchieve = (async (req, res) => {
    try {
        await Project.updateOne({ _id: req.body.projectid }, {
            $set: {
                archieve: true,
                completed:true
            }
        })
        res.status(200).send("updated successfully")
    } catch (err) {
        res.status(422).send(err)
    }
    
});

const addTocompleted = (async (req, res) => {
    try {
        await Project.updateOne({ _id: req.body.projectid }, {
            $set: {
                completed: true
            }
        })
        res.status(200).send("updated successfully")
    } catch (err) {
        res.status(422).send(err)
    }
    
});

const currentProject = ((req, res) => {
    Project.find({ projectBy: req.user._id || req.body.id, archieve: false, completed: false }).then((project) => {
        res.status(200).send(project)
    }).catch((err) => {
        res.status(422).send(err)
    })
});

const archievedProjects = ((req, res) => {
    Project.find({ projectBy: req.user._id || req.body.id, archieve: true }).then((project) => {
        res.status(200).send(project)
    }).catch((err) => {
        res.status(422).send(err)
    })
});

const completdProject = ((req, res) => {
    Project.find({ projectBy: req.user._id || req.body.id, completed: true }).then((project) => {
        res.status(200).send(project)
    }).catch((err) => {
        res.status(422).send(err)
    })
});

const searchcompleted = ((req, res) => {
    console.log(req.params)
    const re = new RegExp(req.params.value, "i")
     

        Project.find().or([{ projectName : re},{techStack:re}]).and({ projectBy: req.user._id, completed:true })
        .then((result) => {
        res.status(200).send(result)
       }).catch((err)=>{res.status(422).json({message:"doesnot find any thing"})})
        
})
const searchArchieved = ((req, res) => {
    console.log(req.params)
    const re = new RegExp(req.params.value, "i")
     

        Project.find().or([{ projectName : re},{techStack:re}]).and({ projectBy: req.user._id, archieve:true,completed:true })
        .then((result) => {
        res.status(200).send(result)
       }).catch((err)=>{res.status(422).json({message:"doesnot find any thing"})})
        
})
const searchCurrent = ((req, res) => {
    console.log(req.params)
    const re = new RegExp(req.params.value, "i")
     

        Project.find().or([{ projectName : re},{techStack:re}]).and({ projectBy: req.user._id, archieve:false,completed:false })
        .then((result) => {
        res.status(200).send(result)
       }).catch((err)=>{res.status(422).json({message:"doesnot find any thing"})})
})

module.exports = { addToarchieve,addTocompleted,currentProject,archievedProjects,completdProject,searchcompleted,searchArchieved,searchCurrent };