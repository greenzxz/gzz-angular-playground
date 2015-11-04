'use strict'

progressDirective = angular.module 'progressChartDirective', []

progressDirective.directive 'progressChart', ->
    restrict: 'A'
    templateUrl: 'barchart/partials/progress.html'
    scope:
        expected: '@'
        actual: '@'
    link: (scope) ->
        expectedInner = 84
        expectedOuter = 87
        actualInner = 90
        actualOuter = 100
        
        canvas = d3.select '#chart_svg'
            .attr 'width',400
            .attr 'height',400
            
        group = d3.select '#chart_group'
            .attr 'transform','translate(150, 150)'
        
        percentageText = d3.select '#chart_center'
            .attr 'transform', 'translate(-20, -20)'

        d3.select '.progressPercentage'
            .attr('x', 0).attr('y', 0)
        d3.select '.progressText'
            .attr('x', 0).attr('y', 20)
        
        genericArc = d3.svg.arc()
            .innerRadius (d, i) -> return d.inner
            .outerRadius (d, i) -> return d.outer
            .startAngle(0)
            .endAngle (d) -> return d.value * 2 * Math.PI
            
        scope.$watchGroup ['actual', 'expected'], (newValues, oldValues, scope) ->
            if newValues[0] < 0 or newValues[0] > 1
                newValues[0] = 0.0
            if newValues[1] < 0 or newValues[1] > 1
                newValues[1] = 0.0
                
            if newValues[0] isnt oldValues[0] or newValues[1] isnt oldValues[0]
                drawProgressBar(newValues[0], newValues[1])
                
        getProgressColor = (value, referenceValue) ->
            if value <= 0.50 * referenceValue
                "rgb(255, 0, 0)"
            else if value <= 0.75 * referenceValue
                "rgb(255, 165, 0)"
            else
                "rgb(0, 128, 0)"
                
        drawProgressBar = (actualValue, expectedValue) ->
            data = [
                {
                    name: "expected"
                    inner: expectedInner
                    outer: expectedOuter
                    value: expectedValue
                    fill:  'LimeGreen'
                },
                {
                    name: "actual"
                    inner: actualInner
                    outer: actualOuter
                    value: actualValue
                    fill:  getProgressColor actualValue, expectedValue
                }
            ]
            
            progressBars = group.selectAll "path.progressbar"
                .data data
            
            progressBars.enter()
                .append 'path'
                .attr 'class', 'progressbar'
                .attr 'id', (d) -> d.name + "Path"
            
            progressBars.transition()
                .delay 150 # personally thinks this looks a bit better with a short delay
                .duration 500
                .style 'fill', (d) -> d.fill
                .attrTween 'd', arcTween
                
            progressBars.exit().remove()
            
        
        arcTween = (d) ->
            interpolater = d3.interpolate({value: 0}, d)
            (t) ->
                genericArc interpolater t
                
                
        drawProgressBar scope.actual, scope.expected
                    
                