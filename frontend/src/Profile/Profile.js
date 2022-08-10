import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Common/util";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, getUser] = useState({});
  useEffect(() => {
    const config = {
      method: "get",
      url: `${host}getUser`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        getUser(response.data.user);
        console.log(user);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  return isLoading ? (
    "loading"
  ) : (
    <>
      <div>
        <h1>{user.name}</h1>
        <img src={user.picture} alt="profile" />
        <p>{user.email}</p>
        <> Leagues</>
      </div>
    </>
  );
}
