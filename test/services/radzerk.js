describe('Module: ra.radzerk.services >', function() {
  var keyword_spy,
      keyword_response = ['au', 'nsw'];

  beforeEach(function() {
    module('ra.radzerk.services');
    module(function(raRadzerkProvider) {
      keyword_spy = jasmine.createSpy().andReturn(keyword_response);
      raRadzerkProvider.keywords(keyword_spy);
    });
  });

  describe('Service: raRadzerk >', function() {
    var raRadzerk;

    beforeEach(inject(function($window, $injector) {
      raRadzerk = $injector.get('raRadzerk');

      this.push_spy = jasmine.createSpy();
      $window.Radzerk = { push: this.push_spy };
    }));

    describe('push >', function() {
      it('should push a selector to window.Radzerk', function() {
        raRadzerk.push('#azk1');
        expect(this.push_spy).toHaveBeenCalledWith('#azk1');
      });
    });

    describe('keywords >', function() {
      it('should call the callback specified in the configuration', function() {
        raRadzerk.keywords();
        expect(keyword_spy).toHaveBeenCalled();
      });

      it('should respond with the return value of the callback specified in the configuration', function() {
        expect(raRadzerk.keywords()).toBe(keyword_response);
      });
    });
  });
});
