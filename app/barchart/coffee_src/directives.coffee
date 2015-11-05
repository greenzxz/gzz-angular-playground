'use strict'

progressDirective = angular.module 'progressChartDirective', ['progressChart.widget']

progressDirective.directive 'progressChart', ['arcWidget', (arcWidget) ->
    restrict: 'A'
    template: '<div class="progress-chart" id="the-progress-chart"></div>'
    scope:
        expected: '@'
        actual: '@'
    link: (scope) ->
        expectedInner = 60
        expectedOuter = 62
        actualInner = 65
        actualOuter = 70
        
        scope.$watchGroup ['actual', 'expected'], (newValues, oldValues, scope) ->
            if newValues[0] isnt oldValues[0] or newValues[1] isnt oldValues[1]
                if newValues[0] < 0 or newValues[0] > 1
                    scope.actual = 0.0
                if newValues[1] < 0 or newValues[1] > 1
                    scope.expected = 0.0
                
                drawProgressBar(scope.actual, scope.expected)
        
        getProgressColor = (value, referenceValue) ->
            if value <= 0.50 * referenceValue
                'rgb(255, 0, 0)'
            else if value <= 0.75 * referenceValue
                'rgb(255, 165, 0)'
            else
                'rgb(0, 128, 0)'
        
        drawProgressBar = (actualValue, expectedValue) ->
            data = [
                {
                    name: 'expected'
                    inner: expectedInner
                    outer: expectedOuter
                    value: expectedValue
                    fill:  'LimeGreen'
                },
                {
                    name: 'actual'
                    inner: actualInner
                    outer: actualOuter
                    value: actualValue
                    fill:  getProgressColor actualValue, expectedValue
                }
            ]
            
            myWidget = arcWidget()
            d3.select '#the-progress-chart'
                .datum(data).call(myWidget)
        
        drawProgressBar scope.actual, scope.expected
]
