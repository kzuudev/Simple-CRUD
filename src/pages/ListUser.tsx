import { useState, useEffect } from "react";
import axios from "axios";

export default function ListUser() {
  const [user, setUser] = useState([]);

  return (
    <div>
      {/* <h2>Users</h2> */}
      <ul></ul>
    </div>
  );
}
