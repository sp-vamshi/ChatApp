import { Button } from "@mui/material";
import { GoogleLogo } from "phosphor-react";
import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { SigninWithGoogle } from "../../redux/slices/auth";
import { BASE_URL } from "../../config";
import { showSnackBar } from "../../redux/slices/app";

const GoogleAuthBtn = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${BASE_URL}/auth/sign-in-with-google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: result.user.displayName,
          lastName: "",
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(SigninWithGoogle(data));
    } catch (error) {
      dispatch(showSnackBar({ severity: "error", message: "Cannot signin with Google." }));
    }
  };

  return (
    <Button
      fullWidth
      color="inherit"
      size="large"
      variant="contained"
      onClick={handleGoogleClick}
      sx={{
        bgcolor: "transparent",
        border: "1px solid black",
        color: (theme) => (theme.palette.mode === "light" ? "common.black" : "grey.800"),
        "&:hover": {
          bgcolor: "text.primary",
          color: (theme) => (theme.palette.mode === "light" ? "common.white" : "grey.800"),
        },
      }}
    >
      <GoogleLogo color="#DF3E30" fontSize={30} />
      <span style={{ marginLeft: "3%" }}>Login With Google</span>
    </Button>
  );
};

export default GoogleAuthBtn;
