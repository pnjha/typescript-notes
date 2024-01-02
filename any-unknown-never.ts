declare function tommorrow(d: Date): Date;

let val: any = 1;

val++;
val.toUppercase();
val.map();
val.foobar = 2;
tommorrow(val);
//any simply turns off the type check

let val2: unknown = 1;

val2++;
if (typeof val2 === "number") {
  val2++; // this works since typescript is sure that val2 is number since we narrowed the type
}
val2.toUppercase();
val2.map();
val2.foobar = 2;
tommorrow(val2);
//unknown is a set of all possible values in typescript
// operations on val2 is failing because there is no such type in typescript that supports all the possible operations that we are perforiing here on val2
// most places we can replace any with unknown

// never is a set of no possible values, i.e. never is a empty set in typescript
let a: never = 1;
// no type can be assined to never
// never is usefull when definfing you own complex type. If your type is not properly constructed then the resultant type becomes never
type A = number & string;
// here A is of type never since there is no intersection between number and string primitive type.
// it is also used in type narrowing, check type-narrowing.ts file for more details
