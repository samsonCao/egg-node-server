'use strict';
import {Controller} from 'egg';

export default class ArticleController extends Controller {
    async render() {
        const {ctx} = this;
        const {query} = ctx.request;
        const {id, access_token} = query;

        /**
         * TODO:
         *
         *  1. 检查 token
         *  2. 检测当前用户是否点赞
         */

        try {
            const res = await ctx.service.server.request({
                url: `/api-bs/bsapphome/detail/${id}`,
                method: 'POST',
                data: {},
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });
            if (res.code === 403) {
                // token 失效
            }
            if (res.code !== 200) {
                await ctx.render('500.html');
                return;
            }

            await ctx.render('article.html', {
                title: res.data.articleTitle,
                date: res.data.releaseDate,
                banner: res.data.titlePic,
                content: res.data.articleContent,
                like: res.data.likesNumber + res.data.initLikes,
            });
        } catch (e) {
            await ctx.render('500.html');
        }
    }
}
