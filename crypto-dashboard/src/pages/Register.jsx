import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z\s]{3,50}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fullname, setFullname] = useState("");
  const [validFullname, setValidFullname] = useState(false);
  const [fullnameFocus, setFullnameFocus] = useState(false);

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
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidFullname(NAME_REGEX.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, fullname, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = NAME_REGEX.test(fullname);
    const v5 = pwd === matchPwd;
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid entries.");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email, fullname }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      setFullname("");
      navigate("/login", { from: location });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err?.response?.status === 409) {
        setErrMsg("Username is already taken.");
      } else {
        setErrMsg("Registration failed.");
      }

      errRef.current.focus();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[500px] w-full">
        <p
          ref={errRef}
          className={
            errMsg
              ? "font-semibold text-white bg-red-500 rounded-md px-4 py-2 mb-4"
              : "hidden"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-3xl font-semibold text-center">
          Register New User
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="username" className="block font-semibold">
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
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
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

          <label htmlFor="fullname" className="block mt-4 font-semibold">
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
            autoComplete="off"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            required
            aria-invalid={validFullname ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setFullnameFocus(true)}
            onBlur={() => setFullnameFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <p
            id="uidnote"
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

          <label htmlFor="email" className="block mt-4 font-semibold">
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
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
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

          <label htmlFor="password" className="block mt-4 font-semibold">
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
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
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
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd" className="block mt-4 font-semibold">
            Confirm Password{" "}
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
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
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

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className="px-4 py-2 mt-4 font-semibold text-white transition duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <span className="font-semibold text-blue-500 transition duration-200 hover:text-red-500">
            {/*put router link here*/}
            <Link to="/login">Sign In</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
