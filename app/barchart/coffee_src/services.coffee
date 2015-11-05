'use strict'

progressChartWidget = angular.module('progressChart.widget', [])
    .factory 'arcWidget', () ->
        () ->
            (selection) ->
                genericArc = d3.svg.arc()
                    .innerRadius (d, i) -> d.inner
                    .outerRadius (d, i) -> d.outer
                    .startAngle 0
                    .endAngle (d, i) -> d.value * 2 * Math.PI
                    
                arcTween = (d) ->
                    interpolater = d3.interpolate({value: 0}, d)
                    (t) ->
                        genericArc interpolater t
                
                selection.each (data, index) ->
                    d3.select(this).selectAll('svg').remove()  # clears the canvas of all outdated items
                    
                    container   = d3.select(this).selectAll('svg.progressContainer').data([data])

                    chartContainer = container.enter().append('svg').attr('class', 'progressContainer')
                    widgetGroup    = container.append('g').attr('class', 'widgetContainer')
                    
                    if chartContainer.empty()
                        chartContainer = d3.select(this).selectAll('svg.progressContainer');
                        widgetGroup = chartContainer.selectAll('g.widgetContainer');
                    
                    chartContainer.attr('width', 400)
                    chartContainer.attr('height', 400)
                    
                    widgetGroup.attr('transform', 'translate(150, 150)')
                    
                    percentageTextGroup = widgetGroup.append('text')
                        .attr('transform', 'translate(-30, -10)')
                    
                    percentageTextGroup.append 'tspan'
                        .attr 'id', 'progress-percentage'
                        .attr 'dx', 0
                        .attr 'dy', 0
                        .style 'font', '28px sans-serif'
                        
                    d3.select '#progress-percentage'
                        .text d3.format('0f')(d.value*100) for d in data when d.name is 'actual'
                        
                    percentageMark = percentageTextGroup.append 'tspan'
                        .attr 'id', 'progress-percentage-mark'
                        .style 'font', '16px sans-serif'
                        .text '%'
                    
                    percentageTextGroup.append 'tspan'
                        .attr 'id', 'progress-text'
                        .attr 'x', -2
                        .attr 'y', 20
                        .text 'Progress'
                        .style 'font', '16px serif'
                        
                    progressArcs = widgetGroup.selectAll('path.progressArc').data(data)
                    
                    progressArcs.enter()
                        .append('path')
                        .attr 'class', 'progressArc'
                        .attr 'id', (d) -> d.name + '-path'
                        
                    progressArcs.transition()
                        .delay 150 # personally thinks this looks a bit better with a short delay
                        .duration 500
                        .style 'fill', (d) -> d.fill
                        .attrTween 'd', arcTween
                    
                    progressArcs.exit().remove()
