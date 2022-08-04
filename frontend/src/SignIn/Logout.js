import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "964257535196-h9chtfll634oipf29772v71av85g3fcj.apps.googleusercontent.com";

export default function Logout() {
  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logout made successfully");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}
