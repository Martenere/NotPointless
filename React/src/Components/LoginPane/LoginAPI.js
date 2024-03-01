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
    console.log("Send api req");
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          resolve(`HTTP error! Status:`, response);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export default sendRegisterRequest;
