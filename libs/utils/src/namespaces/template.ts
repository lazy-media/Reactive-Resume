export const templatesList = [
  "azurill",
  "bronzor",
  "chikorita",
  "ditto",
  "ditgar",
  "gengar",
  "glalie",
  "kakuna",
  "leafish",
  "nosepass",
  "onyx",
  "pikachu",
  "rhyhorn",
] as const;

export type Template = (typeof templatesList)[number];
