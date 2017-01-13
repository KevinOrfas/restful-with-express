/* jshint esversion: 6, node: true */
(function() {
  'use strict';

  var app = angular.module('gamesApp', []);

  app.controller('gamesController', function($scope, $http) {

    $http.get('http://localhost:3001/api/games')
      .then(function(response) {
        $scope.games = response.data;
        
        
        $scope.games.forEach(function(element) {
            const keys = Object.keys(element);
            
            keys.forEach(key => {
                if( key === 'groups') {
                    $scope.games.groups = element[key];
                    // console.log('Groups', $scope.games.groups);
                }

                if( key === 'description') {
                    $scope.languages = element[key];
                    console.log('Language', $scope.languages);
                   
                    $scope.languages.forEach(function(element) {
                        console.log('key', element[key]);
                         if(element[key] === 'en_GB') {
                            console.log(true);
                        }
                    });
                }
                
            });         
        }, this);

        
      });
    
    $scope.saveGame = function(game) {
      $http.post('http://localhost:3001/api/games', game)
        .then(function(response) {
          $scope.games.push(response.data);
          
      });
    };

  });
})();