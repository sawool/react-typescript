import React from "react";
import "./GoogleSignBtn.css";

type GoogleSignBtnProp = {
  onClick(): void;
};

function GoogleSignBtn({ onClick }: GoogleSignBtnProp) {
  return (
    <div>
      <a className="btn-google" href="#!" onClick={onClick}>
        <img
          alt="google"
          src="https://img.icons8.com/color/16/000000/google-logo.png"
        />{" "}
        Continue with Google
      </a>
    </div>
  );
}

export default GoogleSignBtn;
