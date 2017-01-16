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
                }

                if( key === 'description') {
                    $scope.languages = element[key];
                   
                    $scope.languages.forEach(function(element) {
                        let getKey =  Object.keys(element).pop();
                         if(getKey === 'en_GB') {
                            $scope.desc = Object.values(element).pop();
                        } else if (getKey === 'fr_FR') { 
                            $scope.desc = Object.values(element).pop();
                        } else {
                          $scope.desc = Object.values(element).pop();
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