'use strict'

progressDirective = angular.module 'progressChartDirective', []

progressDirective.directive 'progressChart', ->
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
        
        canvas = d3.select '#the-progress-chart'
        
        svg = canvas.append 'svg'
            .attr 'id', 'chart_svg'
            .attr 'width',400
            .attr 'height',400
            
        group = svg.append 'g'
            .attr 'id', 'chart_group'
            .attr 'transform','translate(150, 150)'
        
        percentageTextGroup = group.append 'text'
            .attr 'id', 'chart_center'
            .attr 'transform', 'translate(-35, -12)'

        percentageTextGroup.append 'tspan'
            .attr 'id', 'progressPercentage'
            .attr 'dx', 0
            .attr 'dy', 0
            .style 'font', '28px sans-serif'
        
        percentageTextGroup.append 'tspan'
            .attr 'id', 'progressText'
            .attr 'x', 0
            .attr 'dy', 20
            .text 'Progress'
        
        genericArc = d3.svg.arc()
            .innerRadius (d, i) -> return d.inner
            .outerRadius (d, i) -> return d.outer
            .startAngle(0)
            .endAngle (d) -> return d.value * 2 * Math.PI
            
        scope.$watchGroup ['actual', 'expected'], (newValues, oldValues, scope) ->
            if newValues[0] isnt oldValues[0] or newValues[1] isnt oldValues[1]
                if newValues[0] < 0 or newValues[0] > 1
                    scope.actual = 0.0
                if newValues[1] < 0 or newValues[1] > 1
                    scope.expected = 0.0
                
                drawProgressBar(scope.actual, scope.expected)
                
                
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
            
            d3.select '#progressPercentage'
                .text d3.format('#.0%')(actualValue)
            
        
        arcTween = (d) ->
            interpolater = d3.interpolate({value: 0}, d)
            (t) ->
                genericArc interpolater t
                
                
        drawProgressBar scope.actual, scope.expected
                    
                