'use strict';

import {Controller} from 'egg';

class IndexController extends Controller {
    public async render() {
        await this.ctx.render('index.html');
    }

    public async building() {
        await this.ctx.render('building.html');
    }

    /**
     * 检查 API 状态
     */
    public checkHealth() {
        const { ctx } = this;
        ctx.body = {
            code: 200,
            data: {
                health: 'OK',
            },
            message: 'success',
        };
        ctx.status = 200;
    }
}

module.exports = IndexController;
