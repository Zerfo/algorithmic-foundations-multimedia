import { cloneElement, useContext } from "react";

import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import ThemeContext from "../Theme";

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
  const { theme, onChangeTheme } = useContext(ThemeContext);

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

            <div className={style.header_toolbar_right}>
              <span className={style.header_toolbar_right_icon}>
                {theme === "light" ? (
                  <LightModeIcon onClick={onChangeTheme} />
                ) : (
                  <NightlightRoundIcon onClick={onChangeTheme} />
                )}
              </span>

              <span className={style.header_toolbar_right_icon}>
                <Link
                  className={style.header_toolbar_right_icon}
                  href="https://github.com/Zerfo/algorithmic-foundations-multimedia"
                  passHref
                >
                  <a target="_blank">
                    <GitHubIcon sx={{ width: 32, height: 32 }} />
                  </a>
                </Link>
              </span>

              <span className={style.header_toolbar_right_authorname}>
                <Stack
                  direction="row"
                  spacing={2}
                  className={style.header_toolbar_right_authorname_avatar}
                >
                  <Avatar
                    alt="Смекалин Н.Н."
                    src="static/me.jpg"
                    sx={{ width: 46, height: 46 }}
                    className={style.avatar}
                  />
                </Stack>
                <Typography
                  component="p"
                  className={style.header_toolbar_right_authorname_name}
                >
                  Смекалин Н.Н.
                </Typography>
              </span>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}

export default Header;
