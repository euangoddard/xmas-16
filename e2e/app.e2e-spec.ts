import { Xmas16Page } from './app.po';

describe('xmas-16 App', function() {
  let page: Xmas16Page;

  beforeEach(() => {
    page = new Xmas16Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
