export default (str = '', count = 20) =>
  str.length < count ? str : `${str.slice(0, count)}...`;
