function toNumber(val: number | string): number {
  if (typeof val === "string") {
    return parseInt(val);
  }
  return val;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

declare function getStandardSessionToken(name: string, ttl: number): string;
declare function getAdminSessionToken(name: string, accessLevel: string): string;

type StandardUser = {
  name: string;
  sessionTTL: number;
};

type AdminUser = StandardUser & {
  isAdmin: true;
  access: "read-admin" | "write-admin";
};

function login(user: StandardUser | AdminUser) {
  if ("isAdmin" in user) {
    const user1 = user;
    //   ^?
  } else {
    const user2 = user;
    //   ^?
  }
  const user3 = user;
  //   ^?
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// type predicate

type User = StandardUser | AdminUser;

const users: User[] = [
  { name: "jane", sessionTTL: 10 },
  { name: "bob", sessionTTL: Infinity, isAdmin: true, access: "read-admin" },
];

const su1 = users.filter((user) => !("isAdmin" in user));
//    ^?

const su2 = users.filter((user): user is StandardUser => !("isAdmin" in user));
//    ^?

//caution
const su3 = users.filter((user): user is StandardUser => true);
//    ^?

const su4 = users.filter((user): user is StandardUser => !(user as AdminUser).isAdmin);
//    ^?

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//discriminated union, exhaustive switch

type StandardUser2 = {
  type: "standard";
  name: string;
  sessionTTL: number;
};
type AdminUser2 = {
  type: "admin";
  name: string;
  access: "read-admin" | "write-admin";
};

type AdminUser3 = {
  type: "admin2";
  name: string;
  access: "read-admin";
};

type User2 = AdminUser2 | StandardUser2 | AdminUser3;

function login2(user: User2) {
  switch (user.type) {
    case "standard":
      user = user;
      getStandardSessionToken(user.name, user.sessionTTL);
      break;
    case "admin":
      getAdminSessionToken(user.name, user.access);
      break;
    case "admin2":
      getAdminSessionToken(user.name, user.access);
      break;
    default:
      const notPossible: never = user;
      //    ^?
      return;
  }
}
