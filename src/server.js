const app = require('./app')
const { PORT } = require('./const')

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
