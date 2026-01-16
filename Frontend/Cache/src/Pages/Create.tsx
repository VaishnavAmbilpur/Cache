import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import UserContext from "../Global"

const contentTypes = ["video", "twitter", "documents", "links"];

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext)!;
  const [form, setForm] = useState({
    link: "",
    title: "",
    type: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const tagsArray = form.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/content`,
        {
          link: form.link,
          title: form.title,
          type: form.type,
          tags: tagsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg("Content created successfully!");
      setForm({ link: "", title: "", type: "", tags: "" });
      navigate("/");
    } catch (err: any) {
      setMsg("Error creating Content: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-5 hover:bg-white/20 transition-all duration-300"
      >
        <h2 className="text-3xl font-bold mb-4 text-white tracking-tight">Create Content</h2>
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={form.link}
          onChange={handleChange}
          required
          className="border border-white bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 text-white placeholder:text-gray-300 transition-all"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border border-white bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 text-white placeholder:text-gray-300 transition-all"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="border border-white bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 text-white transition-all"
        >
          <option value="">Select Type</option>
          {contentTypes.map((ct) => (
            <option key={ct} value={ct}>{ct.charAt(0).toUpperCase() + ct.slice(1)}</option>
          ))}
        </select>
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border border-white bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 text-white placeholder:text-gray-300 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white/20 border border-white text-white font-semibold px-4 py-3 rounded-lg hover:bg-white/40 transition-all shadow-lg backdrop-blur-md disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
        {msg && (
          <div className="text-center text-sm mt-2 text-white bg-white/10 border border-white/30 rounded-lg p-2">{msg}</div>
        )}
      </form>
    </div>
  );
};

export default Create;