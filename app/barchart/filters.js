'use strict';

// used courtesy of https://gist.github.com/jeffjohnson9046/9470800

var filterApp = angular.module('barchartFilters', [])

filterApp.filter('percentage', ['$filter', function ($filter) {
  return function (input) {
    return $filter('number')(input * 100, 0) + '%';
  };
}]);
