const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;

const transformXmlToJson = (xmlData) => {
  const result = [];
  const items = xmlData.rss.channel[0].item;

  items.forEach((item) => {
    const title = item.title[0];
    const link = item.link[0];
    const author = item['dc:creator'][0];
    const published = new Date(item.pubDate[0]).getTime();
    const content = item['content:encoded'][0];
    
    result.push({
      title,
      link,
      author,
      published,
      created: published, 
      category: [], 
      content,
      enclosures: [],
      content_encoded: content,
      media: {} 
    });
  });

  return result;
};


const fetchAndConvertFeed = async (url) => {
  try {
    const response = await axios.get(url);
    const xml = response.data;
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    return transformXmlToJson(result);
  } catch (error) {
    throw new Error(`Error fetching or parsing XML: ${error.message}`);
  }
};


app.get('/feed', async (req, res) => {
  const feedUrl = process.env.FEED_URI; 
  try {
    const jsonFeed = await fetchAndConvertFeed(feedUrl);
    res.json(jsonFeed);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
