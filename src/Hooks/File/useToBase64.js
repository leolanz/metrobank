const useToBase64 = (img) => {
  const convert = (image) => {
    return new Promise((resolve, reject) => {
      if (image !== null && image !== '' && image !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
      }
    });
  };

  return [convert];
};

export default useToBase64;
