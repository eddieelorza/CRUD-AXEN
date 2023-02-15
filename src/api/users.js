export default {
    getUsers: async () => {
      let response = await fetch(
        "https://users-db-55f93-default-rtdb.firebaseio.com/persons/.json"
      );
      response = await response.json();
      return response;
    },
    storeUser: async (user) => {
      let response = await fetch(
        "https://users-db-55f93-default-rtdb.firebaseio.com/persons/.json",
        {
          method: "POST",
          body: JSON.stringify(user)
        }
      );
      response = await response.json();
      return response;
    },
    updateUser: async (update) => {
      let response = await fetch(
        "https://users-db-55f93-default-rtdb.firebaseio.com/persons/.json",
        {
          method: "PATCH",
          body: JSON.stringify(update)
        }
      );
      response = await response.json();
      return response;
    },
    deleteUser: async (userKey) => {
      let response = await fetch(
        `https://users-db-55f93-default-rtdb.firebaseio.com/persons/${userKey}.json`,
        {
          method: "DELETE"
        }
      );
      response = await response.json();
      return response;
    }
  };