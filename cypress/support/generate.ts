import { build, fake } from "@jackfranklin/test-data-bot";

type User = {
  email: string;
  username: string;
  password: string;
  fullname: string;
  age: number;
  work: string;
  location: string;
  bio: string;
};

type Recipe = {
  title: string;
  body: string;
};

export const buildUser = build<User>("User", {
  fields: {
    username: fake((f) => f.internet.userName().toLowerCase()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    fullname: fake((f) => f.name.firstName()),
    age: fake((f) => f.random.number(80)),
    work: fake((f) => f.company.companyName()),
    location: fake((f) => f.address.city()),
    bio: fake((f) => f.random.words(10)),
  },
});

export const buildRecipe = build<Recipe>("User", {
  fields: {
    title: fake((f) => f.name.title()),
    body: fake((f) => f.random.words(20)),
  },
});
