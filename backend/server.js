import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express()

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

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