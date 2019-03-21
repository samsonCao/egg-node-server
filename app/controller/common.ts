import {Controller} from 'egg';
import * as fs from 'mz/fs';
import * as uuidv1 from 'uuid/v1';

interface UploadListItem {
    uuid: string;
    name: string;
    ext: string;
    url: string;
}

interface UploadList extends Array<UploadListItem> {
}

function getFileExt(filename: string): string {
    const ext = filename.split('.').pop();
    return ext || '';
}

export default class CommonController extends Controller {
    /**
     * 接口转发
     */
    async forward() {
        const {ctx} = this;
        const {
            url,
            method,
            headers,
            body,
        } = ctx.request;
        const {host} = ctx.app.config;

        const params = {
            url,
            method,
            headers,
            data: body,
        };

        // @ts-ignore
        const response = await ctx.curl(host + url, params);

        ctx.status = response.status;
        ctx.set('Content-Type', response.headers['content-type']);

        const disposition = response.headers['content-disposition'];
        if (disposition) {
            ctx.set('Content-Disposition', disposition);
        }
        ctx.response.body = response.data;
    }

    /**
     * 图片上传接口, 支持图片、pdf、zip等格式
     *
     * 文档地址 https://eggjs.org/zh-cn/basics/controller.html
     */
    async upload() {
        const {ctx} = this;
        let {folder} = ctx.request.query;
        const {ossFolders} = ctx.app.config;

        if (!ossFolders.includes(folder)) {
            folder = 'OTHERS';
        }

        // 批量上传
        // TODO: 压缩后再上传, https://github.com/lovell/sharp @liuzhiyuan
        const result: UploadList = [];
        let err;

        // @ts-ignore
        for (const file of ctx.request.files) {
            const uuid: string = uuidv1();
            const ext: string = getFileExt(file.filename);
            const name: string = `${uuid}.${ext}`;

            let res;
            try {
                res = await ctx.oss.put(`${folder}/${name}`, file.filepath);
                result.push({
                    uuid,
                    name: file.filename,
                    ext,
                    url: res.url,
                });
            } catch (e) {
                err = e;
                break;
            } finally {
                await fs.unlink(file.filepath);
            }
        }

        if (err) {
            ctx.body = {
                code: 500,
                message: '服务器错误, 请重试',
            };
        } else {
            ctx.body = {
                code: 200,
                errno: 0,
                message: 'SUCCESS',
                data: result,
            };
        }

        ctx.status = 200;
    }
}
