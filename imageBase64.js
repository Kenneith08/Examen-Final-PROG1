import fs from 'fs';
import path from 'path';

const encodeImageToBase64 = (imagePath) => {
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Fichier introuvable : ${imagePath}`);
  }
  const imageBuffer = fs.readFileSync(imagePath);
  const base64String = imageBuffer.toString('base64');
  return base64String;
};


const decodeBase64ToImage = (base64String, outputPath) => {
  const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(cleanBase64, 'base64');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, imageBuffer);

  console.log(`✅ Image décodée et enregistrée : ${outputPath}`);
};

export { encodeImageToBase64, decodeBase64ToImage };
