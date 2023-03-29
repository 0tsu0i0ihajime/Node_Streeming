const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.static('public'));

app.get('/download', (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.send('Please provide a YouTube URL');
  } else if (ytdl.validateURL(url)) {
    const stream = ytdl(url, { quality: 'highestaudio' });
    res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
    stream.pipe(res);
    stream.on('finish', () => {
      stream.destroy();
    });
  } else {
    res.send('Invalid YouTube URL');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
