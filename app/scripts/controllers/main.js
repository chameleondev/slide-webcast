'use strict';

app.controller('AppCtrl',function($scope,$rootScope,$firebaseSimpleLogin,$state,$timeout){

});

app.controller('LandingCtrl',function($state,$timeout){

	$timeout(function(){
		$state.go('login');
	},5000)

});

app.controller('LoginCtrl',function($scope,$rootScope,$firebaseSimpleLogin,$state){

	

	
	var ref = new Firebase("https://blazing-heat-237.firebaseio.com/");

	$scope.authClient = new FirebaseSimpleLogin(ref, function(error, user) {
		

		console.log('state is :'+ $state.$current.name);

		 if (error) {

		    console.log('Authentication error: ', error);

		  } else if (user) {

		  	$state.go('schedule');

		    console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');

		  } else {
		  	
		    console.log("User is logged out.");

		    // $state.go('login');


		  }


	});


});


app.controller('ScheduleCtrl',function($state,$timeout){

	$('.schedule-bg').on('click',function(){
		$state.go('webcast');
	})

});




app.controller('WebcastCtrl', function ($scope,$firebase,$timeout,$templateCache,$state,$rootScope) {

	window.scope= $scope;
    
	var messagesRef = new Firebase('https://blazing-heat-237.firebaseio.com/messages');
	var navRef = new Firebase('https://blazing-heat-237.firebaseio.com/nav');



    // create an AngularFire reference to the data
  	var sync = $firebase(messagesRef);

    // download the data into a local object
	//var syncObject = sync.$asObject();

	// download the data into a local array
	$scope.messages = sync.$asArray();

	// ref.on('child_added',function(snapshot){
	// 	alert('new message!')
	// });



	// synchronize the object with a three-way data binding
	//syncObject.$bindTo($scope, 'data');

	$scope.addMessage = function(user,text) {
		$scope.messages.$add({user : user,text: text});
		$('#message').val('');
	}


	// when the template content is loaded initiate fullpage.js, as there are 4 templates we need a counter to evaluate when all 4 have been loaded
	var counter = 0;
	$scope.$on('$includeContentLoaded', function (event) {

		counter++;

		console.log('another include was loaded'+counter);

		if (counter === 4) {

			$('#fullpage').fullpage({
		        css3 : true,
		        keyboardScrolling: false,
		        normalScrollElements: true,
		        verticalCentered : false
		    });

		    $('#fullpage').fullpage.setAllowScrolling(false);



            $('.feedback-section label').on('click tap',function(){

            	$(this).parent().parent().find('label').removeClass('active');

            	$(this).addClass('active');
            });


             $(function() {
				$( "#sortable1, #sortable2" ).sortable({
					connectWith: ".sort_me"
				});
			});
		};

	});

	var navCount = 0;
	navRef.on('value',function(snapshot){ 

		if (navCount) {

			var direction = snapshot.val();

			$('fullpage').fullpage[direction]();

			$scope.activeSlide = $('.section.active').attr('id');
			$scope.$apply();
		};
		
		navCount = 1;

	});



	$scope.authClient = new FirebaseSimpleLogin(messagesRef, function(error, user) {
		

		console.log('state is :'+ $state.$current.name);

		 if (error) {

		    console.log('Authentication error: ', error);

		  } else if (user) {

		  	$state.go('webcast');

		    console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');

		    $scope.username = user.email;


		  } else {
		  	
		    console.log("User is logged out.");

		    $state.go('landing');


		  }

		 

	});



});

app.controller('NavigationCtrl',function($scope,$firebase){

	var navRef = new Firebase('https://blazing-heat-237.firebaseio.com/nav');

	var sync = $firebase(navRef);


	$('.webcastNav').on('click',function(){

		sync.$set('');

		var id = $(this).attr('id');

		sync.$set(id);

	});


	

})


