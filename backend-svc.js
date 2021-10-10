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