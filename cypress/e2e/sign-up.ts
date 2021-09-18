import { buildUser } from "../support/generate";

beforeEach(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/sign-up");
});

it("Username validation", () => {
  const user = buildUser();

  cy.findByText("Username is already taken.").should("not.exist");

  cy.findByLabelText("Username").type("tigerabrodi");

  cy.findByText("Username is already taken.").should("exist");

  cy.findByLabelText("Username").clear();

  cy.findByLabelText("Username").type(user.username);

  cy.findByText("Username is valid.").should("exist");
});

it("Password validation", () => {
  const user = buildUser();

  cy.findByRole("button", { name: "Sign Up" }).should("have.attr", "disabled");

  cy.findByLabelText("Email").type(user.email);
  cy.findByLabelText("Username").type(user.username);
  cy.findByLabelText("Password").type("blah");
  cy.findByLabelText("Confirm Password").type("blah");

  cy.findByText("Password must be at least 6 characters.").should("not.exist");
  cy.findByRole("button", { name: "Sign Up" }).click();

  cy.findByText("Password must be at least 6 characters.").should("exist");

  cy.findByLabelText("Password").clear();
  cy.findByLabelText("Confirm Password").clear();

  cy.findByText("Passwords do not match.").should("not.exist");
  cy.findByLabelText("Password").type("password");
  cy.findByLabelText("Confirm Password").type("passwordNotMatching");

  cy.findByRole("button", { name: "Sign Up" }).click();

  cy.findByText("Passwords do not match.").should("exist");
});
