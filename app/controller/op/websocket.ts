'use strict';
import {Controller} from 'egg';
import * as webSocket from 'ws';

const wss = new webSocket.Server({port: 15016});
wss.on('connection', (ws) => {
    const sendStockUpdates = (wsr) => {
        if (wsr.readyState === 1) {
            wsr.send('连接成功');
        }
    };
    ws.on('message', function incoming(message) {
        console.log(message);
        console.log('received: %s', message);
        ws.send(message);
    });
    setInterval(() => {
        sendStockUpdates(ws);
    }, 10000);
});

class WsController extends Controller {
    async render() {
        await this.ctx.render('websocket.html');
    }
}

module.exports = WsController;
