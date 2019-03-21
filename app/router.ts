import {Application} from 'egg';

export default (app: Application) => {
    const {router, controller} = app;
    const forward = controller.common.forward;
    const methods = ['get', 'post', 'put', 'delete'];
    const prefixs = [
        '/api-xxx1',
        '/api-xxx2',
        '/api-xxx3'
    ];

    /**
     * 转发java服务
     */
    prefixs.forEach((prefix) => {
        methods.forEach((method) => {
            const re = new RegExp(`^\\${prefix}.*`);
            router[method](re, forward);
        });
    });

    const env = app.config.env;
    // 发版页面
    if (env === 'building') {
        router.get('/', 'op.index.building');
    } else {
        router.get('/', 'op.index.render');
    }

    /**
     * 静态页面
     */
    router.get('/bc/article.html', 'bc.article.render');
    router.get('/bc/privacy.html', 'bc.privacy.render');
    router.get('/bc/agreement.html', 'bc.agreement.render');
    router.get('/op/websocket.html', 'op.websocket.render');
    router.get('/op/browser.html', 'op.browser.render');
    router.get('/download.html', 'op.download.render');

    /**
     * 前端服务
     */
    router.get('/api-node/check_health', 'op.index.checkHealth');
    router.post('/api-node/login', 'op.auth.getToken');
    router.post('/api-node/upload', 'common.upload');
};
