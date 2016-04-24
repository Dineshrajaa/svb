// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-datepicker', 'ionic-timepicker', 'ionic-timepicker', 'ngStorage'])

.run(function($ionicPlatform, $rootScope, $http) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    $rootScope.teams = [{ id: 1, name: 'team1' }, { id: 2, name: 'team2' }];
    $rootScope.getTeams = function() {

        var data = {};
        console.log(api_baseurl);
        $http.post(api_baseurl + "getTeams.php", data).success(function(response) {
            if (response.status) {
                $rootScope.teams = response.data;
            }
        }).error(function(response) {
            console.log(response);
        });
    }();
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'templates/tab-home.html'
        })
        .state('newgame', {
            url: '/newgame',
            templateUrl: 'templates/tab-newgame.html',
            controller: 'appCtrl'
        })
        .state('creategame', {
            url: '/creategame',
            templateUrl: 'templates/tab-create-game.html',
            controller: 'appCtrl'
        })
        // match score state
        .state('matchscore',{
          url:'/matchscore',
          templateUrl:'templates/match-score.html',
          controller:'matchscore'
        })
        // match summary state
        .state('matchsummary',{
          url:'/matchsummary',
          templateUrl:'templates/match-summary.html',
          controller:'matchsummary'
        })
        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tab-home.html'
        })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/tab-home.html',
                    controller: 'DashCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});
