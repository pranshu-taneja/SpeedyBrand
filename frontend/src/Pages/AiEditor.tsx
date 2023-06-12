import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AiEditor() {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}

      modules={{
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { header: '3' }, { header: '4' }],
            ['blockquote', 'code-block'],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }], // Add text alignment options
            ['clean'],
          ],
        },
      }}
    />
  );
}

export default AiEditor;
