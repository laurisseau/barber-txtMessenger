import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
import express from "express";


const router = express.Router();

dotenv.config({ path: "config.env" });



const app = express();
app.use(express.json());
app.use("/", router);

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/build"))); //this is not right file remember to change

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html")); //this is not right file remember to change
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

router.post("/create-msg", async (req, res) => {
  try {
    const numbers = ["+14079482360", "+14075765595"];

    Promise.all(
      numbers.map((number) => {
        twilio(accountSid, authToken).messages.create({
          body: req.body.message,
          from: twilioNumber,
          to: number,
        });
      })
    );

    res.send("message sent");
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
