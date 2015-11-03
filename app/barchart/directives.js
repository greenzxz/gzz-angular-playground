'use strict';

var barchart_directive = angular.module('barchartDirecive', []);

barchart_directive.directive("barchart", function () {
    return {
        restrict: 'A',
        templateUrl: 'barchart/partials/progress.html',
        scope: {
            expected: '@',
            actual: '@',
            actualpercentagetext: '@'
        },
        link: function (scope, element, attrs) {
            
            var expectedInner = 84,
                expectedOuter = 87,
                actualInner = 90,
                actualOuter = 100;            
            
            var canvas = d3.select('.chart').append('svg')
                .attr('width', 400)
                .attr('height', 400);
                
            var group = canvas.append('g')
                .attr('transform', 'translate(150, 150)')
            
            var percentageText = group.append('text')
                .attr('transform', 'translate(-20, -20)')
            
            percentageText.append('tspan')
                .attr('class', 'progressPercentage')
                .attr('x', 0)
                .attr('y', 0)
                .text(attrs.actualpercentagetext)
                
            percentageText.append('tspan')
                .attr('class', 'progressText')
                .attr('x', 0)
                .attr('y', 20)
                .text('Progress')
                
            var genericArc = d3.svg.arc()
                .innerRadius(function(d, i) { return d.inner; })
                .outerRadius(function(d, i) { return d.outer; })
                .startAngle(0)
                .endAngle(function(d) { return (d.value * 2 * Math.PI); });
            
            scope.$watchGroup(['actual', 'expected'], function(newValues, oldValues, scope) {
                if (newValues[0] != oldValues[0] || newValues[1] != oldValues[1]) {
                    drawProgressBar(newValues[0], newValues[1]);
                    var actualProgressText = d3.select('.progressPercentage')
                        .text(attrs.actualpercentagetext)
                }
            });
            
            function getProgressColor(value) {
                if (value <= .25) {
                    return "red"
                }
                else if (value <= 0.5) {
                    return "orange"
                }
                else {
                    return "green"
                }
            }
            
            function drawProgressBar(actualValue, expectedValue) {
                var data = [
                    {inner: expectedInner, outer: expectedOuter, value: expectedValue},
                    {inner: actualInner, outer: actualOuter, value: actualValue}
                ]
                
                var progress = group.selectAll("path.progressbar").data(data)
                
                progress.enter()
                    .append('path')
                    .attr('class', 'progressbar')
                    .attr('d', genericArc)
                    .style("fill", function(d) {
                        return getProgressColor(d.value);
                    })
                    
                progress.transition()
                        .delay(150)
                        .duration(500)
                        .style("fill", function(d) {
                            return getProgressColor(d.value);
                        })
                        .attrTween('d', arcTween)
                    
                progress.exit().remove()
                
                console.log("Things should be drawn now")
            }
            
            function arcTween(d) {
                var interpolater = d3.interpolate({value: 0}, d)
                return function(t) {
                    var tmp = interpolater(t);
                    return genericArc(tmp)
                }
            }
            
            drawProgressBar(scope.actual, scope.expected)
        },
    }
});