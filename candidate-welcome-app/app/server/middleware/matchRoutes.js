import path from 'path';

// Try to match a request to a template, for example a request for /test
// would look for /app/views/test.html
// or /app/views/text/index.html
export default (req, res) => {
	const localPath = (req.params[0]);
	res.render(localPath, (err, htmlRender) => {
		if (err) {
			res.render(`${path}/index`, (err2, htmlRendering) => {
				if (err2) {
					res.locals.statusCode = 404;
					res.status(404).render('error');
				} else {
					res.end(htmlRendering);
				}
			});
		} else {
			res.setHeader('content-type', 'text/html');
			res.end(htmlRender);
		}
	});
};
