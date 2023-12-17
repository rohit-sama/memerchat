"use client";
import axios from "axios";
import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState();
  const [result, setResult] = useState();
  const handlechange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!message) {
      alert("kindly prompt something");
    } else {
      await axios.post("/api/getairesponse", {
        context: message
      }).then(response =>  {setResult(response.data); console.log(response)});
    }
  };

  return (
    <div>
      <input
        className="bg-red-100"
        type="text"
        name="hello"
        id=""
        value={message}
        onChange={handlechange}
      />
      <button className="bg-red-100 text-black" onClick={handleSubmit}>
        submit
      </button>
      <p className="text-black">{result}</p>
    </div>
  );
};

export default Chat;
