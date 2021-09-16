beforeEach(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/");
});

it("Existing usernames can not be used", () => {
  cy.findByRole("link", { name: "Create Account" }).click();

  cy.findByText("Username is already taken.").should("not.exist");

  cy.findByLabelText("Username").type("tigerabrodi");

  cy.findByText("Username is already taken.").should("exist");
});
