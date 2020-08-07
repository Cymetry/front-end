export const parseLatex = (latex) => {
  const regex = /\$(.*?)\$/g;
  return latex.replace(regex, match => match.split(" ").join("~"));
}