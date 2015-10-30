'use strict';

// Declare app level module which depends on views, and components
angular.module('gzzApp', [
  'ngRoute',
  'gzzApp.experimentation',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/sandbox'});
}]);
