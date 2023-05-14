const client = require("../../config/db");

client.connect();

//Creating Patient
const createPatient = async (req, res) => {
  try {
    const { pname, phone } = req.body;
    const result = await client.query(
      "INSERT INTO PATIENT(pname, token, phone) VALUES( $1, nextval('incr'), $2) RETURNING *",
      [pname, phone]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send(`Can't fetch Patient!`);
  }
};

//Getting all Records
const getPatients = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM PATIENT ORDER BY pid ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send(`Data not found!`);
  }
};

//Getting a patient by token
const getPatientsById = async (req, res) => {
  try {
    const tokenid = parseInt(req.params.id);
    const result = await client.query(
      "SELECT * FROM PATIENT WHERE token = $1",
      [tokenid]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send(`There's no patient!`);
  }
};

//Updating the patient information
const UpdatePatient = async (req, res) => {
  try {
    const tokenId = parseInt(req.params.id);
    const { pid, pname, phone } = req.body;

    const result = await client.query(
      "UPDATE PATIENT SET pid = $1, pname = $2, phone = $3 WHERE token = $4",
      [pid, pname, phone, tokenId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).send(`There's no patient!`);
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientsById,
  UpdatePatient,
};
