'use strict';

/* Controllers */

var experimentControllers = angular.module('experimentControllers', [])

.factory('experimentFactory', function() {
    var factory = {};
    var customers = [
            { name: 'Dave Jones', city: 'Phoenix' },
            { name: 'Jamie Riley', city: 'Atlanta' },
            { name: 'Heedy Wahlin', city: 'Chandler' },
            { name: 'Thomas Winters', city: 'Seattle' },
        ];
    factory.getCustomers = function() {
        return customers;
    };
    return factory;
})

.controller('ExperimentController', ['$scope', 'experimentFactory',
    function($scope, experimentFactory) {
        $scope.customers = experimentFactory.getCustomers();
        
        $scope.addCustomer = function () {
            $scope.customers.push({
                name: $scope.newCustomer.name,
                city: $scope.newCustomer.city,
                });
        };
    }
]);