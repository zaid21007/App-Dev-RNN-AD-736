exports.handleRouteErrors = function handleRouteErrors(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res);
    } catch (error) {
      console.error(error)
      next(error);
    }
  }
}