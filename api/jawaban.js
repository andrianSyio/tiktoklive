let leaderboard = {};
import soalData from '../../data/soal.json';

let currentSoal = soalData[Math.floor(Math.random() * soalData.length)];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nama, jawaban } = req.body;
    const benar = currentSoal.jawaban.map(j => j.toLowerCase());
    const isBenar = benar.includes(jawaban.toLowerCase());

    if (isBenar) {
      leaderboard[nama] = (leaderboard[nama] || 0) + 10;
      return res.status(200).json({ status: 'benar', leaderboard });
    } else {
      return res.status(200).json({ status: 'salah', leaderboard });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ soal: currentSoal.soal, leaderboard });
  }
}
