import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z\s]{4,50}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const nameRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [validFullname, setValidFullname] = useState(false);
  const [fullnameFocus, setFullnameFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFullname(NAME_REGEX.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(validPwd && pwd === matchPwd);
  }, [pwd, matchPwd, validPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [fullname, user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = NAME_REGEX.test(fullname);
    const v3 = PWD_REGEX.test(pwd);
    const v4 = EMAIL_REGEX.test(email);
    const v5 = matchPwd === pwd;
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          user,
          pwd,
          fullname,
          email,
        }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(response));
      setFullname("");
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
      navigate("/login", { from: location });
    } catch (err) {
      if (err?.response?.status === 400) {
        setErrMsg("Invalid entry");
      } else if (err?.response?.status === 409) {
        setErrMsg("Username already taken");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };

  return (
    <div className="py-12 max-w-[800px] items-center flex mx-auto min-h-[calc(100vh-65.6px)]">
      <div className="w-full p-8">
        {errMsg && (
          <p className="w-full bg-red-500 font-semibold text-white p-2 rounded-md mb-4">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="inline-block w-4 h-4 text-white rounded-full"
            />{" "}
            {errMsg}
          </p>
        )}
        <h1 className="text-3xl text-center font-semibold">
          Register New User
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="font-semibold">
              Fullname{" "}
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validFullname
                    ? "inline-block bg-green-400 w-4 h-4 text-white rounded-full"
                    : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validFullname || !fullname
                    ? "hidden"
                    : "inline-block bg-red-400 w-4 h-4 text-white rounded-full"
                }
              />
            </label>
            <input
              type="text"
              id="fullname"
              ref={nameRef}
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              onFocus={() => setFullnameFocus(true)}
              onBlur={() => setFullnameFocus(false)}
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
            <p
              className={
                fullnameFocus && fullname && !validFullname
                  ? "mt-2 bg-black text-white p-2 rounded-md"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
              <br />
              Only letters and spaces allowed.
            </p>
          </div>
          <div className="mt-6">
            <label htmlFor="username" className="font-semibold">
              Username{" "}
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validName
                    ? "inline-block bg-green-400 w-4 h-4 text-white rounded-full"
                    : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validName || !user
                    ? "hidden"
                    : "inline-block bg-red-400 w-4 h-4 text-white rounded-full"
                }
              />
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? "mt-2 bg-black text-white p-2 rounded-md"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div className="mt-6">
            <label htmlFor="email" className="font-semibold">
              Email{" "}
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validEmail
                    ? "inline-block bg-green-400 w-4 h-4 text-white rounded-full"
                    : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validEmail || !email
                    ? "hidden"
                    : "inline-block bg-red-400 w-4 h-4 text-white rounded-full"
                }
              />
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
            <p
              id="pwdnote"
              className={
                emailFocus && email && !validEmail
                  ? "mt-2 bg-black text-white p-2 rounded-md"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Email must be valid
            </p>
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="font-semibold">
              Password{" "}
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validPwd
                    ? "inline-block bg-green-400 w-4 h-4 text-white rounded-full"
                    : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPwd || !pwd
                    ? "hidden"
                    : "inline-block bg-red-400 w-4 h-4 text-white rounded-full"
                }
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && pwd && !validPwd
                  ? "mt-2 bg-black text-white p-2 rounded-md"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="mt-6">
            <label htmlFor="password_confirmation" className="font-semibold">
              Password Confirmation{" "}
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validMatch && matchPwd
                    ? "inline-block bg-green-400 w-4 h-4 text-white rounded-full"
                    : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatch || !matchPwd
                    ? "hidden"
                    : "inline-block bg-red-400 w-4 h-4 text-white rounded-full"
                }
              />
            </label>
            <input
              type="password"
              id="password_confirmation"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="w-full border-[2px] border-black rounded-md p-2 mt-2"
            />
            <p
              id="confirmnote"
              className={
                matchFocus && matchPwd && !validMatch
                  ? "mt-2 bg-black text-white p-2 rounded-md"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
              password input field.
            </p>
          </div>
          <p className="mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-red-600 transition duration-200"
            >
              Login
            </Link>
          </p>
          <button className="mt-4 bg-slate-800 hover:bg-white border-[1px] border-slate-800 hover:text-black rounded-md transition duration-400 text-white font-bold px-8 py-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
