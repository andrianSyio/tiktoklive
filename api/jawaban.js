import fs from 'fs';
import path from 'path';

const soalPath = path.resolve('./data/soal.json');
const soalData = JSON.parse(fs.readFileSync(soalPath, 'utf-8'));

let leaderboard = {};
let currentSoal = soalData[Math.floor(Math.random() * soalData.length)];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nama, jawaban } = req.body;
    const jawabanBenar = currentSoal.jawaban.map(j => j.toLowerCase());
    const isBenar = jawabanBenar.includes(jawaban.toLowerCase());

    if (isBenar) {
      leaderboard[nama] = (leaderboard[nama] || 0) + 10;
    }

    return res.status(200).json({ status: isBenar ? 'benar' : 'salah', leaderboard });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ soal: currentSoal.soal, leaderboard });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
