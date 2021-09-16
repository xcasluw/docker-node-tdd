const app = require('./app')

app.express.listen(process.env.APP_PORT || 3000, () => {
  console.log('APP is running [ON] port 3000 - http://localhost:3000')
})