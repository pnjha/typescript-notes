const getResources = async () => {
  return {
    db: {
      getOneUser: async () => {
        return {
          id: 1,
        };
      },
      close: async () => {
        // closes the db conn
      },
    },
    [Symbol.asyncDispose]: () => {
      // close the db conn
    },
  };
};

(async () => {
  const res = await getResources();
  try {
    const user = await res.db.getOneUser();
  } catch (err) {
    console.log(err);
  } finally {
    await res.db.close();
  }
})();

(async () => {
  await using res = await getResources();
  try {
    const user = await res.db.getOneUser();
  } catch (err) {
    console.log(err);
  }
})();

// asyncDispose will be called when the object goes out of scope