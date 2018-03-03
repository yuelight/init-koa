module.exports = class IndexController {
	constructor(router) {
		Object.assign(this, {
			router
		});

		this.routes();
	}

	routes() {
		this.router.get('/', this.r_index);
		this.router.get('/string', this.r_string);
		this.router.get('/json', this.r_json);
	}

	async r_index(ctx, next) {
		await ctx.render('index', {
			title: 'Hello Koa 2!'
		});
	}

	async r_string(ctx, next) {
		ctx.body = 'koa2 string';
	}

	async r_json(ctx, next) {
		ctx.body = {
			title: 'koa2 json'
		};
	}
};
