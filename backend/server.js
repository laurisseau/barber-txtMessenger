import express from "express";
import path from "path";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})

//app.use(errorController)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});