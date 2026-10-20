import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import { MenuItem, type MenuItemRecord } from './models/menu-item';

const app = express();
const port = Number(process.env['PORT'] ?? 3000);
const clientRoot = path.resolve(__dirname, '../client/browser');

const fallbackMenu: MenuItemRecord[] = [
  {
    name: '招牌黑糖刨冰',
    note: '經典必吃・濃郁回甘',
    image: '/images/menu-signature.jpg',
    alt: '招牌黑糖刨冰，淋上香醇黑糖漿',
    sortOrder: 1,
    visible: true
  },
  {
    name: '綜合刨冰',
    note: '多種配料・豐富滿足',
    image: '/images/menu-assorted.jpg',
    alt: '綜合刨冰搭配多款傳統配料',
    sortOrder: 2,
    visible: true
  },
  {
    name: '抹茶紅豆刨冰',
    note: '清新茶香・經典相遇',
    image: '/images/menu-matcha.jpg',
    alt: '抹茶刨冰佐紅豆與傳統配料',
    sortOrder: 3,
    visible: true
  },
  {
    name: '芒果沙冰',
    note: '芒果清甜・冰涼爽口',
    image: '/images/menu-mango.jpg',
    alt: '芒果沙冰搭配黑糖與配料',
    sortOrder: 4,
    visible: true
  }
];

const story = '用好的食材慢火熬出好味道，一路下來要堅持初衷真的不容易，簡單而不簡單，但現在每天堅持做同樣的事也很幸福，希望這份好味道可以讓更多人知道';
const address = '高雄市楠梓區右昌街727號, Kaohsiung, Taiwan';
const phone = '07 365 7771';

app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not-connected'
  });
});

app.get('/api/menu', async (_request, response) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const records = await MenuItem.find({ visible: true }).sort({ sortOrder: 1 }).lean();
      if (records.length > 0) {
        response.json(records);
        return;
      }
    } catch (error) {
      console.error('MongoDB menu query failed; serving the bundled menu instead.', error);
    }
  }
  response.json(fallbackMenu);
});

app.get('/api/story', (_request, response) => {
  response.json({ story });
});

app.get('/api/store', (_request, response) => {
  response.json({ address, phone });
});

app.use(express.static(clientRoot, { index: false, maxAge: '1h' }));
app.get(/.*/, (request, response, next) => {
  if (request.path.startsWith('/api/')) {
    response.status(404).json({ error: 'API route not found' });
    return;
  }
  response.sendFile(path.join(clientRoot, 'index.html'), (error) => {
    if (error) next(error);
  });
});

app.listen(port, '0.0.0.0', () => {
  console.info(`羅家祖傳黑砂糖刨冰 website listening on port ${port}`);
});

const mongoUri = process.env['MONGODB_URI'];
if (mongoUri) {
  void mongoose
    .connect(mongoUri, { serverSelectionTimeoutMS: 8000 })
    .then(() => console.info('MongoDB connection established.'))
    .catch((error: unknown) => {
      console.error('MongoDB connection unavailable; the storefront remains available.', error);
    });
} else {
  console.info('MONGODB_URI is not set; serving the bundled read-only menu.');
}
