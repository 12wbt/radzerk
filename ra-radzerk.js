'use strict';
// Source: src/ra-radzerk.js
angular.module('ra.radzerk', ['ra.radzerk.services', 'ra.radzerk.directives']);

// Source: src/directives/radzerk.js
angular.module('ra.radzerk.directives', ['ra.radzerk.services'])
  .directive('radzerk', function($window, $q, raRadzerk) {

    var defaults = {
      size: 'medium-rectangle',
      zone: 'dashboard'
    };

    return {
      restrict: 'AE',
      replace:  true,
      scope:    true,
      template: '<div class="radzerk"></div>',

      link: function($scope, element, attrs) {
        var tag = angular.extend({}, defaults, attrs);

        // Give it a pseudo unique id
        var id = attrs.id;
        if (!id) {
          id = 'razk' + Math.floor(Math.random() * 10000);
          attrs.$set('id', id);
        }

        // Populate data attributes
        angular.forEach('size zone'.split(' '), function(key) {
          var value = tag[key];

          if (value) {
            attrs.$set('data-' + key, value);
          }
        });

        var init = function(keywords) {
          if (!angular.isArray(keywords)) {
            keywords = [];
          }

          // Case insensitive, comma space delimited
          if (attrs.keywords) {
            keywords = keywords.concat(attrs.keywords.split(/,\s?/));
          }

          attrs.$set('data-keywords', keywords.join(','));

          // Init the element in Radzerk
          try {
            raRadzerk.push('#' + id);
          } catch (e) {}

          return keywords;
        };

        $q.when(raRadzerk.keywords())
          .then(init);
      }
    };
  });

// Source: src/services/radzerk.js
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
