const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors")

const app = express();  
const port = 5000;
const URL = "mongodb+srv://admin:admin123@cluster0.8szvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection success") })
    .catch((err) => {console.log(err.message);
});

app.use(cors());
app.options('*', cors());
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

        
app.all('/hello', (req, res) => {
    res.send('Hello World, from express');
});

app.use(require("./routes/user"));
app.use(require("./routes/project"));
// enable cors


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});