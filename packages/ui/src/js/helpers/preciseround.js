module.exports = (num, decimals = 2) => {
  let sign = num >= 0 ? 1 : -1;
  return (
    Math.round(num * Math.pow(10, decimals) + sign * 0.001) /
    Math.pow(10, decimals)
  ).toFixed(decimals);
};
