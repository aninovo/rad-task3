export const extractDatesFromString = (s: string): Date[] => {
  let results = [];
  let resultsISO = [];
  const regex = /(\d{1,2}([.\-/])\d{1,2}([.\-/])\d{4})/g;
  // corresponds to DD.MM.YYYY or DD/MM/YYYY etc., the final "g" is a flag marking that we want multiple matches
  const matches = s.match(regex);
  if (matches != null) {
    // parse substrings into Date
    results = matches.map((match) => {
      const [dd, mm, yyyy] = match.split(/[\.\-\/]/);
      return new Date(+yyyy, +mm, +dd);
    });
  }
  const regexISO = /(\d{4}([.\-/])\d{1,2}([.\-/])\d{1,2})/g;
  // corresponds to the YYYY.MM.DD format
  const matchesISO = s.match(regexISO);
  if (matchesISO != null) {
    // parse substrings into Date
    resultsISO = matchesISO.map((match) => {
      const [yyyy, mm, dd] = match.split(/[\.\-\/]/);
      return new Date(+yyyy, +mm, +dd);
    });
  }
  return results.concat(resultsISO);
};
