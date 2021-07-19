import axios from "axios";
import { dateToString } from "./utils";

// Users
const USERS_MONGODB_URL = "http://localhost:5001/usersMongodb";
const USERS_URL = "http://localhost:5001/users";
const PERMISSIONS_URL = "http://localhost:5001/permissions";
const MOVIES_URL = "http://localhost:5000/movies";
const MEMBERS_URL = "http://localhost:5000/members";
const SUBSCRIPTIONS_URL = "http://localhost:5000/subscriptions";

export const getUsersDataFromServer = async (resolve, reject) => {
  try {
    const { data } = await axios.get(USERS_URL);
    if (resolve) {
      resolve(data);
    } else {
      return data;
    }
  } catch (error) {
    if (reject) {
      reject(error.message);
    }
  }
};

export const getPermissionsDataFromServer = async (resolve, reject) => {
  try {
    const { data } = await axios.get(PERMISSIONS_URL);
    if (resolve) {
      resolve(data);
    } else {
      return data;
    }
  } catch (error) {
    if (reject) {
      reject(error.message);
    }
  }
};

//TODO: move the post request to async redux action
export const addUserToServers = async (
  user,
  permissions,
  onFulfilled,
  onRejected
) => {
  try {
    // Add to usersMongodb and retrieve new id
    const res1 = await axios.post(USERS_MONGODB_URL, {
      username: user.username,
    });
    if (!res1.data?._id) {
      if (onRejected) {
        onRejected();
      }
      return;
    }
    const id = res1.data._id;

    const createdDate = dateToString(new Date());

    // Add to users with the same id
    const res2 = await axios.post(USERS_URL, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      createdDate,
      id,
      sessionTimeOut: user.sessionTimeOut,
    });
    if (!res2.data?.id) {
      if (onRejected) {
        onRejected();
      }
      return;
    }
    // Add to permissions with the same id
    const res3 = await axios.post(PERMISSIONS_URL, { id, permissions });

    if (!res3.data?.id) {
      if (onRejected) {
        onRejected();
      }
      return;
    }
    if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

export const deleteUserFromServers = async (id, onFulfilled, onRejected) => {
  try {
    // if all deletes are successfull run onFulfilled
    // otherwise run onRejected

    // TODO: handle situation when delete request got to one server but not to other server
    // maybe it's ok, because they are all on the same ip
    try {
      const res1 = await axios.delete(PERMISSIONS_URL + "/" + id);
      if (!res1.data?.id) {
        if (onRejected) {
          onRejected();
        }
        return;
      }

      const res2 = await axios.delete(USERS_URL + "/" + id);
      if (!res2.data?.id) {
        if (onRejected) {
          onRejected();
        }
        return;
      }

      const res3 = await axios.delete(USERS_MONGODB_URL + "/" + id);
      if (!res3.data?._id) {
        if (onRejected) {
          onRejected();
        }
        return;
      }

      if (onFulfilled) {
        onFulfilled();
      }
    } catch (error) {
      console.log(error);
      if (onRejected) {
        onRejected(error);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserInServers = async (
  userId,
  user,
  permissions,
  onFulfilled,
  onRejected
) => {
  try {
    // Add to usersMongodb and retrieve new id
    const res1 = await axios.put(USERS_MONGODB_URL + "/" + userId, {
      username: user.username,
    });
    if (!res1.data?._id) {
      if (onRejected) {
        onRejected();
      }
      return;
    }

    // Add to users with the same id
    const res2 = await axios.put(USERS_URL + "/" + userId, user);
    if (!res2.data?.id) {
      console.log("res2");
      console.log(res2);
      if (onRejected) {
        onRejected();
      }
      return;
    }
    // Add to permissions with the same id
    const res3 = await axios.put(PERMISSIONS_URL + "/" + userId, {
      permissions,
    });
    if (!res3.data?.id) {
      console.log("res3");
      console.log(res3);
      if (onRejected) {
        onRejected();
      }
      return;
    }

    if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

// Movies
export const addMovieToServer = async (movie, onFulfilled, onRejected) => {
  try {
    // Add to usersMongodb and retrieve new id
    const res = await axios.post(MOVIES_URL, movie);
    if (!res.data?._id) {
      if (onRejected) {
        onRejected();
      }
    } else if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

export const updateMovieInServer = async (
  movieId,
  movie,
  onFulfilled,
  onRejected
) => {
  try {
    const res = await axios.put(MOVIES_URL + "/" + movieId, movie);
    if (!res.data?._id) {
      if (onRejected) {
        onRejected();
      }
    } else if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

export const deleteMovieFromServer = async (id, onFulfilled, onRejected) => {
  try {
    const res = await axios.delete(MOVIES_URL + "/" + id);
    if (!res.data?._id) {
      if (onRejected) {
        onRejected();
      }
    } else if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

// Members
export const addMemberToServer = async (member, onFulfilled, onRejected) => {
  try {
    // Add to usersMongodb and retrieve new id
    const res = await axios.post(MEMBERS_URL, member);
    if (!res.data?._id) {
      if (onRejected) {
        onRejected();
      }
    } else if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

export const updateMemberInServer = async (
  memberId,
  member,
  onFulfilled,
  onRejected
) => {
  try {
    const res = await axios.put(MEMBERS_URL + "/" + memberId, member);
    if (!res.data?._id) {
      if (onRejected) {
        onRejected();
      }
    } else if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

export const deleteMemberFromServer = async (id, onFulfilled, onRejected) => {
  try {
    const res = await axios.delete(MEMBERS_URL + "/" + id);
    if (!res.data?._id) {
      if (onRejected) {
        onRejected();
      }
    } else if (onFulfilled) {
      onFulfilled();
    }
  } catch (error) {
    if (onRejected) {
      onRejected(error);
    }
  }
};

// Subscriptions

// Members
export const addWatchToServer = async (
  memberId,
  movieId,
  date,
  onFulfilled,
  onRejected
) => {
  console.log("addWatchToServer1");
  try {
    // Check if member has already document in server
    console.log("memberId");
    console.log(memberId);
    const res1 = await axios.get(SUBSCRIPTIONS_URL + "?memberId=" + memberId);
    if (!res1?.data[0]?._id) {
      console.log("addWatchToServer2");
      console.log(res1);

      // Add new member with the watch
      const newSubscriptions = {
        memberId,
        movies: [{ movieId, date }],
      };
      const res2 = await axios.post(SUBSCRIPTIONS_URL, newSubscriptions);
      if (!res2?.data?._id) {
        console.log("res2");
        console.log(res2);
        if (onRejected) {
          onRejected();
        }
      } else if (onFulfilled) {
        onFulfilled();
      }
    } else {
      console.log("addWatchToServer3");
      console.log("res1");
      console.log(res1);

      // Add the watch to the member
      const oldMovies = res1.data[0].movies.map((m) => {
        return { movieId: m.movieId, date: m.date };
      });
      console.log("oldMovies");
      console.log(oldMovies);
      const newMovies = [...oldMovies, { movieId, date }];
      console.log("newMovies");
      console.log(newMovies);
      const res3 = await axios.put(SUBSCRIPTIONS_URL + "/" + res1.data[0]._id, {
        movies: newMovies,
      });
      if (!res3?.data?._id) {
        console.log("res3");
        console.log(res3);
        if (onRejected) {
          onRejected();
        }
      } else if (onFulfilled) {
        onFulfilled();
      }
    }
  } catch (error) {
    console.log("error.message");
    console.log(error.message);
    if (onRejected) {
      onRejected(error);
    }
  }
};
