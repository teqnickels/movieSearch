import { assert, expect } from 'chai'
import movieSearch from './movie-search.js'
import http from 'http'
import nock from 'nock'

describe('movieSearch', () => {
  'use strict'

  it('takes a search term and returns all the information associated with that search term', () => {
    expect(movieSearch).to.be.a('function')
  })

  it('takes a search term and returns all the information associated with that search term', () => {
    var body = `
     Superman (Superman (1978))
     superman (11 titles)
     Supermarché [us] (Production)
     Superman (1978)
     Lois & Clark: The New Adventures of Superman (1993) (TV Series)
     Adventures of Superman (1952) (TV Series)
     Sam Horrigan (Actor, Accepted (2006)) nickname "Superman"
     Shaquille O'Neal (Self, After the Sunset (2004)) nickname "Superman"
     Joey Fatone (Self, Family Feud (1999)) nickname "Superman"`

    const scope = nock('http://www.imdb.com')
        .get('/find?ref_=nv_sr_fn&q=superman&s=all')
        .reply(200, body);
    movieSearch('superman', function(movies) {
      expect(movies).to.eql(scope.interceptors[0].body)
    })
  })
})
