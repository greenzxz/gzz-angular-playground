'use strict';

// Declare app level module which depends on views, and components
var gzzApp = angular.module('gzzApp', [
  'ngRoute',
  'gzzApp.experimentation',
  'gzzBarchart',
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
          redirectTo: '/sandbox'
    });
}]);


function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode != 46 && charCode > 31 
     && (charCode < 48 || charCode > 57))
      return false;

   return true;
}
