const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Configuration = require("openai");
const OpenAIApi = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});

const OpenAI = require("openai");

const openai = new OpenAI();

async function main(prompt,ratio) {
  const image = await openai.images.generate({ prompt:`${prompt}`,n: 1,
  size: "1024x1024"});

    return image.data[0].url

}





app.post("/generate", async (req, res) => {
    let data = await main(req.body.prompt);
    console.log(data)
  res.send({data})
});

















// code for chat iuntergation
app.post("/chat",async(req,res)=>{
  const {message} = req.body;
  try{
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      messages: [{ role: "system", content: `${message}` }],
  })
  res.json({message: response.choices[0].message.content})

}catch(e){
    res.send(e).status(400)
}
})
