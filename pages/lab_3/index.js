import { useCallback, useRef, useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SourceCode from "../../components/SourceCode";

import { encode, decode, byteCount, functions } from "../../util/RLE";

import style from "./style.module.scss";

export function Lab_3() {
  const [state, setState] = useState();
  const { encoded, decoded } = state || {};

  const onEncode = useCallback(
    (value) =>
      setState((oldState) => {
        const rezult = encode(value.split("")).join("");

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
          },
        };
      }),
    []
  );

  const onDecode = useCallback(
    (value) =>
      setState((oldState) => {
        const rezult = decode(
          value.split("").map((i, id) => (id % 2 === 0 ? +i : i))
        ).join("");

        const bits_before = byteCount(value);
        const bits_after = byteCount(rezult);
        const compression = (
          ((bits_before - bits_after) / bits_before) *
          100
        ).toFixed(2);

        return {
          ...oldState,
          decoded: {
            initial: value,
            rezult,
            bits_before,
            bits_after,
            compression,
          },
        };
      }),
    []
  );

  return (
    <div className={style.container}>
      <Typography variant="h3" gutterBottom>
        Лабораторная работа №3 «Реализация алгоритма кодирования повторов (RLE)»
      </Typography>
      <Typography variant="h4" gutterBottom>
        Задание
      </Typography>
      <Typography component="p">
        Необходимо разработать приложение, получающее на входе
        последовательность чисел (в диапазоне от 0 до 255) или букв (вводятся с
        клавиатуры или читается из файла), и возвращающего две
        последовательности: последовательность символов, закодированную с
        помощью алгоритма кодирования длин серий, и последовательность символов,
        полученную из первой путем декодирования.
      </Typography>
      <Typography component="p">
        Необходимо реализовать алгоритм RLE для цепочек повторяющихся символов
        различной длины (1, 2, 3, 4).
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
          </>
        )}
      </div>
      <Typography variant="h5">Декодирование</Typography>
      <div className={style.decode_encode_container}>
        <div className={style.decode_encode_container_inputs}>
          <TextField
            label="Исходная строка"
            onChange={({ target }) => onDecode(target.value)}
          />
          <ArrowForwardIcon className={style.icon} />
          <TextField label="Результат" disabled value={decoded?.rezult || ""} />
        </div>
        {decoded?.bits_before && (
          <>
            <Typography component="p">
              Кол-во бит до сжатия: {decoded?.bits_before}
            </Typography>
            <Typography component="p">
              Кол-во бит после сжатия: {decoded?.bits_after}
            </Typography>
            <Typography component="p">
              Степень компрессии: {decoded?.compression}%
            </Typography>
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

export default Lab_3;
