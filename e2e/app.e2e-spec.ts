import { AngularCrudAuthRoutingPage } from './app.po';

describe('angular-crud-auth-routing App', () => {
  let page: AngularCrudAuthRoutingPage;

  beforeEach(() => {
    page = new AngularCrudAuthRoutingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
