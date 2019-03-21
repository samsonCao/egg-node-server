'use strict';

import {Controller} from 'egg';

export default class BrowserController extends Controller {
    public async render() {
        const {ctx} = this;
        await ctx.render('browser.html');
    }
}
