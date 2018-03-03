const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const router = require('koa-router')();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const glob = require('glob');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
	enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/../public'));

app.use(views(__dirname + '/../app/views', {
	extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
(async () => {
	const ctls = await glob.sync(`${__dirname}/../app/controller/**/*.js`);
	ctls.forEach(item => {
		const ctrl = require(item);
		new ctrl(router);
	});
})();
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx);
});

module.exports = app;
