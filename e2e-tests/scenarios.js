'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Simple GZZ app', function() {


  it('should automatically redirect to /sandbox when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/sandbox");
  });

});
