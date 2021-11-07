import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { CodeBlock, dracula } from "react-code-blocks";

import style from "./style.module.scss";

function SourceCode({ title, func }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className={style.title_container} onClick={() => setOpen(!isOpen)}>
        <Typography variant="h5" onClick={() => setOpen(true)}>
          {title}
        </Typography>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <CodeBlock
          wrapLines
          codeBlock={true}
          language="jsx"
          theme={dracula}
          text={func}
        />
      </Collapse>
    </>
  );
}

export default SourceCode;
