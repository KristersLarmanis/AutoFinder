// Import necessary modules
const express = require("express");
const cors = require("cors");
const rssParser = require("rss-parser");

// Initialize Express app
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Start server
app.listen(port, function () {
  console.log(`Server is running at port ${port}`);
});

// Endpoint for fetching and filtering data
app.get("/get-data", async function (req, res) {
  console.log("GET request to /get-data");

  // Extract query parameters
  const markValue = req.query.mark;
  const model = req.query.model;
  const year = req.query.year;
  const maxPrice = req.query.maxPrice;
  const minPrice = req.query.minPrice;

  try {
    // Fetch data from RSS feed
    const feed = await fetchData(markValue);

    // Filter data based on parameters
    const filteredData = filterData(feed, model, year, maxPrice, minPrice);

    // Send filtered data as response
    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching or filtering data:", error);
    res.status(500).send("Error fetching or filtering data");
  }
});

// Function to fetch data from RSS feed
async function fetchData(markValue) {
  try {
    const parser = new rssParser();
    const feed = [];

    // Fetch data from RSS feed pages
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

// Function to filter data based on parameters
function filterData(feed, model, year, maxPrice, minPrice) {
  let filteredData = feed;

  // Filter data based on model
  if (model) {
    filteredData = filteredData.filter((item) => {
      return item.title.toLowerCase().includes(model.toLowerCase());
    });
  }

  // Filter data based on year
  if (year) {
    filteredData = filteredData.filter((item) => {
      return item.description.includes(`<b>${year}</b>`);
    });
  }

  // Filter data based on max price
  if (maxPrice) {
    filteredData = filteredData.filter((item) => {
      const price = parseFloat(item.description.match(/Cena: <b>(.*?)<\/b>/)[1].replace(/[^0-9.-]+/g,""));
      return price <= parseFloat(maxPrice);
    });
  }

  // Filter data based on min price
  if (minPrice) {
    filteredData = filteredData.filter((item) => {
      const price = parseFloat(item.description.match(/Cena: <b>(.*?)<\/b>/)[1].replace(/[^0-9.-]+/g,""));
      return price >= parseFloat(minPrice);
    });
  }

  return filteredData;
}
