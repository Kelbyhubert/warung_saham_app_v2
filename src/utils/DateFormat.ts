export const dateFormatV1 = (date: Date) => {
  if (date === null) return "-";
  //pake moment nanti
  return new Date(date).toLocaleDateString("en-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
