export const GET_FATTURE = "GET_FATTURE";
export const DELETE_FATTURA = "DELETE_FATTURA";

export const TOKEN = "TOKEN";
export const GET_CLIENTI = "GET_CLIENTI";
export const GET_USERS = "GET_USERS";

const baseEndPointFatture = "http://localhost:3001/fatture";
export const fetchFatture = (queryParams) => {
  return async (dispatch, getState) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();

      let resp = await fetch(`${baseEndPointFatture}?${queryString}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      if (resp.ok) {
        let myFattureFetched = await resp.json();
        dispatch({ type: GET_FATTURE, payload: myFattureFetched });
      } else {
        console.log("error");
        alert("Errore nel reperimento dei dati 'fatture' ");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const baseEndPoint = "http://localhost:3001";

export const RegisterProfile = (data) => {
  return async () => {
    console.log(data);
    try {
      let resp = await fetch(baseEndPoint + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return resp.json();
    } catch (error) {
      console.log(error);
    }
  };
};

export const LoginProfile = (data) => {
  return async (dispatch, getState) => {
    console.log(data);
    try {
      const resp = await fetch(baseEndPoint + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        const token = await resp.json();
        dispatch({ type: TOKEN, payload: token.accessToken });
        sessionStorage.setItem("token", token.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getClienti = () => {
  return async (dispatch) => {
    try {
      const resp = await fetch(baseEndPoint + "/clienti", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        let fetchedClienti = await resp.json();
        dispatch({ type: GET_CLIENTI, payload: fetchedClienti.content });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteCliente = (data) => {
  return async (dispatch, getState) => {
    console.log(data);
    try {
      const resp = await fetch(baseEndPoint + "/clienti/" + data, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        alert("Delete Con Successo");
        getClienti();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetch(baseEndPoint + "/users", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        let fetchedUsers = await resp.json();
        dispatch({ type: GET_USERS, payload: fetchedUsers.content });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUsers = (data) => {
  return async (dispatch, getState) => {
    console.log(data);
    try {
      const resp = await fetch(baseEndPoint + "/users/" + data, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (resp.ok) {
        alert("Delete Con Successo");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
