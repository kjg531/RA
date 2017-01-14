module.exports = {
  update(cb) {
    let request = $.ajax({
      url: '/api/users/me',
      type: 'GET',
    });

    request.done((data, textStatus) => {
      data.authenticated = true;
      localStorage.setItem('user', JSON.stringify(data));

      if (cb) {
        cb();
      }
    });

    request.fail((jqXHR, textStatus) => {
      let user = {authenticated: false};
      localStorage.setItem('user', JSON.stringify(user));

      if (cb) {
        cb();
      }
    });
  },

  user() {
    return JSON.parse(localStorage.getItem('user') || '{"authenticated": false}');
  },
};
