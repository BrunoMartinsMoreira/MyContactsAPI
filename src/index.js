const express = require('express');

const app = express();

app.get('/', (request, response) => {
   response.send("Relou uordi!")
})

app.listen(3000, () => console.log('Subiu!'));
