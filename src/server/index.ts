import { createServer } from 'http';

import app from './app';

const server = createServer(app)
    .on('listening', () => {
        console.log(`server started on port ${server.address()['port']}`);
    })
    .on('close', () => {
        console.log('server stopped');
    });

server.listen(8081);

