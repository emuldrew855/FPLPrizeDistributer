import React, { useState, useRef } from "react";
import { useScript } from "./useScript";
import jwt_deocde from "jwt-decode";

export default function LogIn() {
  const googlebuttonref = useRef();
  const [user, setuser] = useState(false);
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_deocde(userCred);
    console.log(payload);
    setuser(payload);
    window.location = `http://localhost:3001/profile/${payload.jti}`;
  };
  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "964257535196-h9chtfll634oipf29772v71av85g3fcj.apps.googleusercontent.com", // here's your Google ID
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "medium",
    });
  });
  return (
    <div>
      {!user && <div ref={googlebuttonref}></div>}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture} alt="profile" />
          <p>{user.email}</p>

          <button
            onClick={() => {
              setuser(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
