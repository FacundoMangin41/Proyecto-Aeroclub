const BASE_URL = "http://localhost/";

export async function fetchAPIAuthToken(email: string) {
  const fetchApi = fetch(BASE_URL + "auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      email: email,
    }),
  });

  try {
    const res = await fetchApi;
    const result = res.json();
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function resolverToken() {
  const token = "bearer " + (await localStorage.getItem("token"));

  const fetchApi = fetch(BASE_URL + "auth", {
    method: "GET",
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
  });

  try {
    const res = await fetchApi;
    const result = res.json();
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}
