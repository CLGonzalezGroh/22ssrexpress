import express from "express"
import dotenv from "dotenv"
import webpack from "webpack"

dotenv.config()
const { ENV, PORT } = process.env

const app = express()

if (ENV === "development") {
  console.log("Development config")
  const webpackConfig = require("../../webpack.config")
  const webpackDevMiddleware = require("webpack-dev-middleware")
  const webpackHotMiddleware = require("webpack-hot-middleware")
  const compiler = webpack(webpackConfig)
  const serverConfig = {
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath,
  }

  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))
}

app.get("*", (req, res) => {
  res.send({ hello: "express" })
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`server running on port ${PORT}`)
})
