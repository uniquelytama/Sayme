/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import api from "../services/api";
import "./Homepage.css";

function Profil() {
  const [diaries, setDiaries] = useState();
  const [modify, setModify] = useState(false);
  const [drop, setDrop] = useState(false);

  const [numberClicked, setNumberClicked] = useState();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  const [input, setInput] = useState({});

  function loadMyPosts() {
    api.get("/diary").then((response) => {
      setDiaries(response.data);
    });
  }
  function loadUser() {
    api.get("/user/1").then((response) => {
      if (response.data.id === 1) {
        setUser(response.data);
        setUsername(response.data.username);
      }
    });
  }
  const modifyOn = () => {
    setModify(!modify);
  };
  const handleChange = (e) => {
    if (input) {
      setInput({ ...input, username: e.target.value });
    }
  };
  const handleSubmission = (e) => {
    if (e.key === "Enter") {
      api
        .put(`/user/${user.id}`, input)
        .then((res) => {
          if (res.status === 200) {
            res.send("success");
          }
        })
        .catch((err) => err.response);

      setModify(false);
    }
  };
  function likeButton() {
    return <img src="src/assets/img/heart.png" alt="" className="logo" />;
  }

  function handleDrop(diaID) {
    setNumberClicked(diaID);

    setDrop(!drop);
  }
  function deleteDiary(diaID) {
    api.delete(`/diary/${diaID}`).then((response) => {
      response.send("success");
      loadMyPosts();
    });
  }
  function dropDownDots(diaID) {
    return (
      <div className={numberClicked === diaID ? "dropdown" : "dropdown-menu"}>
        <span onClick={() => deleteDiary(diaID)} role="contentinfo">
          Delete
        </span>
        <span>Edit</span>
      </div>
    );
  }
  useEffect(() => {
    loadMyPosts();
  }, []);
  useEffect(() => {
    loadUser();
  }, [user]);
  function getMyPosts() {
    return (
      diaries &&
      diaries.map((diary) => {
        if (diary.user_id === 1) {
          return (
            <div className="diary">
              <div className="topBubble">
                <h1 id="subject">{diary.subject}</h1>
                <h3 id="username">{`@${diary.username}`}</h3>
              </div>
              <div className="bottomBubble">
                {" "}
                <p id="confession">{diary.content}</p>
                <div className="reactionTab">
                  <img src="src/assets/img/chat.png" alt="" className="logo" />
                  {likeButton(diary.id)}
                  <img src="src/assets/img/share.png" alt="" className="logo" />
                  <label htmlFor="openDropdown">
                    {" "}
                    <img
                      src="src/assets/img/dots.png"
                      alt=""
                      className="logo"
                      onClick={() => handleDrop(diary.id)}
                    />
                  </label>

                  <input
                    type="checkbox"
                    id="openDropdown"
                    hidden
                    checked={drop}
                  />
                  {dropDownDots(diary.id)}
                  {/*  {handleDrop && <div className="dropTop">{dropDownDots()}</div>} */}
                </div>
              </div>
            </div>
          );
        }
      })
    );
  }
  function changeName() {
    return (
      diaries &&
      diaries.map((diary) => {
        if (diary.user_id === 1) {
          if (!modify) {
            return <h3 id="userName">{`@${username}`}</h3>;
          }
          if (modify) {
            return (
              <input
                defaultValue={username}
                name="firstname"
                id="userNameInput"
                type="text"
                onChange={handleChange}
                onKeyDown={handleSubmission}
              />
            );
          }
        }
      })
    );
  }
  return (
    <div className="fullContainer">
      <NavBar />
      <div className="profilContainer">
        <div className="picture">
          <img src="src/assets/img/profil.png" alt="" id="profileImage" />
        </div>
        <div className="userName">{changeName()}</div>
        <button id="buttonProfil" onClick={modifyOn} type="button">
          Modify Username
        </button>
      </div>
      <div className="formHome">
        <div className="content">{getMyPosts()} </div>
      </div>
    </div>
  );
}
export default Profil;
