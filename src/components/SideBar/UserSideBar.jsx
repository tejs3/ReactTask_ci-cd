import axios from "axios";
import { useEffect, useState } from "react";

function UserSideBar() {
  const [createdTopics, setCreatedTopics] = useState([]);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get("/api/home_api/");
        setCreatedTopics(data.created_topics || []);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  
    return (
        <div>
        <aside className="w-full md:w-52 p-5 bg-gray-50 border-r border-gray-300 mb-5 md:mb-0 md:mr-5 rounded-md md:rounded-none">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">My Topics</h2>
            {createdTopics.length > 0 ? (
            <ul className="space-y-2">
                {createdTopics.map((topic) => (
                <li
                    key={topic.id}
                    className="bg-white shadow-sm border rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition"
                >
                    <div className="font-medium">{topic.name}</div>
                    <div className="text-sm text-gray-500">
                    Partitions: {topic.partitions}
                    </div>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-500 text-center">
                No topics yet. Create one!
            </p>
            )}
        </aside>
        </div>
    );
}

export default UserSideBar;
