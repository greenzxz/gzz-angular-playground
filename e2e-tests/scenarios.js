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
    
     
    it('Should update the percentage text if new values are put in.', function() {
      expect(element(by.css(".progressPercentage")).getText()).toBe("80%");
      element(by.model('actualPercentageInput')).clear();
      element(by.model('actualPercentageInput')).sendKeys('0.1214');
      element(by.id('inputArea')).submit();
      expect(element(by.css(".progressPercentage")).getText()).toBe("12%");
    });
    
     
    it('Color of outside path should be Red if actual progress is less than 50% of expected.', function() {
           
      element(by.model('actualPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).sendKeys('0.8');
      element(by.model('actualPercentageInput')).sendKeys('0.3');
      element(by.id('inputArea')).submit();
      
      browser.sleep(500)
      
      expect(element(by.id("actualPath")).getAttribute("style")).toContain("fill: rgb(255, 0, 0)")
    });
    
    it('Color of outside path should be Orange if actual progress is less than 75% of expected.', function() {
           
      element(by.model('actualPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).sendKeys('0.8');
      element(by.model('actualPercentageInput')).sendKeys('0.5');
      element(by.id('inputArea')).submit();
            
      browser.sleep(500)
            
      expect(element(by.id("actualPath")).getAttribute("style")).toContain("fill: rgb(255, 165, 0)")
    });
    
    it('Color of outside path should be Green if actual progress is greater than 75% of expected.', function() {
           
      element(by.model('actualPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).clear();
      element(by.model('expectedPercentageInput')).sendKeys('0.8');
      element(by.model('actualPercentageInput')).sendKeys('0.9');
      element(by.id('inputArea')).submit();
      
      expect(element(by.id("actualPath")).getAttribute("style")).toContain("fill: rgb(0, 128, 0)")
    });
  });

});
