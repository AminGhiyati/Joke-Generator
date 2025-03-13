import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/joke", async (req, res) => {
    try {
        const result = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${req.query.filter}`)
        if (result.data.setup !== undefined) {
            res.render("index.ejs", {
                setup: result.data.setup,
                delivery: result.data.delivery,
            });
        } else if (result.data.joke !== undefined) {
            res.render("index.ejs", {
                singleJoke: result.data.joke, 
            });
        } else {
            res.render("index.ejs", {
                nojoke: true,
            });
        }
        

    } catch (error) {
        
        res.render("index.ejs", {
            nojoke: true,
        });


    };
})


app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});
