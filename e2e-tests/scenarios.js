'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Simple GZZ app', function() {


  it('should automatically redirect to /sandbox when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/sandbox");
  });
  
  describe('Main Progress Chart View', function() {
     
    beforeEach(function() {
      browser.get('#/barchart')
    })
    
    // gzhang: currently using 'getText()' because the percentage line is one block.  If using other format, some of these should break.
     
    it('Should update the percentage text if new values are put in.', function() {
      expect(element(by.css(".progressPercentage")).getText()).toBe("80%");
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('0.1214');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("12%");
    });
    
    it('Should round the percentage text if more than 2 decimal points.', function() {
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('0.1254');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("13%");
    });
    
    it('Should not do anything on invalid input.', function() {
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('123');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("80%");
      
      
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('0.123.456');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("80%");
    });
    
    it('Keypress filter ignores non-valid input, but everything else is kept', function() {
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('-.A1B2CD!!XX');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("12%");
      
      
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('XXTT0.67AASDASF');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("67%");
    });
     
    it('Color of outside path should be Red if actual progress is less than 50% of expected.', function() {
           
      element(by.model('actualPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).sendKeys('0.8');
      element(by.model('actualPercentageInput')).sendKeys('0.3');
      element(by.id('inputArea')).submit();
      
      browser.sleep(800)  // helps ensure that the transitional colors are not tested
      
      expect(element(by.id("actualPath")).getAttribute("style")).toContain("fill: rgb(255, 0, 0)")
    });
    
    it('Color of outside path should be Orange if actual progress is less than 75% of expected.', function() {
           
      element(by.model('actualPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).sendKeys('0.8');
      element(by.model('actualPercentageInput')).sendKeys('0.5');
      element(by.id('inputArea')).submit();
      
      browser.sleep(800)  // helps ensure that the transitional colors are not tested
            
      expect(element(by.id("actualPath")).getAttribute("style")).toContain("fill: rgb(255, 165, 0)")
    });
    
    it('Color of outside path should be Green if actual progress is greater than 75% of expected.', function() {
           
      element(by.model('actualPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).sendKeys('0.8');
      element(by.model('actualPercentageInput')).sendKeys('0.9');
      element(by.id('inputArea')).submit();
      
      browser.sleep(800)  // helps ensure that the transitional colors are not tested
      
      expect(element(by.id("actualPath")).getAttribute("style")).toContain("fill: rgb(0, 128, 0)")
    });
  });

});
