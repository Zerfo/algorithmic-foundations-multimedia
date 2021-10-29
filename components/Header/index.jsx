import { cloneElement } from "react";

import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import style from "./style.module.scss";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window() : undefined,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function Header(props) {
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar className={style.header} position="static">
          <Toolbar className={style.header_toolbar}>
            <Link href="/" passHref>
              <Typography variant="h6" component="div" className={style.link}>
                Алгоритмические основы мультимедийных технологий
              </Typography>
            </Link>
            <div className={style.header_toolbar_authorname}>
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Смекалин Н.Н."
                  src="static/me.jpg"
                  sx={{ width: 46, height: 46 }}
                  className={style.avatar}
                />
              </Stack>
              <Typography component="p" className={style.name}>
                Смекалин Н.Н.
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}

export default Header;
