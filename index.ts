import express, { Request, Response } from 'express'
const app = express()
const port = 3000


app.get('/live', (req: Request, res: Response) => {         // Ruta de ejemplo con fecha actual
  res.send(`${new Date().toISOString()}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})