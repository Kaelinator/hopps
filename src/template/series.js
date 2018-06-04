
const notNegative = n => (n < 0) ? 0 : n

module.exports = ({ begin, end }, length) => {

  begin = (begin >= 0) ? begin : length + begin
  end = (end >= 0) ? end || length : length + end

  const lo = notNegative(begin)
  const hi = notNegative(end)

  return (hi > lo)
    ? Array(hi - lo)
      .fill(lo)
      .map((n, i) => n + i)
    : []
}