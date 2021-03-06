const AtlassianCrowd = require('./crowd');

module.exports = function (options) {
  let crowd = new AtlassianCrowd(options);

  this.bindHook('third_login', async (ctx) => {
    let { username, password } = ctx.request.body;
    return await crowd.authentication(username, password);
  });
}