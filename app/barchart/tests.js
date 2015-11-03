'use strict';

describe('Barchart Module', function() {
  var ctrl, scope;
  
  beforeEach(module('gzzBarchart'));
  beforeEach(function () {
    jasmine.addMatchers( {
        toBeBetweenTwoValuesInclusive: function () {
            return {
                compare: function (actual, expectedLow, expectedHigh) {
                    var result = {};
                    var bound_str = "["  + expectedLow + "," + expectedHigh + "]"
                    result.pass = actual >= expectedLow && actual <= expectedHigh;
                    if (result.pass) {
                        result.message = "Expected " + actual + " to be outside bounds of " + bound_str
                    }
                    else {
                        result.message = "Expected " + actual + " to be within bounds of " + bound_str
                    }
                    return result;
                }
            };
        },
    });
  });

  describe('Barchart controller', function(){
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('BarchartController', {$scope: scope});
    }));
    
    it('Barchart should have default values between 0.0 and 1.0', inject(function() {
        expect(scope.expected).toBeBetweenTwoValuesInclusive(0.0, 1.0);
        expect(scope.actual).toBeBetweenTwoValuesInclusive(0.0, 1.0);
    }));
    
    // maybe come up with a way to confirm that only decimals can be inserted into the HTML, but that's not really
    //   a controller thing at this time.
    
    it('Barchart validation will set the expected values if passed valid input (no rounding)', inject(function() {
        scope.expected = 0.1;
        scope.actual = 0.1;
        
        scope.expectedPercentageInput = "0.5";
        scope.actualPercentageInput = "0.6";
        scope.validateNums();
        
        expect(scope.expected).toBe(0.5);
        expect(scope.actual).toBe(0.6);
    }));
        
    it('Barchart validation should fail with empty string.', inject(function() {
        scope.expected = 0.2;
        scope.actual = 0.2;
        
        scope.expectedPercentageInput = "";
        scope.actualPercentageInput = "";
        scope.validateNums();
        
        expect(scope.expected).toBe(0.2);
        expect(scope.actual).toBe(0.2);
    }));
    
    it('Barchart validation should accept 0 and 1.', inject(function() {
        scope.expected = 0.1;
        scope.actual = 0.1;
        
        scope.expectedPercentageInput = "0";
        scope.actualPercentageInput = "1";
        scope.validateNums();
        
        expect(scope.expected).toBe(0);
        expect(scope.actual).toBe(1);
    }))
    
    
    it('Barchart validation should accept with and without leading zero.', inject(function() {
        scope.expected = 0.1;
        scope.actual = 0.1;
        
        scope.expectedPercentageInput = "0.5";
        scope.actualPercentageInput = ".5";
        scope.validateNums();
        
        expect(scope.expected).toBe(.5);
        expect(scope.actual).toBe(.5);
    }))
    
    
    it('Barchart validation should not accept bad decimal usage.', inject(function() {
        scope.expected = 0.1;
        scope.actual = 0.1;
        
        scope.expectedPercentageInput = "0.5.2";
        scope.actualPercentageInput = "0.";
        scope.validateNums();
        
        expect(scope.expected).toBe(.1);
        expect(scope.actual).toBe(.1);
    }))
    
    it('Barchart validation should fail with string inputs.', inject(function() {
        scope.expected = 0.2;
        scope.actual = 0.2;
        
        scope.expectedPercentageInput = "something 23423 not a number"
        scope.actualPercentageInput = "1+2"
        scope.validateNums();
        
        expect(scope.expected).toBe(0.2);
        expect(scope.actual).toBe(0.2);
    }));


    it('Barchart should reject values less than 0.0', inject(function() {
        scope.expected = 0.3;
        scope.actual = 0.3;
        
        scope.expectedPercentageInput = "-12"
        scope.actualPercentageInput = "-0.0000001"
        scope.validateNums();
        
        expect(scope.expected).toBe(0.3);
        expect(scope.actual).toBe(0.3);
    }));
    
    
    it('Barchart should reject values greater than 1.0', inject(function() {
        scope.expected = 0.3;
        scope.actual = 0.3;
        
        scope.expectedPercentageInput = "3.0"
        scope.actualPercentageInput = "1.0000001"
        scope.validateNums();
        
        expect(scope.expected).toBe(0.3);
        expect(scope.actual).toBe(0.3);
    }));
  });
  
  describe('ProgressChart Directive', function() {
    
    // gzhang TODO: figure out how to get the directive testing to work with template URLs
  });
  
  
});
