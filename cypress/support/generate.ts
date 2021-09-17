import { build, fake } from "@jackfranklin/test-data-bot";

export type User = {
  email: string;
  username: string;
  password: string;
};

export const buildUser = build<User>("User", {
  fields: {
    username: fake((f) => f.internet.userName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
});
