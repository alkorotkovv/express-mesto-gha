const axios = require('axios');
axios.post('http://localhost:3000/users', {hello:'world'}).then(console.log).catch(console.error)