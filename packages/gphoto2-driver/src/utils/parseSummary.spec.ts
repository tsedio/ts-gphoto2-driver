import {parseSummary} from "./parseSummary";
import fs from "fs";
import parsedSummary from "./__mock__/parsedSummary.json";

describe("parseSummary", () => {
  it("should parse summary", () => {
    const content = fs.readFileSync(__dirname + "/__mock__/data.txt", {encoding: "utf-8"});
    const result = parseSummary(content);

    expect(result).toEqual(parsedSummary);
  });
});
