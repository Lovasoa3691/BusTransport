import React, { useState } from "react";

export default function UserProfile({ user }) {
  const [open, setOpen] = useState(false);

  const getColorForLetter = (letter = "") => {
    const l = letter.toUpperCase();

    if ("ABCD".includes(l)) return "#3b82f6";
    if ("EFGH".includes(l)) return "#ef4444";
    if ("IJKL".includes(l)) return "#22c55e";
    if ("MNOP".includes(l)) return "#a855f7";
    if ("QRST".includes(l)) return "#f97316";
    if ("UVWX".includes(l)) return "#ec4899";
    if ("YZ".includes(l)) return "#eab308";

    return "#6b7280";
  };

  if (!user) return null;

  const initial = `${user.username?.charAt(0)?.toUpperCase()} ${user.username?.split(" ")[1]?.charAt(0)?.toUpperCase() || ""}`;

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 hover:opacity-80 transition"
      >
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: getColorForLetter(initial) }}
        >
          {initial}
        </div>

        {/* User info */}
        <div className="hidden md:flex flex-col text-left">
          <span className="text-sm font-semibold text-gray-200">
            {user.username}
          </span>
          <span className="text-xs text-gray-300">
            {user.role?.toUpperCase()}
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* overlay */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getColorForLetter(initial) }}
              >
                {initial}
              </div>

              <div>
                <p className="font-semibold text-gray-800">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <button
              // onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
            >
              Se déconnecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
