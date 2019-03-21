'use strict';

import {Controller} from 'egg';

export default class DownloadController extends Controller {
    public async render() {
        const {ctx} = this;
        const env = ctx.app.config.env;

        let clientSuffix = '';
        if (env === 'sit') {
            clientSuffix = '-SIT测试版';
        }
        if (env === 'uat') {
            clientSuffix = '-测试版';
        }
        await ctx.render('download.html', {
            clientSuffix,
        });
    }
}
