const { NodeTracerProvider } = require('@opentelemetry/node')
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const provider = new NodeTracerProvider()
const consoleExporter = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExporter)
provider.addSpanProcessor(spanProcessor)
provider.register()

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411',
  serviceName: 'backend-service'
})

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)

const express = require('express');
const app = express();

// Endpoints
app.get('/anime', async function (req, res) {
  res.type('json');
  res.send((
    {'data': [
      { name: 'Naruto', protagonist: 'Naruto Uzumaki', antagonist: 'White Zetsu'}, 
      { name: 'Jujtsu Kaisen', protagonist: 'Yuji Itadori', antagonist: 'Ryomen Sukuna'}, 
      { name: 'Kimetsu no Yaiba', protagonist: 'Tanjiro Kamado', antagonist: 'Muzan Kibutsuji'} ]
    }
  ))
});

app.listen( 3000, () => { console.log(`Backend service is running at http://localhost:3000`)});