module.exports = async (req, res, next) => {
  try {
    let {
      query: { page, size },
    } = req;

    if (!Number(page) || !Number(size)) {
      page = 1;
      size = 5;
    }

    req.pagination = {
      limit: size > 50 || size <= 0 ? 50 : Number(size),
      offset: page <= 0 ? 1 : (Number(page) - 1) * Number(size),
    };

    console.log('req.pagination=', req.pagination);

    next();
  } catch (err) {
    next(err);
  }
};
