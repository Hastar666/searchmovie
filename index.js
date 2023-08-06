import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const app = express();
const PORT = 3000;
app.use(bodyparser.urlencoded({ extended: true }));
//app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("front.ejs");
});

app.post("/submit", async (req, res) => {
  console.log(req.body.mName);
  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/auto-complete",
    params: {
      q: req.body.mName,
    },
    headers: {
      "X-RapidAPI-Key": "e6a596025fmsh2cb2243057eb8c2p1149d3jsnaed57b47ab30",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const jsonData = response.data;
    const items = jsonData.d;
    const name = req.body.mName;
    res.render("index.ejs", { items, name });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
