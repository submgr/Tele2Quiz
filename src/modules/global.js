var apiserver_hostname;

function isLocalHost(url) {
  return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1 || url.indexOf('192.') !== -1;
}

if(isLocalHost(window.location.hostname)){
  apiserver_hostname = "https://dev11.deqstudio.com/api/";
}else{
  apiserver_hostname = "https://dev11.deqstudio.com/api/";
}


const data = {
  api: {
    hostname: apiserver_hostname
  }
}

export default data;