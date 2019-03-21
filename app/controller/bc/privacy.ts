import {Controller} from 'egg';

export default class PrivacyController extends Controller {
    public async render() {
        const { ctx } = this;
        await ctx.render('privacy.html');
    }
}
