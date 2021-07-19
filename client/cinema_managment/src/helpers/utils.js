export const stringToArray = (str) => {
  return str.split(",").map((el) => el.trim());
};

export const arrayToString = (arr) => {
  return arr.reduce((acc, el) => acc + ", " + el);
};

export const dateToString = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const addZeroeToMonthAndDateIfNeccessary = (str) => {
  const match = str.match(/\D/g);
  if (!match) {
    return str;
  }
  const seperator = match[0];
  const arr = str.split(seperator);
  const ans = arr
    .map((el) => {
      return el.length === 1 ? "0" + el : el;
    })
    .reduce(
      (acc, el, idx, arr) =>
        idx < arr.length - 1 ? acc + el + seperator : acc + el,
      ""
    );
  return ans;
};

export const switchMonthDayPlaces = (str) => {
  const match = str.match(/\D/g);
  if (!match) {
    return str;
  }
  const seperator = match[0];
  const arr = str.split(seperator);
  const idx1 = arr.findIndex((el) => el.length <= 2);
  const idx2 = arr.findIndex((el, idx) => idx > idx1 && el.length <= 2);
  const el1 = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = el1;
  const ans = arr.reduce(
    (acc, el, idx, arr) =>
      idx < arr.length - 1 ? acc + el + seperator : acc + el,
    ""
  );
  return ans;
};

export const reverseDateStr = (str) => {
  const match = str.match(/\D/g);
  if (!match) {
    return str;
  }
  const seperator = match[0];
  const arr = str.split(seperator);
  arr.reverse();
  const ans = arr.reduce(
    (acc, el, idx, arr) =>
      idx < arr.length - 1 ? acc + el + seperator : acc + el,
    ""
  );
  return ans;
};

export const replaceSeperator = (str, newSeperator) => {
  const match = str.match(/\D/g);
  if (!match) {
    return str;
  }
  const oldSeperator = match[0];
  const arr = str.split(oldSeperator);
  const ans = arr.reduce(
    (acc, el, idx, arr) =>
      idx < arr.length - 1 ? acc + el + newSeperator : acc + el,
    ""
  );
  return ans;
};
