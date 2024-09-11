import express from 'express';
import http from 'http';

import { config } from 'dotenv';
import ChessServer from './sockets/chess.mjs';

const dev = process.env.NODE_ENV !== 'production';

if (dev) config();

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);

ChessServer(server);

server.listen(port, () => {
    console.log(`Server listening on *:${port}`);
});
