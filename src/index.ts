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

  const startTime = performance.now();
  const ocrProcessedImages = await Promise.all(
    images.map(async (image) => {
      return ocrImage(image);
    })
  );
  const endTime = performance.now();

  console.log(ocrProcessedImages);
  //log the total time and the time average per image // cut it at 2 decimals
  console.log(
    `Images Processed: ${images.length} | Total time: ${(
      (endTime - startTime) /
      1000
    ).toFixed(2)} seconds | Average time per image: ${(
      (endTime - startTime) /
      1000 /
      images.length
    ).toFixed(2)} seconds`
  );
}

main();
