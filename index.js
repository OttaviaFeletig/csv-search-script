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
const dateToString = (date) => {
  return `${date.getDate() - 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
const checkIsDate = (date) => {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return true;
  } else {
    false;
  }
};
const findData = (path, column, key) => {
  const filteredData = [];
  const readStream = fs.createReadStream(path);
  readStream.pipe(parse({ delimiter: ",", from_line: 1 })).on("data", (row) => {
    if (
      (checkIsDate(key) &&
        column === 3 &&
        stringToDate(row[column]).getTime() === key.getTime()) ||
      row[column] === key
    ) {
      filteredData.push(row);
    }
  });
  readStream.on("end", () => {
    filteredData.length > 0
      ? console.log(filteredData.join("\r\n"))
      : console.log(
          `No record was found for input: ${column} ${
            checkIsDate(key) ? dateToString(key) : key
          }`
        );
  });
  readStream.on("error", (error) => {
    console.log(error.message);
  });
};

const readInput = () => {
  if (argv.length === 5) {
    const path = argv[2];
    const column = parseInt(argv[3]);
    const key = column === 3 ? stringToDate(argv[4]) : argv[4];
    findData(path, column, key);
  } else {
    console.log("Incorrect input");
  }
};
readInput();
