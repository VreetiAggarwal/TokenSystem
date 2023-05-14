const express = require("express");
router = express.Router();
const patient = require("../routes/api/patient");

//'Patient': (POST): localhost:3000/api/products

function SocketRouter(io) {
  router.post("/patient", patient.createPatient);
  router.get("/patient", patient.getPatients);
  router.get("/patient/:id", patient.getPatientsById);
  router.put("/patient/:id", patient.UpdatePatient);

  return router;
}

module.exports = SocketRouter;
