// https://www.youtube.com/watch?v=3Fxoxg_FMpg
// lets us to extract a type from an existing type to create a new type
type QueueJob<Q extends string, P> = {
  queue: Q;
  payload: P;
};

type WelcomeEmail = {
  to: string;
  body: string;
};

type ProcessPayment = {
  username: string;
  accountId: string;
};

type WelcomeEmailJob = QueueJob<"welcome-email", WelcomeEmail>;
type ProcessPaymnetJob = QueueJob<"process-payment", ProcessPayment>;

// to extract queue name as a type from a given queue job. Using infer to capture generic argument
type QueueName<Q extends QueueJob<string, unknown>> = Q extends QueueJob<
  infer N,
  unknown
>
  ? N
  : never;

type TestQueueName = QueueName<WelcomeEmailJob>;
//   ^?

type TestQueueName2 = QueueName<ProcessPaymnetJob>;
//   ^?

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Includes<T extends readonly unknown[], V> = T extends [infer F, infer L]
  ? F extends V
    ? true
    : L extends unknown[]
    ? Includes<L, V>
    : false
  : false;

type test1 = Includes<["hello", "world"], "hello">;
//    ^?

type test2 = Includes<["hello", "world"], "hi">;
//    ^?

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;

const fn1 = () => {};
type fn1Type = MyParameters<typeof fn1>;
//    ^?

const fn2 = (a: string, b: boolean) => {};
type fn2Type = MyParameters<typeof fn2>;
//    ^?

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const fn3 = (): string => {
  return "hellow world";
};
type fn3Type = MyReturnType<typeof fn3>;
//    ^?

const fn4 = (a: string, b: boolean): string[] => {
  return ["hello", "world"];
};
type fn4Type = MyReturnType<typeof fn4>;
//    ^?

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ExcludedChars = " " | "\n" | "\t";
type Trim<T extends string> = T extends `${ExcludedChars}${infer S}`
  ? Trim<S>
  : T extends `${infer S}${ExcludedChars}`
  ? Trim<S>
  : T;

type test3 = Trim<" \n\t abc \n def \t ">;
//    ^?
