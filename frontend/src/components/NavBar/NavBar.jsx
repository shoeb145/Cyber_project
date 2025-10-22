import React from "react";

function NavBar({ user }) {
  console.log(user, "this is user");
  return (
    <div className="w-full h-16 bg-[#0b121f] flex fixed justify-between items-center px-4 z-20">
      <div className="flex">
        <div>
          <img
            src={user?.avatar}
            alt=""
            className="size-9  object-cover border-b-gray-700"
          />
        </div>

        <p className="text-white ml-3 text-sm self-center">{user?.username}</p>
      </div>

      <div>
        <span className="text-white cursor-pointer" onClick={() => logout()}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default NavBar;
