const axios = require('axios');

async function request(requestInfo, method = 'get') {
  let { url, header, params, body } = requestInfo;
  if (!url) {
    alert('url is required');
    return;
  }

  let config = {
    method,
    headers: {}
  };

  if (header && typeof header === 'object') {
    config.headers = {
      ...config.headers,
      ...header
    };
  }

  if (params && typeof params === 'object') {
    url += '?' + objectToQueryString(params);
  }
  if (body) {
    config.data = body;
  }

  return new Promise((resolve, reject) => {
    axios(url, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error.message);
        }
      });
  });
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

const GET = ({ url, header, params, body }) => {
  return request({ url, header, params, body });
};

const POST = ({ url, header, params, body }) => {
  return request({ url, header, params, body }, 'post');
};

const PUT = ({ url, header, params, body }) => {
  return request({ url, header, params, body }, 'put');
};

const DELETE = ({ url, header, params, body }) => {
  return request({ url, header, params, body }, 'delete');
};

export { GET, POST, PUT, DELETE };
