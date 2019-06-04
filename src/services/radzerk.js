angular.module('ra.radzerk.services', [])
  .provider('raRadzerk', function() {
    var keywordCallback = angular.noop;

    window.raRadzerk = window.raRadzerk || [];

    return {
      keywords: function(callback) {
        keywordCallback = callback;
      },

      $get: function($window, $q, $injector) {
        return {
          push: function(selector) {
            try {
              $window.Radzerk.push(selector);
            } catch (e) { }
          },

          keywords: function() {
            return $injector.instantiate(keywordCallback);
          }
        };
      }
    };
  });
