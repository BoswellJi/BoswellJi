/**
 * 问题可以被抽象位2维数组；
 * 每张图片就是像素数组；
 */

function floodFill(image, sr, sc, newColor) {
  let origColor = image[sr][sc];
  fill(image, sr, sc, origColor, newColor);
  return image;
}

// function fill(image, x, y, origColor, newColor) {
//   if (!inArea(image, x, y)) return;
//   if (image[x][y] != origColor) return;
//   if (image[x][y] == -1) return;

//   image[x][y] = -1;

//   fill(image, x, y + 1, origColor, newColor);
//   fill(image, x, y - 1, origColor, newColor);
//   fill(image, x - 1, y, origColor, newColor);
//   fill(image, x + 1, y, origColor, newColor);

//   image[x][y] = newColor;
// }

let visited = [[],[],[]];
/**
 * 魔术棒算法
 * @param {*} image 
 * @param {*} x 
 * @param {*} y 
 * @param {*} origColor 
 * @param {*} newColor 
 */
function fill(image, x, y, origColor, newColor) {
  if (!inArea(image, x, y)) return 0;
  if (visited[x][y]) return 1;
  if (image[x][y] != origColor) return 0;
  if (image[x][y] == origColor) {
    visited[x][y] = true;
    let surround =
      fill(image, x, y + 1, origColor, newColor)
      + fill(image, x, y - 1, origColor, newColor)
      + fill(image, x - 1, y, origColor, newColor)
      + fill(image, x + 1, y, origColor, newColor);

    if (surround < 4) {
      image[x][y] = newColor;
    }
    return 1;
  }
}

function inArea(image, x, y) {
  return x >= 0 && x < image.length && y >= 0 && y < image[0].length;
}

const arr2D = floodFill(
  [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, 1, 2
);
console.log(arr2D);