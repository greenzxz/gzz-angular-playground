app = angular.module 'progressChartControllers', []

app.factory('progressChartFactory', ()->
    values = {
        expected: 0.5,
        actual: 0.8
    }
)

app.controller 'ProgressInputController', ['$scope', 'progressChartFactory',
    ($scope, progressChartFactory) ->
        $scope.init = ->
            $scope.expectedPercentageInput = progressChartFactory.expected
            $scope.actualPercentageInput = progressChartFactory.actual
            
            $scope.validateNums()
            
        $scope.validateNums = ->
            decimalRE = /^(0|1|(0?\.\d+))$/
            
            if decimalRE.test($scope.expectedPercentageInput) and decimalRE.test($scope.actualPercentageInput)
                $scope.expected = Number($scope.expectedPercentageInput)
                $scope.actual = Number($scope.actualPercentageInput)
        
        $scope.init()
    ]