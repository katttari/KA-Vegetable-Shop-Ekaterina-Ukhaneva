import ky from "ky";

export const api = ky.create({
  prefix: "https://res.cloudinary.com",
  timeout: 10000,
});
