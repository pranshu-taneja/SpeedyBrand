import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ToneSelect from "../components/ToneSelect";
import "./AiEditor.css";

function AiEditor() {
  const [value, setValue] = useState("");

  return (
    <div className="ContainerEditor">
        <ToneSelect></ToneSelect>
        <button className="generate">Generate</button>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ width: "80vw", height: "70vh" }}
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
