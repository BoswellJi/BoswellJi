/**
 * 将图片文件转为base64
 * @param {*} img 
 * @returns 
 */
 export function convertImgToBase64(img) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = img;
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const ext = image.src.substring(img.lastIndexOf(".") + 1).toLowerCase();
      const dataURL = canvas.toDataURL("image/" + ext);
      resolve(dataURL);
    }
  });
}

/**
 * 下载文件
 * @param {*} url 跳转地址
 */
export async function downloadFile(url, isCrossOrigin) {
  if (isCrossOrigin) {
    try {
      url = await convertImgToBase64(url);
    } catch (err) {
      return;
    }
  }

  const a = document.createElement('a');
  const body = document.body;
  a.target = "_blank";
  a.download = 'ewm.jpg';
  a.rel = 'noopener norefferrer';
  a.href = url;
  body.appendChild(a);
  a.click();
  body.removeChild(a);
}