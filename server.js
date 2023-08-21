import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dreamer", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const image = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.GIPHY_API_KEY}&s=${prompt}`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => data.data.images.original.url);

    res.send({ image });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

app.listen(8080, () =>
  console.log("Server running on port http://localhost:8080/dreamer")
);
