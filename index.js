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

const findData = (path, column, key) => {
  const readStream = fs.createReadStream(path);
  readStream.pipe(parse({ delimiter: ",", from_line: 1 })).on("data", (row) => {
    console.log("row", row);
    console.log("row[column]", row[column]);
    console.log("key", key);
  });
  readStream.on("end", () => {
    console.log("finished");
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
