import Navbar from "./components/Navbar";
import './App.css'
import Card from "./components/Card";

type Tcarddata = {
  topicName: string;
  tags: string[];
};

const post:Tcarddata = {
  topicName: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, incidunt.",
  tags: ["Tag1", "Tag2", "Tag3","Tag4", "Tag5"]
  
}

function App() {
  return (
    <>
      <h1>Categories</h1>
      <Navbar></Navbar>
      <div className="RecommendedDivider">
        <p>Recommended Topics</p>
      </div>
      <Card {...post}></Card>
      <Card {...post}></Card>
      <Card {...post}></Card>
      <Card {...post}></Card>
    </>
  );
}

export default App;
