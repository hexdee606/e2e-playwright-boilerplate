const { createBdd } = require("playwright-bdd");
const { Given } = createBdd();
const GooglePage = require("../pages/test_pom");

Given("I am on the homepage", async ({ page }) => {
  const googlePage = new GooglePage(page); // Create an instance of GooglePage
  await googlePage.navigate(); // Call the instance method
});
