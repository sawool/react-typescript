import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootStateType } from "../modules";
import { authValidAsync } from "../modules/authentication";

function User() {
  console.log("user component");
  const { loading, data, error } = useSelector(
    (state: RootStateType) => state.authentication.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authValidAsync.request());
  }, [dispatch]);

  return data ? <Redirect to="/home" /> : <Redirect to="/home" />;
}

export default User;
