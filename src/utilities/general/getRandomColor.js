function randomColor(index) {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function memoizedRandomColor() {
  let cache = {};
  return (index) => {
    if (index in cache) {
      return cache[index];
    } else {
      let result = randomColor();
      cache[index] = result;
      return result;
    }
  };
}

export const getRandomColor = memoizedRandomColor();
