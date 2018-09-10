if(process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://will:Element7430@ds147942.mlab.com:47942/vidjotprod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}