const onReady = () => {
  const els = document.querySelectorAll(".camera-preview");

  Array.from(els).forEach((canvas) => {
    const {src} = canvas.dataset;
    const context = canvas.getContext("2d");

    const image = new Image();
    const onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return (image.src = `${src}?timestamp=${Date.now()}`);
    };

    image.src = src;
    image.addEventListener("load", onload);

    onload();
  });
};

window.addEventListener("DOMContentLoaded", onReady);
