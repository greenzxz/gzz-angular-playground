'use strict';

var barchart_directive = angular.module('barchartDirecive', []);

barchart_directive.directive("barchart", function () {
    return {
        restrict: 'A',
        templateUrl: 'barchart/partials/progress.html',
        scope: {
            expected: '@',
            actual: '@',
        },
        link: function (scope, element, attrs) {
            
            var expectedInner = 84,
                expectedOuter = 87,
                actualInner = 90,
                actualOuter = 100;            
            
            var canvas = d3.select('#chart_svg')
                .attr('width', 400)
                .attr('height', 400);
                
            var group = d3.select('#chart_group')
                .attr('transform', 'translate(150, 150)')
            
            var percentageText = d3.select('#chart_center')
                .attr('transform', 'translate(-20, -20)')
                
            d3.select('.progressPercentage')
                .attr('y', 0)
            
            d3.select('.progressText')
                .attr('x', 0)
                .attr('y', 20)
                            
            var genericArc = d3.svg.arc()
                .innerRadius(function(d, i) { return d.inner; })
                .outerRadius(function(d, i) { return d.outer; })
                .startAngle(0)
                .endAngle(function(d) { return (d.value * 2 * Math.PI); });
            
            scope.$watchGroup(['actual', 'expected'], function(newValues, oldValues, scope) {
                if (newValues[0] != oldValues[0] || newValues[1] != oldValues[1]) {
                    drawProgressBar(newValues[0], newValues[1]);
                }
            });
            
            function getProgressColor(actualValue, referenceValue) {
                if (actualValue <= 0.50 * referenceValue) {
                    return "red"
                }
                else if (actualValue <= 0.75 * referenceValue) {
                    return "orange"
                }
                else {
                    return "green"
                }
            }
            
            function drawProgressBar(actualValue, expectedValue) {
                var data = [
                    {inner: expectedInner, outer: expectedOuter, value: expectedValue, name: 'expected'},
                    {inner: actualInner, outer: actualOuter, value: actualValue, name: 'actual'}
                ]
                
                var progress = group.selectAll("path.progressbar").data(data)
                
                progress.enter()
                    .append('path')
                    .attr('class', 'progressbar')
                    .attr('id', function(d) { return d.name+"Path"; })
                    .attr('d', genericArc)
                    .style("fill", function(d, i) {
                        if (d.name == 'expected') {
                            // inner line, so nothing super interesting
                            return "LimeGreen"
                        }
                        else {
                            return getProgressColor(actualValue, expectedValue);
                        }
                    })
                    
                progress.transition()
                        .delay(150)
                        .duration(500)
                        .style("fill", function(d, i) {
                            if (d.name == 'expected') {
                                // inner line, so nothing super interest
                                return "LimeGreen"
                            }
                            else {
                                return getProgressColor(actualValue, expectedValue);
                            }
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