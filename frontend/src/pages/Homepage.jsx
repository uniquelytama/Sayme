/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useState, useRef } from "react";
import "./Homepage.css";
import api from "../services/api";

function Homepage() {
  const [writing, setWriting] = useState(false);

  const [diary, setDiary] = useState({});
  const [diaries, setDiaries] = useState();
  const [header, setHeader] = useState();
  const [content, setContent] = useState("");
  const [showDiaries, setShowDiaries] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [drop, setDrop] = useState(false);
  const value = useRef("");
  function handleWriting() {
    setHideForm(false);
  }

  const handleChange = (e) => {
    if (e.target.name === "header") {
      setHeader(e.target.value);
      setDiary({
        user_id: "1",
        subject: e.target.value,
        content: "",
      });
    }
    if (e.target.name === "content") {
      setContent(e.target.value);
      setDiary({
        user_id: "1",
        subject: `${header}`,
        content: e.target.value,
      });
    }
  };
  function loadDiaries() {
    api.get("/diary").then((response) => {
      setDiaries(response.data);
    });
  }
  function handleSubmission(e) {
    if (e.key === "Enter") {
      setWriting(false);
      setShowDiaries(true);
      if (e.target.name === "content") {
        api
          .post("/diary", diary)
          .then((res) => {
            if (res.status === 201) {
              setHideForm(true);
              setHeader("");
            }
          })
          .catch((err) => err.response);
      }
    }
  }
  function handleDrop() {
    setDrop(true);
  }

  function dropDownDots() {
    return (
      <div className="dropDown">
        <div className="editBox">
          <h3>Edit</h3>
        </div>
        <div className="deleteBox">
          <h3>Delete</h3>
        </div>
      </div>
    );
  }

  function getAllDiaries() {
    if (!hideForm) {
      if (showDiaries) {
        return (
          <textarea
            id="text"
            name="content"
            onChange={handleChange}
            onKeyDown={handleSubmission}
            placeholder="Tell me more"
          />
        );
      }
    } else {
      return diaries.map((diar) => {
        return (
          <div className="diary">
            <div className="topBubble">
              <h1 id="subject">{diar.subject}</h1>
              <h3 id="username">{`@${diar.username}`}</h3>
            </div>
            <div className="bottomBubble">
              {" "}
              <p id="confession">{diar.content}</p>
              <div className="reactionTab">
                <img src="src/assets/img/chat.png" alt="" className="logo" />
                <img src="src/assets/img/happy.png" alt="" className="logo" />
                <img src="src/assets/img/share.png" alt="" className="logo" />
                <img
                  src="src/assets/img/dots.png"
                  alt=""
                  className="logo"
                  onClick={handleDrop}
                />
                {/*  {handleDrop && <div className="dropTop">{dropDownDots()}</div>} */}
              </div>
            </div>
          </div>
        );
      });
    }
  }
  useEffect(() => {
    loadDiaries();
  }, [diary]);
  return (
    <div className="fullContainer" role="presentation">
      <div className={!hideForm ? "forms" : "formHome"}>
        {" "}
        <div className="content">
          <input
            type="text"
            id="prompt"
            autoFocus
            value={!hideForm ? header : ""}
            name="header"
            placeholder="What's your confession?"
            onChange={handleChange}
            onKeyDown={handleSubmission}
            onClick={handleWriting}
          />

          {getAllDiaries()}
        </div>
      </div>
    </div>
  );
}
export default Homepage;
