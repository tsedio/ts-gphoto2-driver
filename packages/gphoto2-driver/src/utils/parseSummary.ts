const REG_META = /\((read only|readwrite)\) \(type=(\w+)\)/;
const REG_RANGE = /Range \[(-?\d*\.?\d+) - (-?\d*\.?\d+), step (\d+)]/;
const REG_ENUM = /Enumeration \[(.*)]/;

function coerceValue(rawValue: any) {
  return isNaN(+rawValue) ? rawValue.replace(/'/g, "") : +rawValue;
}

function parseMeta(label: string, value: string) {
  const [, readonly, typeAddress] = value.match(REG_META) || [];
  const [newLabel, address] = label.split("(");

  return {
    label: newLabel.trim(),
    address: address ? address.split(")")[0] : undefined,
    value,
    raw: value,
    readonly: readonly === undefined ? undefined : readonly === "read only",
    typeAddress
  };
}

function parseRange(value: string) {
  const match = value.match(REG_RANGE);

  if (match) {
    const [, min, max, step] = match;
    const rawValue = value.split("value: ")[1].trim();
    const unit = rawValue.match(/(mm|%)/);

    const item = {
      type: "range",
      min: +min,
      max: +max,
      step: +step,
      value: coerceValue(rawValue),
      unit: unit ? unit[1] : null
    };

    if (rawValue.includes("(")) {
      item.value = coerceValue(rawValue.split("(")[1].split(")")[0]);
    }

    return item;
  }

  return {};
}

function parseEnum(value: string) {
  const match = value.match(REG_ENUM);

  if (match) {
    const [, choices] = match;
    const rawValue = value.split("value: ")[1].trim();

    const item: any = {
      type: "enum",
      value: coerceValue(rawValue),
      choices: choices.split(",").map(coerceValue)
    };

    if (rawValue.includes("(")) {
      item.value = coerceValue(rawValue.split("(")[1].split(")")[0]);
    }

    return item;
  }
  return {};
}

function parseTypes({label, value}: any) {
  const item: any = parseMeta(label, value);

  if (value.includes("Range")) {
    try {
      return {
        ...item,
        ...parseRange(value)
      };
    } catch (er) {
      console.log("Parse error:", value);
    }
  }

  if (value.includes("Enumeration")) {
    try {
      return {
        ...item,
        ...parseEnum(value)
      };
    } catch (er) {
      console.log("Parse error:", value);
    }
  }

  return {
    ...item,
    type: item.value === "" ? "section" : undefined,
    value: item.value === "" ? undefined : item.value,
    raw: item.value === item.raw ? undefined : item.rawValue
  };
}

export function parseSummary(content: string) {
  return content
    .split("\n")
    .reduce((acc, line) => {
      if (line.includes(":") && !line.trim().startsWith("]")) {
        const [label, ...info] = line.split(":");

        if (label) {
          acc.push({
            label: label.trim(),
            value: info.join(":").trim()
          });
        }
      } else {
        acc[acc.length - 1].value += line.trim();
      }

      return acc;
    }, [] as any[])
    .map(parseTypes);
}
