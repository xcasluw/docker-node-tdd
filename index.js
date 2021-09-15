const app = require('./src/app')

app.express.listen(process.env.PORT || 3000, () => {
  console.log('APP is running on port 3000 | http://localhost:3000')
})