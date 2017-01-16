/* jshint esversion: 6, node: true */
(function() {
  'use strict';

  var app = angular.module('gamesApp', []);
  
  app.constant('ENDPOINT_URI', 'http://localhost:3001/api/');
  

  app.service('GamesModel', function ($http, ENDPOINT_URI) {
    var service = this,
    path = 'games/';
    function getUrl() {
      return ENDPOINT_URI + path;
    }
    service.all = function () {
      return $http.get(getUrl());
    };

    service.create = function (item) {
        return $http.post(getUrl(), item);
      };

      function getUrlForId(itemId) {
        return getUrl(path) + itemId;
      }
      service.update = function (itemId, item) {
        return $http.put(getUrlForId(itemId), item);
      };
  });
  

  app.controller('gamesController', function($scope, $http, GamesModel) { 
    var main = this;
    function getGames() {
      GamesModel.all()
        .then(function (result) {
          main.games = result.data;
        });
    }

    main.games = [];
    main.getGames = getGames;

    getGames();

    function createGame(game) {
      GamesModel.create(game)
        .then(function (result) {});
    }
    
    main.newItem = { name: '', status: '', environment: '' };
    main.createGame = createGame;


    


    // $http.get('http://localhost:3001/api/games')
    //   .then(function(response) {
    //     $scope.games = response.data;
        
        
    //     $scope.games.forEach(function(element) {
    //         const keys = Object.keys(element);
            
    //         keys.forEach(key => {
    //             if( key === 'groups') {
    //                 $scope.games.groups = element[key];
    //             }

    //             if( key === 'description') {
    //                 $scope.languages = element[key];
                   
    //                 $scope.languages.forEach(function(element) {
    //                     let getKey =  Object.keys(element).pop();
    //                      if(getKey === 'en_GB') {
    //                         $scope.desc = Object.values(element).pop();
    //                     } else if (getKey === 'fr_FR') { 
    //                         $scope.desc = Object.values(element).pop();
    //                     } else {
    //                       $scope.desc = Object.values(element).pop();
    //                     }
    //                 });
    //             }
                
    //         });         
    //     }, this);

        
    //   });
    
    $scope.saveGame = function(game) {
      $http.post('http://localhost:3001/api/games', game)
        .then(function(response) {
          main.games.push(response.data);
          
      });
    };

    $scope.editGame = function(game) {
      $http.delete('http://localhost:3001/api/games/'+1, game)
        .then(function(response) {
          $scope.games.push(response.data);
          
      });
    };

  });
})();