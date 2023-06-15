// import React from "react";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type Tcarddata = {
  topic: string;
  tags: string[];
  _id: string;
};

function Card(props: Tcarddata) {
  const navigate = useNavigate();

  function handleWrite() {
    navigate("/AiEditor");
  }

  function handleDelete() {
    const data = {
      id: props._id,
    };

    const deleteURL = `${import.meta.env.VITE_URL}` + "/deletetopic";

    fetch(deleteURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      window.alert("Topic Deleted Successfully!!✅");
      window.location.reload();
    });
  }

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  return (
    <div className="card-Wrapper">
      <p>{props.topic}</p>
      <div className="secondColumn-Wrapper">
        <div className="tags-Wrapper">
          {props.tags.map((value) => {
            return (
              <div
                style={{ backgroundColor: generateRandomColor() }}
                key={uuidv4()}
              >
                {value}
              </div>
            );
          })}
        </div>

        <div className="createDeleteButton" style={{display:"flex", gap:"1rem"}}>
          <button onClick={handleWrite}>Write{">"}</button>
          <button onClick={handleDelete}>Delete{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
