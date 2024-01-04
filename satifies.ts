// satisfies works on value not the variable

const scores: Record<string, number> = {};
//    ^?
scores.english = 100;
scores.maths = 100;

const scores1 = {};
//    ^?
scores1.english = 100;
scores1.maths = 100;

const scores2 = {} satisfies Record<string, number>;
//    ^?
// it means that {} satifies Record<string, number> thats all
scores2.english = 100;
scores2.maths = 100;

const scores3 = {
  //    ^?
  english: "100",
} satisfies Record<string, number>;
// it means that {english: "100"} does not satifies Record<string, number> thats all
// as you can see score3 has type {english:string} which does not satifies Record<string, number>
// hence we can say that satifies has no effect on varaible type

const config = {
  wide: "100px",
  narrow: 0,
} satisfies Record<string, string | number>;

console.log(config.wide);
//                 ^?
// config1.wide is string
console.log(config.narrow);
//                 ^?

const config2: Record<string, string | number> = {
  wide: "100px",
  narrow: 0,
};

console.log(config2.wide);
//                  ^?
// config2.wide is string | number
console.log(config2.narrow);
//                  ^?

// satifies is used for keeping things narrow
// varaible type is used for keeping things wide
