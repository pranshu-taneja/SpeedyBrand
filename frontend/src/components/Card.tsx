// import React from "react";
import "./Card.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type Tcarddata = {
  topicName: string;
  tags: string[];
};


function Card(props: Tcarddata) {
  
  const navigate = useNavigate();

  function handleWrite(){
    navigate("/AiEditor");
  }

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  return (
    <div className="card-Wrapper">
      <p>{props.topicName}</p>
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
        <button onClick={handleWrite}>Write{">"}</button>
      </div>
    </div>
  );
}

export default Card;
