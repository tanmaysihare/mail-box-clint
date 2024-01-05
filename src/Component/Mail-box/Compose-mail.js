import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { composeAction } from "../../Store/Compose-Slice";

const ComposeMail = () => {
  //   const [to, setTo] = useState("");
  //   const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();
  const compose = useSelector((state) => state.compose);

  // Get the raw content of the editor
  const contentState = editorState.getCurrentContent();
  const rawContent = convertToRaw(contentState);

  // Extract text from each block and join them into a single string
  const contentText = rawContent.blocks.map((block) => block.text).join("\n");

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    dispatch(composeAction.setContent(contentText));
  };

  const handleSendClick = () => {
    // You can now send 'to', 'subject', and 'contentText' to your server or perform other actions
    let url = `https://mail-box-clint-6b3d1-default-rtdb.firebaseio.com/mails/${compose.to}.json`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        subject: compose.subject,
        content: compose.content,
      }),
      headers:{'Content-type':'application/json'}
    });
    console.log("compose", compose);
  };

  return (
    <div>
      <label>To</label>
      <input
        type="email"
        value={compose.to}
        onChange={(e) => dispatch(composeAction.setTo(e.target.value))}
      />

      <label>Subject</label>
      <input
        type="text"
        value={compose.subject}
        onChange={(e) => dispatch(composeAction.setSubject(e.target.value))}
      />

      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />

      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default ComposeMail;
