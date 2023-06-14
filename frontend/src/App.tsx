import Navbar from "./components/Navbar";
import "./App.css";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Tcarddata = {
  topic: string;
  tags: string[];
};

function App() {
  const [topicList, setTopicList] = useState<Tcarddata[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/gettopics", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setTopicList(result);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Categories</h1>
      <Navbar></Navbar>
      <div className="RecommendedDivider">
        <p>Recommended Topics</p>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        topicList?.map((data) => <Card key={uuidv4()} {...data} />)
      )}
    </>
  );
}

export default App;
