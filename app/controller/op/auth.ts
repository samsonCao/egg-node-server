import {Controller} from 'egg';
import * as qs from 'qs';

export default class AuthController extends Controller {
    public async getToken() {
        const { ctx } = this;
        const { client_id, client_secret } = this.config;
        const { username, password } = ctx.request.body;

        const params = {
            url: '/token/xxxx',
            method: 'POST',
            dataType: 'json',
            data: qs.stringify({
                grant_type: 'password',
                scope: 'app',
                client_id,
                client_secret,
                username,
                password,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        const response = await ctx.service.common.request(params);
        const { access_token } = response.data;
        if (access_token) {
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: 'SUCCESS',
                data: {
                    access_token,
                },
            };
        } else {
            ctx.status = 200;
            ctx.body = {
                code: 500,
                message: response.data.error_description,
            };
        }
    }
}
