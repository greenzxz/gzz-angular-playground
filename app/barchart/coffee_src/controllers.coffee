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
            decimalRE = /// ^ (?:
                (?:(?:0|1)(?:\.0+)?) # 0 or 1 followed by an optional decimal point and 0s
              | (?:0?(?:\.\d+))      # optional 0 followed by decimal point and one or more digits
              )$
            ///
            
            if decimalRE.test($scope.expectedPercentageInput) and decimalRE.test($scope.actualPercentageInput)
                $scope.expected = Number($scope.expectedPercentageInput)
                $scope.actual = Number($scope.actualPercentageInput)
        
        $scope.init()
    ]