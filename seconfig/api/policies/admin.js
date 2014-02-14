module.exports = function() {
  if (req.session.User && req.session.User.admin) {
    return ok();
  } else {
    var requireAdminError = [{name: 'requireAdminError', message: 'You must be an Admin.'}]
    req.session.flash = {
      err: requireAdminError
    }
    res.redirect('/session/new');
    return;
  }
};