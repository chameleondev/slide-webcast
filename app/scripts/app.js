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


	$urlRouterProvider.otherwise('/webcast');

	 $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================

        .state('landing', {
            url: '/landing',
            templateUrl: 'views/partial-landing.html',
            controller : 'LandingCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'views/partial-login.html',
            controller : 'LoginCtrl'
        })

        .state('schedule', {
            url: '/schedule',
            templateUrl: 'views/partial-schedule.html',
            controller : 'ScheduleCtrl'
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