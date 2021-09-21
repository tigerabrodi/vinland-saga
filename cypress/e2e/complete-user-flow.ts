import { buildUser } from "../support/generate";

beforeEach(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/");
});

it("Complete users flow", () => {
  const user = buildUser();

  cy.findByRole("link", { name: "Create Account" }).click();

  // Create Account
  cy.findByLabelText("Username").type(user.username);
  cy.findByLabelText("Email").type(user.email);
  cy.findByLabelText("Password").type(user.password);
  cy.findByLabelText("Confirm Password").type(user.password);
  cy.findByRole("button", { name: "Sign Up" }).click();

  // Create Profile
  cy.findByText("You successfully created your account.").should("exist");
  cy.findByRole("heading", { name: "Editing Profile" }).should("exist");
  cy.findByRole("button", { name: "Save" }).should("have.attr", "disabled");

  cy.findByRole("img", { name: "default" }).should("exist");
  cy.findByLabelText("Avatar Upload").attachFile("tiger-avatar.png");
  cy.findByRole("img", { name: "avatar" }).should("exist");
  cy.findByText("Successfully uploaded your avatar.").should("exist");

  cy.findByLabelText("Full Name *").type(user.fullname);
  cy.findByLabelText("Age *").type(`${user.age}`);
  cy.findByLabelText("Work *").type(`Chef at ${user.work}`);
  cy.findByLabelText("Location *").type(`${user.location}`);
  cy.findByLabelText("Biography").type(user.bio);

  cy.findByRole("button", { name: "Save" }).click();
  cy.findByText("Successfully updated your profile.").should("exist");

  // User Profile
  cy.findByRole("heading", { name: user.fullname }).should("exist");
  cy.findByText(`@${user.username}`).should("exist");
  cy.findByText(`Age ${user.age}`).should("exist");
  cy.findByText(`Located in ${user.location}`).should("exist");
  cy.findByText(user.work).should("exist");
  cy.findByText(user.bio).should("exist");
  cy.findByRole("link", { name: "Edit Your Profile" }).should("exist");
  cy.findByRole("img", { name: user.fullname }).should("exist");

  cy.findByRole("heading", { name: "Recipes" }).should("exist");
  cy.findByText("You currently have written no recipes.");

  // New Post
  cy.findByRole("link", { name: "New Recipe" }).click();
});
