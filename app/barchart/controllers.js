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
            var decimalRE = /^\d+(\.\d+)?$/;
            
            if (decimalRE.test($scope.expectedPercentageInput) && decimalRE.test($scope.actualPercentageInput)) {
                if ($scope.expectedPercentageInput < 0.0 || $scope.expectedPercentageInput > 1.0 ||
                    $scope.actualPercentageInput < 0.0 || $scope.actualPercentageInput > 1.0) {
                    // some warning that values are not valid?
                }
                else {
                    $scope.expected = round($scope.expectedPercentageInput, 2);
                    $scope.actual = round($scope.actualPercentageInput, 2);
                }
            }
        }
        
        $scope.init()
    }
]);

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}