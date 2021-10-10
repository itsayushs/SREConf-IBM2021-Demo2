const axios = require('axios');
const express = require('express')
const app = express()

// This function will call the Backend Service and then get the list of Anime.
async function getAnimeData() {
    try {
      const response = await axios.get("http://localhost:3000/anime")
      return(response['data']);
    } catch (error) {
      return(error);
    }
}

app.get('/dashboard', async (req, res) => {
    const movies = await getAnimeData()
    res.send(JSON.stringify({ dashboard: movies }))
  })

app.listen(8080, () => { console.log(`Listening at http://localhost:8080`)})