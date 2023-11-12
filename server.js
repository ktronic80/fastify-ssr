import Fastify from 'fastify';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import path from 'node:path';

import App from './client/App.jsx';

const fastify = Fastify({
    logger: true
});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
});

// Declare a route
fastify.get('/interactive', function (request, reply) {
    reply.type('text/html');
    return (`
    <html>
      <head></head>
      <body>
        <div id="root">${renderToString(React.createElement(App))}</div>
        <script src="/public/client.js"></script>  
      </body>
    </html>
    `);
})

fastify.get('/static', function (request, reply) {
    reply.type('text/html');
    return renderToStaticMarkup(React.createElement(App))
})


const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()