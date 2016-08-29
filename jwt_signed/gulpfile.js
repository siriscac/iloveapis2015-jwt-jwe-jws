var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var PROXY_NAME = 'apigee-sample-jwt'
var CACHE_RESOURCE_NAME = 'cache1'

gulp.task('default', function() {
  // place code for your default task here
});

var opts = {
    organization: gutil.env.org,
    token: gutil.env.token,
    environments: gutil.env.env,    
    environment: gutil.env.env    
}

gulp.task('deploy',function(){
	opts.api = PROXY_NAME
	opts.cache = CACHE_RESOURCE_NAME
	var sdk = apigeetool.getPromiseSDK()
	return sdk
			.createcache(opts)
			.then(function(){
				return sdk.deployProxy(opts)
			},function(err){
				console.log(err)
			})

})
