const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/get-scraped-data", async (req, res) => {
  try {
    const { url, classes } = req.body;
    const data = [];
    if (url && classes) {
      await axios(url).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        $(classes, html).each(function () {
          const title = $(this).text();
          const urlText = $(this).find("a").text();
          const url = $(this).find("a").attr("href");
          data.push({ title, url, urlText });
        });
      });
    }
    return res.send({ status: 200, data: data, message: "SUCCESS" });
  } catch (e) {
    res.send({ status: 400, message: "FAILED", error: e });
  }
});

app.listen(3000, () => console.log("Server is running on PORT 3000."));
