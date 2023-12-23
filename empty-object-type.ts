// it represents anything that is not null or undefined
interface Empty {}
//    ^?

const test: Empty = {};

const test2: Empty = "random";
const test3: Empty = 1;
const test4: Empty = false;
const test5: Empty = NaN;
const test6: Empty = null;
const test7: Empty = undefined;

// object that do have any property cannoy use Empty interface, we cannot read property of null and undefined

type Everything = Empty | null | undefined; // -> unknown
//      ^?
const test8: Everything = null;
const test9: Everything = undefined;
const test10: Everything = "undefined";
//    ^?
