import { Angular2NapraticaPage } from './app.po';

describe('angular2-napratica App', function() {
  let page: Angular2NapraticaPage;

  beforeEach(() => {
    page = new Angular2NapraticaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
