const express = require("express");
require("dotenv").config();
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
const baseUrl = process.env.BASE_URL;
const axios = require("axios");
const cheerio = require("cheerio");
const Url = require("../models/Url");

//@routes POST /api/url/shorten

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  // check baseUrl is valid
  if (!validUrl.isUri(baseUrl)) {
    res.status(401).json("invalid base url");
  }

  // create url code
  const urlCode = shortid.generate();
  console.log(baseUrl);
  // check long url
  if (validUrl.isUri(longUrl)) {
    let url;
    try {
      const response = await axios.get(longUrl);
      const html = response.data;
      const $ = cheerio.load(html);
      const longLinkTitle = $("title").text();

      url = await Url.findOne({ urlCode });
      if (url) {
        urlCode = shortid.generate();
      }
      const shortUrl = `${baseUrl}/${urlCode}`;
      url = await new Url({
        urlCode,
        longUrl,
        shortUrl,
        longLinkTitle,
        date: new Date().toDateString(),
      });
      await url.save();
      res.status(201).json({ date: url });
    } catch (e) {
      console.error(e);
      res.status(401).json("invalid base url");
    }
  } else {
    res.status(401).json("invalid url");
  }
});

module.exports = router;
