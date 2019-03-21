import {Controller} from 'egg';

export default class AgreementController extends Controller {
    public async render() {
        const { ctx } = this;
        await ctx.render('agreement.html');
    }
}
