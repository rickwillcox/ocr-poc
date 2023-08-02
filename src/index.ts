import tesseract from "tesseract.js";
import fs from "fs";
import path from "path";

async function ocrImage(image: any) {
  return (await tesseract.recognize(image)).data.text.toLowerCase();
}

function readAllImages(): Buffer[] {
  const imageFolderPath = "./images";
  const files = fs.readdirSync(path.resolve(__dirname, imageFolderPath));

  return files.map((file) => {
    return fs.readFileSync(path.resolve(__dirname, `./images/${file}`));
  });
}

async function main() {
  const images = readAllImages();

  const ocrProcessedImages = await Promise.all(
    images.map(async (image) => {
      return ocrImage(image);
    })
  );

  console.log(ocrProcessedImages);
}

main();
