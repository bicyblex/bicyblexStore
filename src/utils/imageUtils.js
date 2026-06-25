export const convertToWebP = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Creamos un nuevo objeto File con la extensión .webp
              const webpFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, ".webp"),
                {
                  type: "image/webp",
                }
              );
              resolve(webpFile);
            } else {
              reject(new Error("Error al convertir a WebP"));
            }
          },
          "image/webp",
          quality
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};
