'use strict'

angular.module('gzzApp.experimentation', [
    'ngRoute',
    'experimentControllers'
    ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sandbox', {
    templateUrl: 'experimentation/experimentation.html',
    controller: 'ExperimentController',
  });
}])