import soalData from '../../data/soal.json';

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

  // ✅ Penting untuk fetch soal dari HTML
  if (req.method === 'GET') {
    return res.status(200).json({ soal: currentSoal.soal, leaderboard });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
