const AtlassianCrowd = require('./crowd');

module.exports = function (options) {
  var crowd = new AtlassianCrowd(options);
  this.bindHook('third_login', async (ctx) => {
    let { username, password } = ctx.request.query;
    return await crowd.authentication(username, password);
  });
}