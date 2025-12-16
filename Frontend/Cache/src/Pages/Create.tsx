import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const contentTypes = ["video", "twitter", "documents", "links"];

const Create: React.FC = () => {
  const navigate = useNavigate();
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

      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api.v1/content",
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
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col gap-5 border border-gray-600 animate-gradient-move bg-[length:200%_200%]"
      >
        <h2 className="text-2xl font-bold mb-2 text-white tracking-tight">Create Content</h2>
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={form.link}
          onChange={handleChange}
          required
          className="border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white placeholder:text-gray-400 transition"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white placeholder:text-gray-400 transition"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white transition"
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
          className="border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white placeholder:text-gray-400 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-br from-modern-blue-200 to-modern-blue-400 text-modern-blue-900 font-semibold px-4 py-2 rounded-xl hover:from-modern-blue-300 hover:to-modern-blue-500 transition-all shadow-md"
        >
          {loading ? "Creating..." : "Create"}
        </button>
        {msg && (
          <div className="text-center text-sm mt-2 text-modern-blue-700">{msg}</div>
        )}
      </form>
    </div>
  );
};

export default Create;