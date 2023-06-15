import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./FormModal.css"
// import TextField from "@mui/material/TextField";
// import { FormControl, FormLabel } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [topicName, setTopicName] = useState("");
  const [tags, settags] = useState("");

  function handleCreateTopic() {
    let tagsArray = tags.split(",").map((tag) => tag.trim());

    const data = {
      topic: topicName,
      tags: tagsArray,
    };

    console.log(data);

    const addTopicUrl = `${import.meta.env.VITE_URL}`+ `/addtopic`;
    fetch(addTopicUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        // Handle the response or result here
        // console.log(result);
        window.alert("Topic Created Successfully!!🙌")
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error(error);
      });
  }

  return (
    <div>
      <button className="AddTopic" onClick={handleOpen}>
        Add Topic
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="modalForm" sx={style}>
          <form>
            <label htmlFor="topic">Topic Name</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={topicName}
              placeholder="Add Topic Name"
              onChange={(event) => {
                setTopicName(event.target.value);
              }}
              />
            <br />
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              placeholder="Add Comma Seperated Values"
              name="tags"
              value={tags}
              onChange={(event) => {
                settags(event.target.value);
              }}
            />
            <br />
            <button
              onClick={() => {
                handleCreateTopic();
              }}
              type="button"
            >
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
