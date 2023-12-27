// passing type to another type aka type function
type MyGenericType<TData> = {
  data: TData;
};

type Example1 = MyGenericType<{
  //    ^?
  firstName: string;
}>;

type Example2 = MyGenericType<number>;
//    ^?

// ****************************************************************************************
// create function with type helper mapped over the top and pass the type to them manually

const makeFetch = <TData>(url: string): Promise<TData> => {
  //    ^?
  return fetch(url).then((res) => res.json());
};

makeFetch<{ firstName: string; lastName: string }>("/api/endpoint").then((res) => {
  //    ^?
  console.log(res);
  res.firstName;
  //     ^?
});

// ****************************************************************************************
// you can pass type to Map and Set

const set = new Set<number>();
//    ^?

set.add(1);
set.add("1");
//    ^?

const set1 = new Set("asd");
//    ^?

// ****************************************************************************************
// you don't always have to pass the types to a generic function

const addIdToObject = <T>(obj: T): T & { id: number } => {
  return {
    ...obj,
    id: 123,
  };
};

const result = addIdToObject<{ first: string; last: string }>({
  //    ^?
  first: "hello",
  last: "world",
});

const result2 = addIdToObject({
  //    ^?
  first: "hello",
  last: "world",
});

// ****************************************************************************************

type Result1 = Awaited<Promise<string>>;
//    ^?

type Result5 = ReturnType<() => number>;
//    ^?

type GetPromiseReturnType<T extends (...arg: any) => any> = Awaited<ReturnType<T>>;

//T extends (...arg: any) => any is  a type constraint

type Result = GetPromiseReturnType<() => Promise<{ first: string; last: string }>>;
//    ^?

type Resul3 = GetPromiseReturnType<() => { first: string; last: string }>;
//    ^?

type Result4 = GetPromiseReturnType<string>;
//    ^?

// ****************************************************************************************
// sometimes you need to contrain the generic that gets passed in

const getKeyWithHighestValue = <TObj extends Record<string, number>>(obj: TObj): { key: keyof TObj; value: number } => {
  const keys = Object.keys(obj) as Array<keyof TObj>;

  let highestKey: keyof TObj = keys[0];
  let highestValue = obj[highestKey];

  for (const key of keys) {
    if (obj[key] > highestValue) {
      highestKey = key;
      highestValue = obj[key];
    }
  }
  return {
    key: highestKey,
    value: highestValue,
  };
};

const res = getKeyWithHighestValue({
  //    ^?
  a: 1,
  b: 2,
  c: 3,
});

// ****************************************************************************************
// sometimes you need to overide the type inside the generic function with an assertion

const typedObjectKeys = <T extends {}>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

const res2 = typedObjectKeys({
  //    ^?
  name: "john",
  age: 30,
});

// ****************************************************************************************

const getValue = <T, V extends keyof T>(obj: T, key: V) => {
  return obj[key];
};

const result10 = getValue(
  //    ^?
  {
    a: 1,
    b: "asdads",
  },
  "a"
);

// ****************************************************************************************
// default parameter for generic type

export const createSet = <T = string>() => {
  return new Set<T>();
};

const numberSet = createSet<number>();
//    ^?
const stringSet = createSet<string>();
//    ^?

const otherStringSet = createSet();
//    ^?
