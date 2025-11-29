const axios = require("axios");

const BASE = "https://api.clerk.com/v1/users";
const HEADERS = {
  Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
   "Content-Type": "application/json",
};

async function createClerkUser(user) {
  const res = await axios.post(
    BASE,
    {
      email_address: [user.email],
      first_name: user.firstName,
      last_name: user.lastName,
      external_id: user.id,
      password: user.password,   
    },
    { headers: HEADERS }
  );

  return res.data;
}

module.exports = {
  createClerkUser,
};
