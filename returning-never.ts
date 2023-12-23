const raise = (err: string) => {
  throw new Error(err);
};

const res = raise("error");
//    ^?

const redirect = (url: string) => {
  return {} as never;
};

const Page = (props: { params: Record<string, string | undefined> }) => {
  let id = props.params.id;
  //    ^?
  if (!id) {
    throw new Error("Id is required");
  }
  id = id;
  //   ^?
  const newId = props.params.id ?? raise("id is required");
  //    ^?
  const newId2 = props.params.id ?? redirect("/");
  //    ^?
};
