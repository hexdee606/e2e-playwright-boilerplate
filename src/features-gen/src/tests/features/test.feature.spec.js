/** Generated from: src\tests\features\test.feature */
import { test } from "playwright-bdd";

test.describe("test", () => {

  test("test sc", { tag: ["@suite1"] }, async ({ Given, page }) => {
    await Given("test given", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("src\\tests\\features\\test.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "test sc": {"pickleLocation":"3:3","tags":["@suite1"]},
};