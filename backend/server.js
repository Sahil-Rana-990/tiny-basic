const fs = require("fs");
const express = require("express");
const mongoose=require('mongoose')
const cors = require("cors");
const uuid = require("uuid");
const app = express();

//---------------connection=========================================
mongoose
  .connect(
    "mongodb+srv://hemarana9099852230:12345@cluster0.rakth2q.mongodb.net/GRAPHQL"
  )
  .then((res) => console.log("connection succesful"));

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
});
const ImageModel = new mongoose.model("images", ImageSchema);
//----------------------------------------------------------------

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods:['GET','POST']
  })
);

app.get("/", (req, res) => {
  res.send("main page");
});

app.post("/api/getimage", async (req, res) => {
  const uuid4 = uuid.v4();
  const base64ImageData = await req.body;
  console.log(base64ImageData)
  const data = await ImageModel({
    imageName: uuid4,
    imageData: base64ImageData.data,
  });
  data.save().then((result) => {
    console.log("data stored !!");
    res.send({ imaeURL: `http://localhost:4000/api/image/${uuid4}` });
  });
});

app.get("/api/image/:imgName",async  (req, res) => {
    const base64ImageData=await ImageModel.findOne({imageName:req.params.imgName});
    console.log(base64ImageData)
  
    const imgdata = base64ImageData.imageData.split(",")[1]; // Extract the base64 data part
    const imageBuffer = Buffer.from(imgdata, "base64");
  
    res.setHeader("Content-Type", "image/png");
    res.end(imageBuffer);
});

app.listen(4000, () => {
  console.log("PORT :- 4000");
});
