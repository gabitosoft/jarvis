module.exports = function(req, res, ok) {
  var sessionUserMatchesId = req.session.User.id === req.param('id');
  var isAdmin = req.session.User.admin;

  if (!(sessionUserMatchesId || isAdmin)) {
    var noRightsError = [{name: 'noRights'}, {message: 'You must be an Admin'}]
    req.session.flash = {
      err: noRightsError
    }
    res.redirect('/session/new');
    return;
  }

  ok();
};