'use strict';

// used courtesy of https://gist.github.com/jeffjohnson9046/9470800

var filterApp = angular.module('progressChartFilters', [])

filterApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);
