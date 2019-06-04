describe('Module: ra.radzerk.directives >', function() {
  beforeEach(function() {
    module('ra.radzerk.directives');
    module(function(raRadzerkProvider) {
      raRadzerkProvider.keywords(function($q) {
        return $q.when(['au', 'nsw']);
      });
    });
  });

  describe('Directive: radzerk >', function() {
    var directive,
        raRadzerk,
        scope,
        compile,
        id;

    var defaults = {
      id:   1,
      size: 'medium-rectangle',
      zone: 'dashboard'
    };

    function compileDirective(tag) {
      var html = compile(tag)(scope);

      return {
        html:  html,
        scope: html.scope()
      };
    }

    beforeEach(inject(function($rootScope, $compile, $injector) {
      scope         = $rootScope.$new();
      compile       = $compile;
      raRadzerk     = $injector.get('raRadzerk');

      // Spies
      spyOn(raRadzerk, 'push');
      spyOn(raRadzerk, 'keywords').andCallThrough();
      spyOn(Math, 'random').andReturn(0.1);
    }));

    describe('default directive >', function() {
      beforeEach(function() {
        directive = compileDirective('<div radzerk></div>');
        id = 'razk' + Math.floor(Math.random()*10000);
      });

      it('should define the element id', function() {
        expect(directive.html.attr('id')).toBe(id);
      });

      it('should define the css class', function() {
        expect(directive.html.hasClass('radzerk')).toBe(true);
      });

      it('it define data-site attribute', function() {
        expect(directive.html.attr('data-site')).toBe(defaults.site);
      });

      it('it define data-size attribute', function() {
        expect(directive.html.attr('data-size')).toBe(defaults.size);
      });

      it('it define data-zone attribute', function() {
        expect(directive.html.attr('data-zone')).toBe(defaults.zone);
      });

      it('should call raRadzerk service keywords', function() {
        expect(raRadzerk.keywords).toHaveBeenCalled();
      });

      it('should call raRadzerk service push with the id', function() {
        scope.$digest();
        expect(raRadzerk.push).toHaveBeenCalledWith('#' + id);
      });
    });

    describe('element based directive >', function() {
      beforeEach(function() {
        directive = compileDirective('<radzerk></radzerk>');
        id = 'razk' + Math.floor(Math.random() * 10000);
      });

      it('should define the element id', function() {
        expect(directive.html.attr('id')).toBe(id);
      });

      it('should define the css class', function() {
        expect(directive.html.hasClass('radzerk')).toBe(true);
      });

      it('it define data-site attribute', function() {
        expect(directive.html.attr('data-site')).toBe(defaults.site);
      });

      it('it define data-size attribute', function() {
        expect(directive.html.attr('data-size')).toBe(defaults.size);
      });

      it('it define data-zone attribute', function() {
        expect(directive.html.attr('data-zone')).toBe(defaults.zone);
      });

      it('should call Adzerk service push with the id', function() {
        scope.$digest();
        expect(raRadzerk.push).toHaveBeenCalledWith('#' + id);
      });
    });

    describe('pre existing id directive >', function() {
      beforeEach(function() {
        directive = compileDirective('<div radzerk id="mySuperAwesomeAd"></div>');
        id = 'mySuperAwesomeAd';
      });

      it('should define the element id', function() {
        expect(directive.html.attr('id')).toBe(id);
      });
    });

    describe('ignore unsupported attrs directive >', function() {
      beforeEach(function() {
        directive = compileDirective('<div radzerk elephant="giraffe"></div>');
      });

      it('it should not define data-elephant attribute', function() {
        expect(directive.html.attr('data-elephant')).not.toBe('giraffe');
      });
    });

    describe('passing attrs to directive >', function() {
      beforeEach(function() {
        directive = compileDirective('<div radzerk size="medium-rectangle" zone="recipes" keywords="christmas"></div>');
        id = 'razk' + Math.floor(Math.random()*10000);
      });

      it('should define the element id', function() {
        expect(directive.html.attr('id')).toBe(id);
      });

      it('should define the css class', function() {
        expect(directive.html.hasClass('radzerk')).toBe(true);
      });

      it('it define data-size attribute', function() {
        expect(directive.html.attr('data-size')).toBe('medium-rectangle');
      });

      it('it define data-zone attribute', function() {
        expect(directive.html.attr('data-zone')).toBe('recipes');
      });

      it('it define data-keywords attribute', function() {
        scope.$digest();
        expect(directive.html.attr('data-keywords')).toBe('au,nsw,christmas');
      });

      it('should call raRadzerk service push with the id', function() {
        scope.$digest();
        expect(raRadzerk.push).toHaveBeenCalledWith('#' + id);
      });
    });

    describe('passing multiple keywords attrs to directive >', function() {
      beforeEach(function() {
        directive = compileDirective('<div radzerk keywords="christmas, nye"></div>');
      });

      it('it define data-keywords attribute', function() {
        scope.$digest();
        expect(directive.html.attr('data-keywords')).toBe('au,nsw,christmas,nye');
      });
    });
  });
});
