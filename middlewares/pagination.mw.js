module.exports = async (req, res, next) => {
  try {
    const {
      query: { page, size },
    } = req;

    req.pagination = {
      limit: Number(size) && size > 0 && size < 50 ? Number(size) : 10,
      offset: Number(page) && page > 0 ? (Number(page) - 1) * Number(size) : 1,
    };

    next();
  } catch (err) {
    next(err);
  }
};
