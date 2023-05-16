import { socket } from "./socket";
import React, { useEffect, useState } from "react";
import classes from "./Token.module.css";

export default function TokenGenerator() {
  const [tokenRecieved, setTokenRecieved] = useState("");
  useEffect(() => {
    socket.on("recieve_token", (tokenid) => {
      setTokenRecieved(tokenid.tokenid);
    });
  });

  return (
    <div className={classes.box}>
      <div>
        <p className={classes.p}>Current Token</p>
      </div>
      {<h1 className={classes.token}>T {tokenRecieved}</h1>}
    </div>
  );
}
