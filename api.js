//pievienot pakotnes
const express = require("express");
var cors = require("cors");
const rssParser = require("rss-parser");
//aktivizēt Express
const app = express();
//lietot CORS
app.use(cors());
const port = 3000;
app.listen(port, function (req, res) {
  console.log(`Server is running at port ${port}`);
});

// add endpoint for getting data
app.get("/get-data", async function (req, res) {
  console.log("get-data endpoint was hit");

  //get the mark value from the query string
  const markValue = req.query.mark;
  //TODO: store filter parameters
  const model = req.query.model; // get model from query string
  const year = req.query.year; // get year from query string
  const maxPrice = req.query.maxPrice; // get maxPrice from query string
  const minPrice = req.query.minPrice; // get minPrice from query string
  console.log(markValue, model, year, maxPrice, minPrice);

  try {
    //function to fetch data from the server
    const feed = await fetchData(markValue);
    console.log(feed.length);

    //TODO: filter data
    const filteredData = filterData(feed, model, year, maxPrice, minPrice);

    res.send(feed);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

//function to fetch data from the server
async function fetchData(markValue) {
  try {
    const parser = new rssParser();
    const feed = [];

    for (let i = 1; i <= 5; i++) {
      const URL = `https://www.ss.com/lv/transport/cars/${markValue}/page${i}.html/rss/`;
      const data = await parser.parseURL(URL);
      feed.push(...data.items);
    }

    return feed;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//TODO: filter data
function filterData(feed, model, year, maxPrice, minPrice) {
  // filter data based on model, year, maxPrice, and minPrice
  let filteredData = feed;

  if (model) {
    filteredData = filteredData.filter((item) => item.model === model);
  }

  if (year) {
    filteredData = filteredData.filter((item) => item.year === year);
  }

  if (maxPrice) {
    filteredData = filteredData.filter((item) => item.price <= maxPrice);
  }

  if (minPrice) {
    filteredData = filteredData.filter((item) => item.price >= minPrice);
  }

  return filteredData;
}
