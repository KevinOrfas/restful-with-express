/* jshint esversion: 6, node: true */
(function() {
  'use strict';

  var app = angular.module('gamesApp', []);

  app.controller('gamesController', function($scope, $http) {

    $http.get('http://localhost:3001/api/games')
      .then(function(response) {
        $scope.games = response.data;
        $scope.model = {};
        
        $scope.games.forEach(function(element) {
            const keys = Object.keys(element);
            // const values = Object.values(element);
            
            keys.forEach(key => {
                if( key === 'groups') {
                    $scope.games.groups = element[key];
                }

                if( key === 'description') {
                    $scope.languages = element[key];
                    $scope.languages.forEach(function(element) {
                            var elementKey = Object.keys(element);
                            var elementVal = Object.values(element);
                            let elementDescKey = elementKey.pop();
                            let elementDescVal = elementVal.pop();
                            console.log('elementDesc', elementDescKey);
                            $scope.model[elementDescKey] = elementDescVal;
                         if(elementDescKey === 'en_GB') {
                            $scope.language = elementDescKey;
                            console.log('$scope.language', true);
                        }
                    });
                }
            });         
        }, this);
        console.log('$scope.model', $scope.model);
        
      });
    
    $scope.saveGame = function(game) {
      $http.post('http://localhost:3001/api/games', game)
        .then(function(response) {
          $scope.games.push(response.data);
          
      });
    };

    $scope.editGame = function(game) {
      $http.post('http://localhost:3001/api/games/587be2b4bf06b72b3174b422', game)
        .then(function(response) {
          $scope.games.push(response.data);
          console.log(response.data);
      });
    };

  });
})();