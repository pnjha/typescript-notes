import roles from "./roles.json";

const arr = [1, "bob", false];

type t1 = typeof arr;
//   ^?

const arr2 = [1, "bob", false] as const;
type t2 = typeof arr2;
//   ^?

const arr3: t2 = [1, false]; // it has to be bob

type t3 = t2[1];
//   ^?

type t4 = t2[0] | t2[1] | t2[2];
//   ^?

type t5 = t2[0 | 1 | 2];
//   ^?

type t6 = t2[number];
//   ^?

type t9 = t1[number];
//   ^?

type t7 = (typeof arr)[number];
//   ^?

type t8 = (typeof roles)[number];
//   ^?
