angular.module('starter.controllers', ['ngStorage'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('appCtrl', function($scope, $rootScope, $stateParams, $ionicPopup, ionicDatePicker, ionicTimePicker, $localStorage, $location) {
        $scope.game = {};
        $scope.playersteam1 = [{ "name": "p11" }, { "name": "p12" }, { "name": "p13" }, { "name": "p14" }, { "name": "p15" }, { "name": "p16" }, { "name": "p17" }];
        $scope.playersteam2 = [{ "name": "p21" }, { "name": "p22" }, { "name": "p23" }, { "name": "p24" }, { "name": "p25" }, { "name": "p26" }, { "name": "p27" }];
        $scope.tConvert = function(time) {
            // Check correct time format and split into components
            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (time.length > 1) { // If time format correct
                time = time.slice(1); // Remove full string match value
                time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
                time[0] = +time[0] % 12 || 12; // Adjust hours
            }
            return time.join(''); // return adjusted time or original string
        }
        var ipObj1 = {
            callback: function(val) { //Mandatory
                var dateObj = new Date(val);
                $scope.game.date = dateObj.getFullYear() + '-' + ("0" + (dateObj.getMonth() + 1)).slice(-2) + '-' + ("0" + (dateObj.getDate())).slice(-2);
            },
            inputDate: new Date(),
            setLabel: 'Set',
            todayLabel: 'Today',
            closeLabel: 'Close',
            mondayFirst: false,
            weeksList: ["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            templateType: 'popup',
            showTodayButton: true,
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: false,
            disableWeekdays: [6],
            from: new Date(), //Optional
        };

        $scope.openDatePicker = function() {
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.openTimePicker1 = function() {
            var ipObj1 = {
                callback: function(val) {
                    if (typeof(val) === 'undefined') {
                        console.log('Time not selected');
                    } else {
                        var selectedTime = new Date(val * 1000);
                        var timestring = ("0" + selectedTime.getUTCHours()).slice(-2) + ':' + ("0" + selectedTime.getUTCMinutes()).slice(-2);
                        $scope.game.time = $scope.tConvert(timestring);
                        console.log($scope.gameTime);
                    }
                },
                inputTime: 50400,
                format: 12,
                setLabel: 'Set'
            };
            ionicTimePicker.openTimePicker(ipObj1);
        };


        $scope.createSchedule = function() {
            console.log($scope.game);
            $localStorage.gamedate = $scope.game.date;
            $localStorage.gametime = $scope.game.time;
            $localStorage.gameteam1 = $scope.game.team1;
            $localStorage.gameteam2 = $scope.game.team2;
            $location.path("/creategame");
        };

        $scope.showAddPlayerPopup = function() {
            $scope.data = {}

            // Custom popup
            var addPlayerPopup = $ionicPopup.show({
                template: '<input type = "text" ng-model = "data.aFirstName" placeholder="First name"><input type = "text" ng-model = "data.aLastName" placeholder="Last name">',
                title: 'Add Player',
                subTitle: 'Player details',
                scope: $scope,

                buttons: [{
                    text: '<b>Add</b>',
                    type: 'button-dark',
                    onTap: function(e) {

                        if (!$scope.data.aFirstName) {
                            //don't allow the user to close unless he enters model...
                            e.preventDefault();
                        } else {
                            return $scope.data;
                        }
                    }
                }]
            });

            addPlayerPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.showEditPlayerPopup = function(item) {
            console.warn(item);
            $scope.data = {}
            $scope.data.eFirstName = item.name;
            var editPlayerPopup = $ionicPopup.show({
                template: '<input type = "text" ng-model = "data.eFirstName" placeholder="First name"><input type = "text" ng-model = "data.eLastName" placeholder="Last name">',
                title: 'Edit Player',
                subTitle: 'Edit Player details',
                scope: $scope,

                buttons: [{
                    text: '<b>Update</b>',
                    type: 'button-dark',
                    onTap: function(e) {

                        if (!$scope.data.eFirstName) {
                            //don't allow the user to close unless he enters model...
                            e.preventDefault();
                        } else {
                            return $scope.data;
                        }
                    }
                }, { text: '<b>Delete</b>', type: 'button-assertive' }]
            });

            editPlayerPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.changeToScorePage = function() {
            $location.path("/matchscore");
        };
    })
    .controller('matchscore', function($scope, $localStorage, $ionicPopup) {
        $scope.team1 = $localStorage.gameteam1;
        $scope.team2 = $localStorage.gameteam2;
        console.warn("$localStorage.gameteam1:" + $localStorage.gameteam1 + "$localStorage.gameteam2:" + $localStorage.gameteam2);
        $scope.playersteam1 = [{ "name": "p11" }, { "name": "p12" }, { "name": "p13" }, { "name": "p14" }, { "name": "p15" }, { "name": "p16" }, { "name": "p17" }];
        $scope.playersteam2 = [{ "name": "p21" }, { "name": "p22" }, { "name": "p23" }, { "name": "p24" }, { "name": "p25" }, { "name": "p26" }, { "name": "p27" }];
        $scope.gameTerms = [{ "gt": "1PT" }, { "gt": "2PT" }, { "gt": "3PT" }, { "gT": "AST" }, { "gT": "STL" }, { "gT": "BLK" }, { "gT": "RBD" }, { "gT": "FL" }]
        $scope.matchScorePopup = function(message) {
            // generic popup
            var genericPopup = $ionicPopup.show({
                template: '<label>' + message + '</label>',
                title: message,
                // subTitle: 'Edit Player details',
                scope: $scope,

                buttons: [{
                    text: '<b>Y</b>',
                    type: 'button-dark',
                    onTap: function(e) {


                    }
                }, { text: '<b>N</b>', type: 'button-dark' }]
            });

            genericPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };
    })
    .controller('matchsummary', function($scope, $localStorage) {
        $scope.winnerTeam = $localStorage.gameteam1;
        $scope.runnerTeam = $localStorage.gameteam2;
        $scope.gameDate = $localStorage.gamedate;
        $scope.gameTime = $localStorage.gametime;
    });
