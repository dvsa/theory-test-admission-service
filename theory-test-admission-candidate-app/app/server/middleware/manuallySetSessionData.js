export default (req, res, key, value) => {
	req.session.data[key] = value;
	res.locals.data[key] = value;
};
