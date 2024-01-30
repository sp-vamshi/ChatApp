import { Divider, Stack } from "@mui/material";
import React from "react";
import GoogleAuthBtn from "../../components/AuthButtons/GoogleAuthBtn";

const AuthSocial = () => {
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before,::after": { borderTopStyle: "dashed" },
        }}
      >
        OR
      </Divider>
      <Stack direction="row" justifyContent={"center"} spacing={2}>
        <GoogleAuthBtn />
        {/* <IconButton color='inherit'>
                    <GithubLogo />
                </IconButton>
                <IconButton>
                    <TwitterLogo color='#1C9CEA' />
                </IconButton> */}
      </Stack>
    </div>
  );
};

export default AuthSocial;
