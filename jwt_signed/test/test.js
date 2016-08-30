var assert = require('assert');
var request = require('request');

var pathname = window.location.pathname
var splits = pathname.split('/')
//expected /v1/o/:orgname/e/:env/samples/:sample/test.html
var org = splits[3]
var env = splits[5]
var sample = splits[7]

getTestData(org,env,sample,function(data){
  //i don have any data for this proxy
})

var create_url = 'http://' + org + '-' + env + '.apigee.net/jwt_signed/create-hs256'
var verify_url = 'http://' + org + '-' + env + '.apigee.net/jwt_signed/validate-hs256'

describe('Running tests for JWT', function() {
  var jwt=''
    it('get a jwt token', function(done) {
      request({
      	url: create_url,
      	method:'POST',
      	body:'key=12345678912345678912345678912345',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        }
      } , function(err, response,body){
           console.log(body)
           jwt=JSON.parse(body).jwt
      	   assert.equal(response.statusCode,200)
           assert(body)
           done()
      })
    })

    it('verify the generated jwt', function(done){
      request({
        url: verify_url,
        method:'POST',
        body:'key=12345678912345678912345678912345&jwt='+jwt,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        }
      } , function(err, response,body){
           console.log(body)
           assert.equal(response.statusCode,200)
           assert(body)
           done()
      })
    })
})

