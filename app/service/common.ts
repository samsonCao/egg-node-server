import {Service} from 'egg';
import * as setCookieParser from 'set-cookie-parser';

interface RequestParams {
    url: string;
    method: any;
    dataType: string;
    data: object;
    headers: object;
}

export default class CommonService extends Service {
    public async request(params: RequestParams) {
        const {ctx} = this;
        const {url, method, dataType, data, headers} = params;
        const {host} = ctx.app.config;

        const options = {
            dataType,
            data,
            headers,
            method: method.toUpperCase(),
            timeout: 20000,
        };

        // @ts-ignore
        const res = await ctx.curl(host + url, options);

        // 转发 cookie
        if (res.headers['set-cookie']) {
            const cookies = setCookieParser.parse(res, {
                decodeValues: false,
                map: true,
            });
            cookies.forEach((item) => {
                ctx.cookies.set(item.name, item.value, {
                    signed: false,
                });
            });
        }

        return res;
    }
}
