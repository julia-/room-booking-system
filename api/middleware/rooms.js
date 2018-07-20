const roomsLogger = (req, res, next) => {
  console.log(req.body);
  next();
};

module.exports = {
  roomsLogger,
};
