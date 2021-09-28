import { buildUser, buildRecipe } from "../support/generate";

beforeEach(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/");
});

it("Complete users flow", () => {
  const user = buildUser();
  const firstUserRecipe = buildRecipe();

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
  cy.findByText(`Chef at ${user.work}`).should("exist");
  cy.findByText(user.bio).should("exist");
  cy.findByRole("link", { name: "Edit Your Profile" }).should("exist");
  cy.findByRole("img", { name: user.fullname }).should("exist");

  cy.findByRole("heading", { name: "Recipes" }).should("exist");
  cy.findByText("You currently have written no recipes.");

  // New Recipe
  cy.findByRole("button", { name: "New Recipe" }).click();

  // Create Recipe
  cy.findByRole("dialog", { name: "Create Recipe" }).within(() => {
    cy.findByRole("heading", { name: "Create Recipe" }).should("exist");
    cy.findByLabelText("Title").type(firstUserRecipe.title);
    cy.findByRole("button", { name: "Create" }).click();
  });

  cy.findByText(
    `You successfully created the recipe ${firstUserRecipe.title}.`
  ).should("exist");

  // Edit Recipe
  cy.findByRole("heading", { name: "Edit Recipe" }).should("exist");

  cy.findByLabelText("Title").should("have.value", firstUserRecipe.title);
  cy.findByRole("img", { name: "Placeholder" }).should("exist");

  cy.findByLabelText("Body").type(firstUserRecipe.body);
  cy.findByRole("link", { name: "Markdown" }).should("exist");

  cy.findByLabelText("Upload Recipe Image").attachFile("recipe-image.jpg");

  cy.findByRole("img", { name: "Recipe" }).should("exist");
});
