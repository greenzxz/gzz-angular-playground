'use strict';

var barchart_directive = angular.module('barchartDirecive', []);

barchart_directive.directive("barchart", function () {
    return {
        restrict: 'A',
        template: '<span id="theChart">You are at <span class="percentageDisplay">{{ actual | percentage }}</span> out of <span id="debugOutput">{{ expected }}</span>.',
        scope: {
            expected: '@',
            actual: '@'
        }
    }
});