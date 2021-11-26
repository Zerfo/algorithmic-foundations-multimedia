import { useCallback, useState } from "react";

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SourceCode from "../../components/SourceCode";

import { encode, decode, functions } from "../../util/LZW";
import { byteCount } from "../../util/byteCount";

import style from "./style.module.scss";

export function Lab_4() {
  const [state, setState] = useState();
  const { encoded, decoded } = state || {};

  const onEncode = useCallback(
    (value) =>
      setState((oldState) => {
        const [rezult, logs] = value?.length > 0 ? encode(value) : ["", []];

        const bits_before = byteCount(value);
        const bits_after = byteCount(rezult);
        const compression = (
          ((bits_before - bits_after) / bits_before) *
          100
        ).toFixed(2);

        return {
          ...oldState,
          encoded: {
            initial: value,
            rezult,
            bits_before,
            bits_after,
            compression,
            logs: [...logs],
          },
        };
      }),
    []
  );

  return (
    <div className={style.container}>
      <Typography variant="h3" gutterBottom>
        Лабораторная работа №4 «Алгоритм LZW»
      </Typography>
      <Typography variant="h4" gutterBottom>
        Задание
      </Typography>
      <Typography component="p">
        Реализовать программу для LZW кодирования и декодирования текстовой
        информации и информации об изображении (например последовательное
        указание цветов пикселей изображения).
      </Typography>
      <Typography component="p">
        В программе предусмотреть вывод словаря и шагов сжатия и декодирования.
      </Typography>
      <Typography component="p">
        Количество символов входного алфавита заранее не известно, текст
        вводится пользователем.
      </Typography>
      <Typography component="p">
        Необходимо вывести служебную информацию:
      </Typography>
      <List component="nav">
        <ListItemText primary="1. Количество бит до сжатия." />
        <ListItemText primary="2. Количество бит после сжатия." />
        <ListItemText
          primary="3. Степень компрессии в процентах ((биты_до – биты_после)/биты_до *
100%)."
        />
      </List>
      <Typography variant="h4">Решение</Typography>
      <Typography variant="h5">Кодирование</Typography>
      <div className={style.decode_encode_container}>
        <div className={style.decode_encode_container_inputs}>
          <TextField
            label="Исходная строка"
            onChange={({ target }) => onEncode(target.value)}
          />
          <ArrowForwardIcon className={style.icon} />
          <TextField label="Результат" disabled value={encoded?.rezult || ""} />
        </div>
        {encoded?.bits_before && (
          <>
            <Typography component="p">
              Кол-во бит до сжатия: {encoded?.bits_before}
            </Typography>
            <Typography component="p">
              Кол-во бит после сжатия: {encoded?.bits_after}
            </Typography>
            <Typography component="p">
              Степень компрессии: {encoded?.compression}%
            </Typography>
            <table border="1">
              <tr>
                <th rowSpan="2">Текущая строка</th>
                <th rowSpan="2">Текущий символ</th>
                <th rowSpan="2">Следующий символ</th>
                <th colSpan="2">Вывод</th>
                <th rowSpan="2">Словарь</th>
              </tr>
              <tr>
                <th>Код</th>
                <th>Биты</th>
              </tr>
              {console.log(encoded?.logs)}
              {encoded?.logs?.map((log, idx) => (
                <tr key={idx}>
                  {log.map((itm, idx) => (
                    <td key={idx}>{itm}</td>
                  ))}
                </tr>
              ))}
            </table>
          </>
        )}
      </div>
      <Typography variant="h4">Исходный код функций</Typography>
      {functions.map(({ title, func }, funcId) => (
        <SourceCode key={funcId} title={title} func={func} />
      ))}
    </div>
  );
}

export default Lab_4;
