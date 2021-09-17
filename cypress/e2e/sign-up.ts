import { buildUser } from "../support/generate";

beforeEach(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/");
});

it("Username validation", () => {
  const user = buildUser();

  cy.findByRole("link", { name: "Create Account" }).click();

  cy.findByText("Username is already taken.").should("not.exist");

  cy.findByLabelText("Username").type("tigerabrodi");

  cy.findByText("Username is already taken.").should("exist");

  cy.findByLabelText("Username").clear();

  cy.findByLabelText("Username").type(user.username);

  cy.findByText("Username is valid.").should("exist");
});
