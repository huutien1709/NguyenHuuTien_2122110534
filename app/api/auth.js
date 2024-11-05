const API_URL_REGISTER = "http://localhost/coffee-shop/public/api/register";

export const registerUser = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    const response = await fetch(API_URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về thông tin người dùng đã đăng ký
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const API_URL_LOGIN = "http://localhost/coffee-shop/public/api/login";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về thông tin đăng nhập thành công
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const API_URL_LOGOUT = "http://localhost/coffee-shop/public/api/logout";

export const logoutUser = async () => {
  try {
    const response = await fetch(API_URL_LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về thông tin đăng xuất thành công
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
