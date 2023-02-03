/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useState } from "react";
import "./Homepage.css";
import api from "../services/api";
import NavBar from "../components/NavBar";

function Homepage() {
  const [diary, setDiary] = useState({});
  const [diaries, setDiaries] = useState();
  const [header, setHeader] = useState();

  const [showDiaries, setShowDiaries] = useState(false);
  const [numberClicked, setNumberClicked] = useState();

  const [hideForm, setHideForm] = useState(false);
  const [liked, setLiked] = useState(false);

  const [drop, setDrop] = useState(false);

  function handleWriting() {
    setHideForm(false);
  }
  function handleLike() {
    setLiked(!liked);
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
  function deleteDiary(diaID) {
    api.delete(`/diary/${diaID}`).then((response) => {
      response.send("success");
      loadDiaries();
    });
  }

  function handleSubmission(e) {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        setHideForm(true);
      }
      /* setWriting(false); */
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
  function updateLike() {
    handleLike();
  }
  function handleDrop(diaID) {
    setNumberClicked(diaID);

    setDrop(!drop);
  }
  function dropDownDots(diaID) {
    return (
      <div className={numberClicked === diaID ? "dropdown" : "dropdown-menu"}>
        <span onClick={() => deleteDiary(diaID)} role="presentation">
          Delete
        </span>
        <span>Edit</span>
      </div>
    );
  }
  function likeButton(diaID) {
    return (
      <img
        src={
          !liked ? "src/assets/img/heart.png" : "src/assets/img/heart-red.png"
        }
        alt=""
        className="logo"
        onClick={() => updateLike(diaID)}
      />
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
                {likeButton(diar.id)}
                <img src="src/assets/img/share.png" alt="" className="logo" />
                <label htmlFor="openDropdown">
                  {" "}
                  <img
                    src="src/assets/img/dots.png"
                    alt=""
                    className="logo"
                    onClick={() => handleDrop(diar.id)}
                  />
                </label>

                <input
                  type="checkbox"
                  id="openDropdown"
                  hidden
                  checked={drop}
                />
                {dropDownDots(diar.id)}
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
      {hideForm && <NavBar />}
      <div className={!hideForm ? "forms" : "formHome"}>
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
