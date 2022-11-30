import { argv } from "node:process";
import fs from "fs";
import { parse } from "csv-parse";

const stringToDate = (date) => {
  const splitDate = date.replace(";", "").split("/");
  return new Date(
    splitDate[2],
    parseInt(splitDate[1]) - 1,
    parseInt(splitDate[0]) + 1
  );
};

const readInput = () => {
  if (argv.length === 5) {
    const path = argv[2];
    const column = parseInt(argv[3]);
    const key = column === 3 ? stringToDate(argv[4]) : argv[4];
    console.log(path, column, key);
  } else {
    console.log("Incorrect input");
  }
};
readInput();
