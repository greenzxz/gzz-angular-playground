'use strict';


var barchartControllers = angular.module('barchartControllers', [])

.factory('barchartFactory', function() {
    var factory = {};
    var values = {
      expected: 0.5,
      actual:   0.8,
    };
    factory.getDefaults = function() {
        return values;
    };
    return factory;
})

.controller('BarchartController', ['$scope', 'barchartFactory',
    function($scope, barchartFactory) {
                
        $scope.init = function() {
            var defaults = barchartFactory.getDefaults();
            
            $scope.expectedPercentageInput = defaults['expected']
            $scope.actualPercentageInput   = defaults['actual']
            
            $scope.validateNums();
        }
                
        $scope.draw = function () {
            // not entirely sure this is necessary
        };
        
        $scope.validateNums = function() {
            // only perform any action if the inputs are numeric
            var decimalRE = /^(0|1|(0?\.\d+))$/;
            
            if (decimalRE.test($scope.expectedPercentageInput) && decimalRE.test($scope.actualPercentageInput)) {
                if ($scope.expectedPercentageInput >= 0.0 && $scope.expectedPercentageInput <= 1.0 &&
                    $scope.actualPercentageInput >= 0.0 && $scope.actualPercentageInput <= 1.0) {
                    
                    $scope.expected = Number($scope.expectedPercentageInput);
                    $scope.actual = Number($scope.actualPercentageInput);
                }
            }
        }
        
        $scope.init()
    }
]);

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}