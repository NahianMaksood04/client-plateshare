import axios from 'axios';

const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export async function uploadToImgbb(base64OrFile) {
  // Accepts a base64 string or File and returns image URL
  // If File, convert to base64
  let base64;
  if (base64OrFile instanceof File) {
    base64 = await fileToBase64(base64OrFile);
    base64 = base64.split(',')[1];
  } else if (typeof base64OrFile === 'string') {
    // expected to be dataURL or remote URL; if dataURL, strip prefix
    if (base64OrFile.startsWith('data:')) {
      base64 = base64OrFile.split(',')[1];
    } else {
      // if it's an URL, we will send it as "image" param (imgbb accepts remote URLs)
      const res = await axios.post('https://api.imgbb.com/1/upload', null, {
        params: {
          key: IMGBB_KEY,
          image: base64OrFile
        }
      });
      return res.data.data.url;
    }
  } else {
    throw new Error('Invalid file/image');
  }

  const res = await axios.post('https://api.imgbb.com/1/upload', null, {
    params: {
      key: IMGBB_KEY,
      image: base64
    }
  });

  return res.data.data.url;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}
