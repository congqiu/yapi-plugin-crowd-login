const axios = require('axios');

function AtlassianCrowd(options) {
  this.settings = options || {};

  if(!this.settings.url) {
    throw new Error("请输入Crowd的URL");
  }

  if(this.settings.name === undefined) {
    throw new Error("请输入认证应用的name");
  }

  if(this.settings.password === undefined) {
    throw new Error("请输入认证应用的password");
  }

  this.authentication = async function (username, password) {
    let opts = {
      url: this.settings.url + '/rest/usermanagement/1/authentication?username=' + username,
      method: "post",
      data: JSON.stringify({
        "value": password
      }),
      auth: {
        username: this.settings.name,
        password: this.settings.password
      },
      headers: {
        "Accept": "application/json",
        'content-type': "application/json"
      }
    };
  
    return await axios.request(opts).then(function(response) {
      let data = response.data;
      if(data && data.active) {
        return {
          username: data.name,
          email: data.email
        };
      }
    });
  }
}

module.exports = AtlassianCrowd;