import { AngularPolymerSinkPage } from './app.po';

describe('angular-polymer-sink App', () => {
  let page: AngularPolymerSinkPage;

  beforeEach(() => {
    page = new AngularPolymerSinkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
