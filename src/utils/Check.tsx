export const checkLengthOfValue = (val: any, symbol = ""): any => {
  if (typeof val === "string") {
    return val.trim().length ? (
      val + symbol
    ) : (
      <div className="w-[20px] flex h-[1px] bg-gray-500 dark:bg-gray-100"></div>
    );
  } else {
    return !!val ? (
      val + symbol
    ) : (
      <div className="w-[20px] h-[1px] bg-gray-500 dark:bg-gray-100"></div>
    );
  }
};

export const CutString = (inputString: any): any => {
  if (typeof inputString == "string") {
    if (inputString.length > 20) {
      return inputString.slice(0, 20) + "...";
    } else {
      return inputString;
    }
  }
};

export function distanceToPrice(str: string): any {
  const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
  if (str) {
    const match = str.match(regex);

    if (match) {
      const number = parseFloat(match[0].replace(/,/g, ""));
      if (!isNaN(number)) {
        let fuel = (number / 100) * 35 * 1.2;
        let plusDriverSalary = (fuel / 100) * 225;
        let plusWorker = (plusDriverSalary / 100) * 110;
        return Math.floor(plusWorker);
      }
    }
  }
  return undefined;
}

// export function extractNumberFromString(str: string): number | "" {
//   const regex = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
//   if (str) {
//     const match = str.match(regex);

//     if (match) {
//       return Math.floor(parseFloat(match[0].replace(/,/g, "")));
//     }
//   }
//   return "";
// }
