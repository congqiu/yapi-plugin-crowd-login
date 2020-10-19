const axios = require('axios');
const yapi = require('yapi.js');

function AtlassianCrowd(options) {
  this.settings = {};

  this.settings.url = process.env.CROWD_URL || options.url;
  if(!this.settings.url) {
    yapi.commons.log("请输入Crowd的URL", 'error');
  }

  this.settings.name = process.env.CROWD_NAME || options.name;
  if(this.settings.name === undefined) {
    yapi.commons.log("请输入认证应用的name", 'error');
  }

  this.settings.password = process.env.CROWD_PASSWORD;
  if(this.settings.password === undefined) {
    yapi.commons.log("请输入认证应用的password", 'error');
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