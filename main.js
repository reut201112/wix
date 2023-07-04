const express = require('express');
const app = express();
const data = require('./data.json');

  app.get('/tickets', (req, res) => {
    const searchText = req.query.search;
    const fromTime = req.query.from; 
    const toTime = req.query.to; 
  
    let filteredItems = data;
  
    if (searchText) {
        filteredItems = filteredItems.filter(item =>
          Object.values(item)
            .filter(value => typeof value === 'string') // Filter only string values
            .some(value => value.toLowerCase().includes(searchText.toLowerCase()))
        );
      }
  
    if (fromTime) {
      filteredItems = filteredItems.filter(item => item.creationTime >= fromTime);
    }
  
    if (toTime) {
      filteredItems = filteredItems.filter(item => item.creationTime <= toTime);
    }
  
    res.json(filteredItems);
    
  });
  

  const port = 3000; 
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
