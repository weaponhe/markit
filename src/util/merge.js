module.exports = function (target) {
  for (let i = 1, len = arguments.length; i < len; i++) {
    var source = arguments[i];
    if (typeof source === 'object') {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          source[key] && (target[key] = source[key]);
        }
      }
    }
  }
  return target;
}
