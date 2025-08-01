import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const soalPath = path.resolve('./data/soal.json');
  const soalData = JSON.parse(fs.readFileSync(soalPath, 'utf-8'));
  const acak = soalData[Math.floor(Math.random() * soalData.length)];

  res.status(200).json(acak);
}
