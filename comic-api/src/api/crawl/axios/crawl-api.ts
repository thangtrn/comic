import axios from 'axios';

const crawlApi = axios.create({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    Accept: 'application/json',
    Referer: 'https://truyenqqto.com/',
  },
});

export default crawlApi;
