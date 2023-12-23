type Obj = {
  id: string;
  name: string;
  age: number;
};

type Exmaple2 = "id" | "name" | never;
//   ^?

type Example = {
  [K in keyof Obj]: Obj[K] extends string ? K : never;
}[keyof Obj];

type Example3 = {
  [K in keyof Obj]: Obj[K] extends string ? K : never;
}["id" | "name" | "age"];

type ExtraStringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type Example4 = ExtraStringKeys<Obj>;
//   ^?

// Example === Example2 === Example3 === Example4 === Exmaple6

type ValueOf<T> = T[keyof T];
//   ^?

type Example5 = ValueOf<Obj>;
//   ^?

type ExtraStringKeys2<T> = ValueOf<{
  [K in keyof T]: T[K] extends string ? K : never;
}>;

type Example6 = ExtraStringKeys<Obj>;
//   ^?

type ExtraStringKeysOfType<T, V> = ValueOf<{
  [K in keyof T]: T[K] extends V ? K : never;
}>;

type Example7 = ExtraStringKeysOfType<Obj, string>;
//   ^?
