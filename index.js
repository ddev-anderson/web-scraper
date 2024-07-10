const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const URL = "https://www.globo.com/";
const PORT = 3000;

app.get("/posts", async (req, res) => {
  try {
    const posts = await scrapeData();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
    });
  }
});

async function scrapeData() {
  const result = await axios(URL);
  const html = result.data;
  const $ = cheerio.load(html);
  const posts = [];

  $(".post-row.with-6-posts .post").each(function () {
    const url = $(this).find(".post__link").attr("href");
    const title = $(this).find(".post__title").text();

    posts.push({ url, title });
  });
  return posts;
}

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
