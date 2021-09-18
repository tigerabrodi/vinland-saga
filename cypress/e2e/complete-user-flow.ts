import { buildUser } from "../support/generate";

beforeEach(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/");
});

it("Complete users flow", () => {
  const user = buildUser();

  cy.findByRole("link", { name: "Create Account" }).click();

  cy.findByLabelText("Username").type(user.username);
  cy.findByLabelText("Email").type(user.email);
  cy.findByLabelText("Password").type(user.password);
  cy.findByLabelText("Confirm Password").type(user.password);

  cy.findByRole("button", { name: "Sign Up" }).click();

  cy.findByText("You successfully created your account.").should("exist");
  cy.findByRole("heading", { name: "Creating Profile" }).should("exist");
  cy.findByText("Click your avatar to upload a new one.").should("exist");

  cy.findByLabelText("Avatar Upload").attachFile("tiger-avatar.png");

  cy.findByText("Successfully uploaded your avatar.").should("exist");

  cy.findByLabelText("Full Name").type(user.fullname);
  cy.findByLabelText("Age").type(`Age ${user.age}`);
  cy.findByLabelText("Work").type(`Chef at ${user.work}`);
  cy.findByLabelText("Location").type(`Located in ${user.location}`);
  cy.findByLabelText("Biography").type(user.biography);

  cy.findByRole("button", { name: "Save" }).click();

  cy.findByRole("heading", { name: user.fullname }).should("exist");
});
