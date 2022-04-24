const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Project = require("../model/project");
const multer = require('multer');
const { addToarchieve, addTocompleted, currentProject, archievedProjects, completdProject,searchcompleted,searchArchieved,searchCurrent } = require("../controller/project-controller");
const upload = multer({ dest: 'uploads/' });


router.put("/addToarchieve", addToarchieve)
router.put("/addTocompleted", addTocompleted)
router.get("/projects/current", auth, currentProject)
router.get("/projects/archived", auth, archievedProjects)
router.get("/projects/completed",auth,completdProject )
router.get("/serachProject/completed/:value",auth,searchcompleted)
router.get("/serachProject/archieve/:value",auth,searchArchieved)
router.get("/serachProject/current/:value",auth,searchCurrent)

router.post("/addProject",auth,upload.single('projectImage') , (req, res) => {
    if (!req.file || !req.body) {
        return res.status(422).send("Fill all the fields")
    }
    console.log(req.file)
    const project = new Project(req.body)
    project.imagePath = req.file.path   
    project.projectBy = req.user._id
   
    project.save().then(() => {
        console.log("saved succesfully")
        res.status(200).send("success")
    }).catch((err) => {
        res.status(422).send(err)
    })
});

router.put("/updateProject/:value", auth,upload.single('projectImage'), async (req, res) => {
    // if (!req.file || !req.body) {
    //     return res.status(422).send("Fill all the fields")
    // }
    try {
        await Project.updateOne({ _id: req.params.value }, {
            $set: {
                projectName: req.body.projectName,
                description: req.body.description,
                liveUrl: req.body.liveUrl,
                githubLink: req.body.githubLink,
                startDate: req.body.startDate,
                techStacks: req.body.techStacks,
                imagePath: req.file.path
            }
        })
        res.status(200).send("updated successfully")
    } catch (err) {
        res.status(422).send(err)
    }
});


module.exports = router;