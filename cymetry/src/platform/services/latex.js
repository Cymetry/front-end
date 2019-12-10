import { parse, HtmlGenerator } from 'latex.js';

export const parseLatex = latex => {
  const generator = new HtmlGenerator({ hyphenate: false })
  const doc = parse(latex, { generator: generator }).htmlDocument();
  return doc.outerHTML;
};