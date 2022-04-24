const User = require("../model/user");
const bcrypt = require("bcrypt");
const tokengenerator = require("../middleware/tokengenertor")


const signUp = ((req, res) => {
    const user = req.body;
    // console.log(user);
    const newUser = new User(req.body);

    if(!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.password || !req.body.confirmPassword){
        res.status(400).send('Fill all the fields...');
    }
    else{
        if(newUser.password === req.body.confirmPassword){
            const hashedPassword = bcrypt.hashSync(newUser.password , 10);
            newUser.password = hashedPassword;
            try {
                newUser.save();
                
            } catch {
                res.status(200).send("doesnot saved to db");
            }
           
            res.status(200).send("saved to db");
        }
        else{
            res.status(422).send('Password Does Not Match...');
        }
        
    }    
});

const login = ((req,res) => {
    const { email, password } = req.body;
  
    User.findOne({ "email": email }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const token = tokengenerator(user);
                    res.header('authorization',token).send({user,token})
                    // res.status(200).json({token});    
                } else {
                    res.status(200).send("password not match");
                }
            })
        } else {
          res.status(200).send("user not found")
        }
    })
});


module.exports = { signUp, login };