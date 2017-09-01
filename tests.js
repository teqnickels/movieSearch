import { assert, expect } from 'chai'
import movieSearch from './movie-search.js'
import http from 'http'
import nock from 'nock'
import body from './body'

describe('movieSearch', () => {
  'use strict'

  it('takes a search term and returns all the information associated with that search term', () => {
    expect(movieSearch).to.be.a('function')
  })

  it.only('takes a search term and returns all the information associated with that search term', () => {
    const scope = nock('http://www.imdb.com')
        .get('/find?ref_=nv_sr_fn&q=superman&s=all')
        .reply(200, body);
        console.log(scope);
    movieSearch('superman', function(movies) {
      expect(movies).to.eql(scope.interceptors[0].body)
    })
  })
})
