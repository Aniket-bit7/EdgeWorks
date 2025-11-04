import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await API.get("/profile");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Login to view your profile</p>
      )}
    </div>
  );
}
