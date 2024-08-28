class GooglePage {
    constructor(page) {
      this.page = page;
      this.searchInput = page.locator('input[name="q"]');
      this.searchButton = page.locator('input[name="btnK"]');
      this.results = page.locator('#search .g');
    }
  
    async navigate() {
      await this.page.goto('https://www.google.com/');
    }
  
    async search(query) {
      await this.searchInput.fill(query);
      await this.searchButton.click();
    }
  
    async verifyResultsVisible() {
      await expect(this.results).toBeVisible();
    }
  }
  
  module.exports = GooglePage;
  