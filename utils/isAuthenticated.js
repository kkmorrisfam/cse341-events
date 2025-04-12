function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// function isAuthenticated(req, res, next) {
//   if (req.session.user === undefined) {
//     return res.status(401).json("You do not have access");
//   }
//   next();
// };

module.exports = isAuthenticated;
