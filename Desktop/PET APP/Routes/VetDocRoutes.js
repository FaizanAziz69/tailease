import express from "express"
import { getAllDoctors, docRegistration, deleteDoctor } from "../Controllers/VetDocController.js"

const app =express.Router()

app.post('/Registration',docRegistration)
app.get('/All',getAllDoctors)
app.delete('/delete/:doctorId',deleteDoctor)

export default app