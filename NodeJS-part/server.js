const express = require('express') // Nodejs web api library
const mongoose = require('mongoose') // MongoDB connect library
const userRouter = require("./routers/user") // nodejs file of pages which subpage on user page 
const mongoDBRouter = require('./routers/mongoDB')// nodejs file of pages which subpage on mongoDB page
const cors = require('cors');// cors library for Connect/Express middleware 
const dotevn = require('dotenv')// librarry to use .env file actuallly it not necessary here because I dont use .env file

const app = express()// Nodejs web api
app.use(express.json())
app.set('view engine', 'ejs')// determinet location of ejs file and ejs file is like html file
app.use(cors());// use all cors function
app.use('/mongoDB', mongoDBRouter) // pages which subpage on mongoDB page. Here we determinet upper page 
app.use('/user', userRouter) // pages which subpage on user page. Here we determinet upper page 

dotevn.config()//take data .env file

const dbUrl = "mongodb+srv://natsu:1234@cluster0.idnat.mongodb.net/?retryWrites=true&w=majority" // MongoDB connecting url
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }) // MongoDB connecting function
    .then(() => {

        app.get('/', (req, res) => { // localhost 3000 adress page 
            console.log("Here")
            res.render('index', { text: 'world'}) // render ejs file or html both are same, send a data
        })
        
    })
    .catch((err) =>{
        console.log("Connecting error ",err)
    })

app.listen(3000) // listen port 3000 we determine which port is have those pages (simple)


