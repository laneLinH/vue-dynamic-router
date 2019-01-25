// const baseUrl='http://10.20.10.65:8086';
const baseUrl='http://10.20.10.65:8443';
module.exports={
  '/cad': {
    target: baseUrl,
    changeOrigin: true,
  }
}

