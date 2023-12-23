interface Fizz {
  id: string;
  fizz: number;
}

interface Buzz {
  id: string;
  buzz: number;
}

const func = (arr: Array<Fizz | Buzz>) => {
  arr.filter((member) => {
    member;
    // ^?
    member.id;
    member.fizz;
    member.buzz;
  });
};

const func2 = (arr: Array<Fizz> | Array<Buzz>) => {
  arr.filter((member) => {
    member;
    // ^?
    member.id;
    member.fizz;
    member.buzz;
  });
};
