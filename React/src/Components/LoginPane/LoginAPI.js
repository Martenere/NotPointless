function sendRegisterRequest(username, password) {
  return new Promise((resolve, reject) => {
    const url = "https://localhost:5001/auth/register";

    const registerPayload = {
      email: username,
      password: password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    };
    const apiResponse = {};
    console.log("Send createAccount req");
    fetch(url, options)
      .then((response) => {
        apiResponse.response = response;
        return response.json();
      })
      .then((data) => {
        apiResponse.data = data;
        resolve(apiResponse);
      })
      .catch((error) => reject(error));
  });
}

function sendLoginRequest(username, password) {
  return new Promise((resolve, reject) => {
    const url = "https://localhost:5001/auth/login";

    const registerPayload = {
      email: username,
      password: password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    };
    const apiResponse = {};
    console.log("Send Login req");
    fetch(url, options)
      .then((response) => {
        apiResponse.response = response;
        return response.json();
      })
      .then((data) => {
        apiResponse.data = data;
        resolve(apiResponse);
      })
      .catch((error) => reject(error));
  });
}

export default { sendRegisterRequest, sendLoginRequest };
