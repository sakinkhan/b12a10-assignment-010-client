import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Profile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!displayName.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setIsSaving(true);
      await updateUser({
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null,
      });

      // Update local context user
      setUser({
        ...user,
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || user?.photoURL || null,
      });

      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-[#108251] dark:text-green-400 mb-6 font-primary">
        My Profile
      </h1>

      <div className="w-full bg-base-100 rounded-xl shadow-xl border border-[#108251] p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Avatar and basic info */}
        <div className="flex flex-col items-center justify-center md:w-1/3 space-y-4 ">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-[#22c55e] ring-offset-base-100 ring-offset-2">
              <img
                src={
                  photoURL ||
                  user?.photoURL ||
                  "https://img.icons8.com/?size=96&id=kDoeg22e5jUY&format=png"
                }
                alt="Profile avatar"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold font-primary">
              {user?.displayName || "User"}
            </p>
            <p className="text-sm text-gray-500 font-secondary">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Right: Editable form (full-width within panel) */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 font-primary">
            Profile Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
              <span className="text-xs text-gray-500 mt-1">
                Email cannot be changed from here.
              </span>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-secondary">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600 font-secondary">{success}</p>
            )}

            <button
              type="submit"
              className="btn btn-success rounded-full mt-2 px-8 font-primary"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
