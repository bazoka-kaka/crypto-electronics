import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z\s]{3,50}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Update = () => {
  const userRef = useRef();
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/users";
  const { id } = useParams();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fullname, setFullname] = useState("");
  const [validFullname, setValidFullname] = useState(false);
  const [fullnameFocus, setFullnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [roles, setRoles] = useState({});

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [oldPwd, setOldPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidFullname(NAME_REGEX.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, fullname, email, oldPwd]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`, {
          signal: controller.signal,
        });
        console.log(response?.data);
        if (isMounted) {
          setUser(response?.data?.username);
          setFullname(response?.data?.fullname);
          setEmail(response?.data?.email);
          setRoles(response?.data?.roles);
        }
      } catch (err) {
        if (err.message !== "canceled") {
          console.error(err);
        }
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    console.log("submitted");
    const v1 = USER_REGEX.test(user);
    const v2 = NAME_REGEX.test(fullname);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3 || !oldPwd) {
      setErrMsg("Invalid entries.");
      return;
    }
    try {
      const response = await axiosPrivate.put(
        "/users",
        JSON.stringify({ id, user, pwd, fullname, email, roles, oldPwd }),
        {
          signal: controller.signal,
        }
      );
      console.log(JSON.stringify(response));
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      setFullname("");
      setOldPwd("");
      setRoles({});
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err?.response?.status === 400) {
        setErrMsg("ID parameter is required.");
      } else if (err?.response?.status === 401) {
        setErrMsg("User is unauthorized.");
      } else if (err?.response?.status === 409) {
        setErrMsg("Username is already taken.");
      }

      errRef.current.focus();
    }

    return () => {
      controller.abort();
    };
  };

  return (
    <div>
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
      <h1 className="text-2xl font-semibold">Update User {id}</h1>
      <div className="p-4 mt-4 bg-white rounded-md">
        <form>
          <label htmlFor="first" className="block font-semibold">
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
            id="first"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
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
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd
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
          <label
            htmlFor="password_confirmation"
            className="block mt-4 font-semibold"
          >
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
            autoComplete="off"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch
                ? "mt-2 bg-black text-white p-2 rounded-md"
                : "hidden"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
            password input field.
          </p>
          <label htmlFor="old_pwd" className="block mt-4 font-semibold">
            Old Password
          </label>
          <input
            type="password"
            id="old_pwd"
            autoComplete="off"
            onChange={(e) => setOldPwd(e.target.value)}
            value={oldPwd}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="w-full px-4 py-2 mt-2 border-2 rounded-md border-slate-400"
          />
          <label htmlFor="roles" className="block mt-4 font-semibold">
            Roles
          </label>
          <div>
            <input
              type="checkbox"
              id="role_user"
              name="roles"
              onChange={(e) =>
                setRoles({ ...roles, User: e.target.checked ? 2001 : null })
              }
              checked={roles.User === 2001}
            />{" "}
            <label htmlFor="role_user">User</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="role_editor"
              name="roles"
              onChange={(e) =>
                setRoles({ ...roles, Editor: e.target.checked ? 1984 : null })
              }
              checked={roles.Editor === 1984}
            />{" "}
            <label htmlFor="role_editor">Editor</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="role_admin"
              name="roles"
              onChange={(e) =>
                setRoles({ ...roles, Admin: e.target.checked ? 5150 : null })
              }
              checked={roles.Admin === 5150}
            />{" "}
            <label htmlFor="role_admin">Admin</label>
          </div>
        </form>

        <div className="flex gap-2 mt-6">
          <Link
            to="/users"
            className="px-4 py-2 font-semibold text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-400"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-semibold text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-400"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
