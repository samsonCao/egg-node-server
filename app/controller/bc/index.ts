'use strict';

import {Controller} from 'egg';

export default class IndexController extends Controller {
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
