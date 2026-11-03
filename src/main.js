import './config.js'
import cors from 'cors'
import express from 'express'
import { PORT } from './config.js'
import { authenticationController, messageController, userController } from './modules/index.js'
import { globalErrorHandling } from './middleware/index.js'
import { bootstrapDB } from './DB/model/connection.db.js'
import { del, exists, get, keys, set, update } from './common/services/cache.service.js'
import { languageMiddleware } from './middleware/language.middleware.js'

const app = express()
const port = PORT
await bootstrapDB(app, port)
await set({ key: "userAge", value: "27" })
await set({ key: "userGender", value: { type: "male" } })
console.log(
    await del({ key: await keys({ prefix: "user" }) })
);

app.use(cors(),express.json())
app.use("/assets",express.static("./assets"))
app.use(languageMiddleware)

app.all("/", (req, res) => res.status(200).send({ message: "Welcome to BE API 🔥" }))

app.use("/auth", authenticationController)
app.use("/message", messageController)
app.use("/massage", messageController)
app.use("/user", userController)

app.all("/{*dummy}", (req, res) => res.status(404).send({ message: "Invalid application routing" }))

app.use(globalErrorHandling)




 