function sendAuthRequest(url, username, password) {
  return new Promise((resolve, reject) => {
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

function sendRegisterRequest(username, password) {
  const url = "https://localhost:5001/auth/register";
  return sendAuthRequest(url, username, password);
}
function sendLoginRequest(username, password) {
  const url = "https://localhost:5001/auth/login";
  return sendAuthRequest(url, username, password);
}

export default { sendRegisterRequest, sendLoginRequest };
