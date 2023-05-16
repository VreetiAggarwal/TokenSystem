import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import classes from "./Patient.module.css";

function Patients() {
  const [backendData, setBackendData] = useState([]);
  const [pname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameR, setNameR] = useState("");
  const [phoneR, setPhoneR] = useState("");
  const [tokenid, setTokenid] = useState(100);
  const [color, setColor] = useState("white");

  useEffect(() => {
    getPatient();

    socket.on("recieve_name", (pname) => {
      setNameR(pname.pname);
    });

    socket.on("recieve_phone", (phone) => {
      setPhoneR(phone.phone);
    });
  }, []);

  function getPatient() {
    fetch("/api/patient/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setBackendData(data);
        console.log(data);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/patient/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pname: pname,
          phone: phone,
        }),
      });

      const data = await res.json();
      if (data.status === 200) {
        setBackendData(data);
      }
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const tokenGenerator = () => {
    setTokenid(tokenid + 1);
    socket.emit("send_token", { tokenid });
  };

  const updateRecord = () => {
    socket.emit("enter_name", { pname });
    socket.emit("enter_phone", { phone });
  };

  return (
    <div>
      <div>
        <p className={classes.para}>Token Dashboard for doctor's clinic</p>
      </div>

      <table classesName={classes.map1}>
        <th className={classes.th}>
          <td className={classes.td1}>Name</td>
          <td className={classes.td2}>Phone</td>
          <td className={classes.td3}>Token</td>
        </th>
      </table>

      {backendData.map((data) => (
        <div className={classes.tr}>
          <div className={classes.flex}>
            <p className={classes.td6}>{data.pid}</p>
            <p className={classes.td}>{data.pname}</p>
            <p className={classes.td4}>{data.phone}</p>
            <p className={classes.td5}>T-{data.token}</p>
          </div>
        </div>
      ))}

      <div className={classes.tr}>
        <div className={classes.flex}>
          <p className={classes.td}></p>
          <p className={classes.td}>{nameR}</p>
          <p className={classes.td}>{phoneR}</p>
          <p className={classes.td}></p>
        </div>
      </div>

      <button className={classes.btn1} onClick={tokenGenerator}>
        Next Token
      </button>

      <form method="POST" onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.p}>
          <p>Enter Patient Record</p>
        </div>
        <div className={classes.l}>
          <label className={classes.label}>Name of patient:</label>
          <input
            type="text"
            value={pname}
            onChange={(e) => setName(e.target.value)}
            className={classes.input}
          />
        </div>
        <div className={classes.l}>
          <label className={classes.label}>Phone Number:</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={classes.input}
          />
        </div>

        <button type="submit" className={classes.btn2}>
          Register Patient
        </button>
      </form>
    </div>
  );
}

export default Patients;
