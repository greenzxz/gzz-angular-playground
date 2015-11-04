'use strict';

// app that allows user to input 2 decimal values between 0.0 and 1.0, and an output in some format.

angular.module('gzzBarchart', [
    'ngRoute',
    'progressChartControllers',
    'progressChartDirective',
    'progressChartFilters',
    ])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/barchart', {
        templateUrl: 'barchart/partials/barchart.html',
        controller: 'ProgressInputController',
    });
    $routeProvider.otherwise({redirectTo: '/barchart'});
}]);