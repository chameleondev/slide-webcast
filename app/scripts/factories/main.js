app.factory("simpleLogin", function($firebaseSimpleLogin) {

  var ref = new Firebase("https://blazing-heat-237.firebaseio.com/");

  return new $firebaseSimpleLogin(ref,function(error,user){});

});