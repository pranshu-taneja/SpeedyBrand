import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import "./AiEditor.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function AiEditor() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const DefaultPrompt = searchParams.get("data");

  const [value, setValue] = useState("");
  const [Tone, setTone] = useState("normal");
  const [prompt, setPrompt] = useState(DefaultPrompt || "");


  const handleChange = async (event: SelectChangeEvent) => {
    setTone(event.target.value as string);
  };

  function handleGenerate() {
    setValue("Loading....");
    const generateContent = `${import.meta.env.VITE_URL}` + "/generate";

    const data = {
      prompt: prompt,
      tone: Tone,
    };

    fetch(generateContent, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setValue(result.data);
      })
      .catch((error) => {
        console.error(error);
        setValue("");
        window.alert("Some Error Occurred!!🪲");
      });
  }

  return (
    <div className="ContainerEditor">
      {/*-------------------- Tone Selector --------------------*/}
      <Box sx={{ maxWidth: 300, minwidth: 100 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tone</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Tone}
            label="Tone"
            onChange={handleChange}
          >
            <MenuItem value="sad">Sad</MenuItem>
            <MenuItem value="angry">Angry</MenuItem>
            <MenuItem value="funny">Funny</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/*-------------------- Tone Selector -------------------- */}

      <div>
        <h3>Your Prompt</h3>
        <input
          className="PromptValue"
          placeholder="Add your topic here.."
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        ></input>
      </div>

      <button onClick={handleGenerate} className="generate">
        Generate
      </button>


      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ width: "95vw", height: "70vh" }}
        modules={{
          toolbar: {
            container: [
              [
                { header: "1" },
                { header: "2" },
                { header: "3" },
                { header: "4" },
              ],
              ["blockquote", "code-block"],
              ["bold", "italic", "underline", "strike"],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }], // Add text alignment options
              ["clean"],
            ],
          },
        }}
      />
    </div>
  );
}

export default AiEditor;
