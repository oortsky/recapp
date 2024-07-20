export const dateReadable = str => {
  const date = new Date(str);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const humanReadableDate = date.toLocaleDateString("id-ID", options);
  return humanReadableDate;
};
