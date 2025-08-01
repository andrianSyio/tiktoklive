import soalData from '../../data/soal.json';

export default function handler(req, res) {
  const acak = soalData[Math.floor(Math.random() * soalData.length)];
  res.status(200).json(acak);
}
