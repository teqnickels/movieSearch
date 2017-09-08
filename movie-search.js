const rp = require('request-promise');
const cheerio = require('cheerio')
var cheerioTableparser = require('cheerio-tableparser');
const http = require('http')
var searchTerm = process.argv[2]
const fs = ('fs')


var search = (term, callback) => {
  var target = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${term}&s=all`
  http.get(target, (response) => {
    var body = ''
    response.on('data', (chunk) => {
      body += chunk.toString()
    })
    response.on('end', () => {
      $ = cheerio.load(body)
      cheerioTableparser($); //think this adds a prototype to $, .parsetable
      var data = $('.findList').parsetable();
      var newArr = data.reduce(( acc, cur ) => acc.concat(cur),[]);
      newArr = newArr.map( (movie) => $(movie).text())
      newArr = newArr.reduce( (a, b) => {
        if (b.length <= 2) {
          return a
        } else {
          return a.concat(b)
        }
      }, [])
      callback(format(newArr))
    })
    response.on('error', (err) => {
      console.log(err);
    })
  })
}

var format = (array) => {
  let str = ''
  for (var i = 0; i < array.length; i++) {
    str += array[i] + '\n'
  }
  return str
}

if(require.main === module) {
  search(searchTerm, () => {})
}

module.exports = search
