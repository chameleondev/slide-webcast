'use strict';

/**
 * @ngdoc overview
 * @name slideWebcastV2App
 * @description
 * # slideWebcastV2App
 *
 * Main module of the application.
 */
var app = angular
  .module('slideWebcastV2App', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ui.router',
    'firebase'
  ]);


app.config(function($stateProvider, $urlRouterProvider){


	// $urlRouterProvider.otherwise('/login');

	 $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: 'views/partial-login.html',
            controller : 'LoginCtrl'
        })

        
        // nested list with custom controller
        .state('webcast', {
            url: '/webcast',
            controller : 'WebcastCtrl',
            templateUrl: 'views/partial-fullscreen.html',
            onExit : function(){
                $('#fullpage').fullpage.destroy('all');
            }
        });




})