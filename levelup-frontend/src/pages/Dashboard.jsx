import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  // BACKEND URL
  const API = "https://levelup-backend-a659.onrender.com";

  // AVATAR SYSTEM
  const getAvatar = (level) => {

    if (level >= 10) return "👑";
    if (level >= 5) return "🐉";
    if (level >= 3) return "🐣";
    return "🥚";

  };

  // FETCH HABITS
  const fetchHabits = async () => {
    try {

      const res = await axios.get(
        `${API}/api/habits`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setHabits(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH USER
  const fetchUser = async () => {
    try {

      const res = await axios.get(
        `${API}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchUser();
  }, []);

  // ADD HABIT
  const addHabit = async () => {

    if (!habit.trim()) return;

    try {

      const res = await axios.post(
        `${API}/api/habits`,
        { title: habit },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setHabits([...habits, res.data]);
      setHabit("");

    } catch (error) {
      console.log(error);
    }

  };

  // COMPLETE HABIT
  const completeHabit = async (id) => {

    try {

      await axios.put(
        `${API}/api/habits/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("+10 XP ⚡");

      fetchHabits();
      fetchUser();

    } catch (error) {
      console.log(error);
    }

  };

  // DELETE HABIT
  const deleteHabit = async (id) => {

    try {

      await axios.delete(
        `${API}/api/habits/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchHabits();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold text-center mb-6">
        Dashboard 🎮
      </h1>

      {/* USER LEVEL */}

      {user && (

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            {getAvatar(user.level)}
          </div>

          <h2 className="text-xl font-bold">
            Level {user.level} 🏆
          </h2>

          <p className="mb-2">
            XP: {user.totalXP}
          </p>

          <div className="w-64 bg-slate-700 rounded-full mx-auto">

            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${user.totalXP % 100}%` }}
            ></div>

          </div>

        </div>

      )}

      {/* ADD HABIT */}

      <div className="flex justify-center gap-3 mb-12">

        <input
          type="text"
          placeholder="Enter habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          className="p-3 rounded bg-slate-700 outline-none"
        />

        <button
          onClick={addHabit}
          className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600"
        >
          Add Habit
        </button>

      </div>

      {/* EMPTY STATE */}

      {habits.length === 0 && (
        <p className="text-center text-gray-400 mb-6">
          No habits yet. Start building your streak 🚀
        </p>
      )}

      {/* HABITS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {habits.map((h) => (

          <div
            key={h._id}
            className="bg-slate-800 p-6 rounded-xl shadow-lg text-center"
          >

            <h2 className="text-xl mb-2">
              {h.title}
            </h2>

            <p className="text-orange-400 mb-4">
              🔥 Streak: {h.streak || 0}
            </p>

            <button
              onClick={() => completeHabit(h._id)}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Complete ✅
            </button>

            <button
              onClick={() => deleteHabit(h._id)}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 mt-3"
            >
              Delete 🗑️
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Dashboard;