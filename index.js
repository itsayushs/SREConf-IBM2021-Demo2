const { NodeTracerProvider } = require('@opentelemetry/node')
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const provider = new NodeTracerProvider()
const consoleExporter = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExporter)
provider.addSpanProcessor(spanProcessor)

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411',
  serviceName: 'frontend-service'
})

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)
provider.register()


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

app.get('/', async (req, res) => {
    const movies = await getAnimeData()
    res.send(JSON.stringify({ dashboard: movies }))
  })

app.listen(8080, () => { console.log(`Frontend is running on http://localhost:8080`)})