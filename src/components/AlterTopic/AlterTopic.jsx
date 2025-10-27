import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AlterTopic = () => {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newPartitions, setNewPartitions] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/topic/${topicName}/`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setTopic(res.data.topic);
          setNewPartitions(res.data.topic.partitions);
        } else {
          setError(res.data.message || "Failed to load topic details.");
        }
      })
      .catch((err) => {
        console.error("Error fetching topic:", err);
        setError("Error fetching topic details.");
      });
  }, [topicName]);

  const alterTopic = async () => {
    if (!topic)
      return setMessages([{ text: "Topic not loaded yet", type: "error" }]);
    if (!newPartitions)
      return setMessages([{ text: "Enter the number of partitions", type: "error" }]);

    try {
      const res = await axios.patch(`/api/alter_topic_api/${topic.id}/`, {
        new_partition_count: parseInt(newPartitions),
      });

      setMessages([{ text: res.data.message, type: "success" }]);
      if (res.success && res.created_topics) {
        // update Sidebar and other components
        window.dispatchEvent(new CustomEvent("dataUpdated", { detail: { created_topics: res.created_topics } }));
      }
      setTimeout(() => navigate("/admin-dashboard"), 2000);
    } catch (err) {
      console.error("Error altering topic:", err);
      setMessages([{ text: "Error altering topic", type: "error" }]);
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!topic) return <p>Loading...</p>;

  return (
    <div className="max-w-10xl mx-auto font-sans">
      <NavBar />
      <div className="flex flex-col md:flex-row">
        <SideBar />
        <main className="flex-1 p-5 bg-gray-100 rounded-md">
          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 p-3 rounded text-sm font-medium ${
                msg.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {msg.text}
            </div>
          ))}

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Alter Topic: {topic.name}
          </h2>

          <div className="bg-white font-semibold rounded-lg p-5 mb-5 shadow">
            <label className="block text-gray-600 mb-1">
              Number of partitions:
            </label>
            <input
              type="number"
              value={newPartitions}
              onChange={(e) => setNewPartitions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <button
              onClick={alterTopic}
              disabled={!topic}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 m-3 rounded font-medium"
            >
              Alter
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium"
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlterTopic;

// import React, { useEffect, useState } from "react";
// import NavBar from "../NavBar/NavBar";
// import SideBar from "../SideBar/SideBar";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const AlterTopic = () => {
//   const { topicName } = useParams();
//   const navigate = useNavigate();
//   const [topic, setTopic] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newPartitions, setNewPartitions] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`/api/topic/${topicName}/`)
//       .then((res) => {
//         if (res.data.success) {
//           setTopic(res.data.topic);
//           setNewPartitions(res.data.topic.partitions); // pre-fill input  
             
//         } else {
//           setError("Topic not found.");
//           setError(res.data.message || "Failed to alter topic");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching topic:", err);
//         setError("Error fetching topic details.");
//       });
//   }, [topicName]);

//   const alterTopic = () => {
//     if (!topic) return alert("Topic not loaded yet");
//     if (!newPartitions) return setMessages("Enter the number of partitions");
//     if (!topic) return setMessages("Topic not loaded yet");

//     axios.patch(`/api/alter_topic_api/${topic.id}/`, {
//       new_partition_count: parseInt(newPartitions),
//     })
    
//     .then(res => setMessages([{ text: res.data.message, type: "success" }]))
//     .catch(setMessages([{ text: "Error altering topic", type: "error" }]));
//     setTimeout(navigate('/admin-dashboard'),6000)
//   };

//   if (error) return <p className="text-red-600">{error}</p>;
//   if (!topic) return <p>Loading...</p>;

//   return (
//     <div className="max-w-10xl mx-auto font-sans">
//       <NavBar />
//       <div className="flex flex-col md:flex-row">
//         <SideBar />
//         <main className="flex-1 p-5 bg-gray-100 rounded-md">
//           {/* Messages */}
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`mb-3 p-3  rounded text-sm font-medium ${
//                 msg.type === "success"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             Alter Topic: {topic.name}
//           </h2>
//           <div className="bg-white font-semibold rounded-lg p-5 mb-5 shadow">
//             <label className="block text-gray-600 mb-1">Number of partitions:</label>
//             <input
//               type="number"
//               value={newPartitions}
//               onChange={(e) => setNewPartitions(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//             />
//             <br />
//             <button 
//               onClick={alterTopic}
//               disabled={!topic}
//               className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 m-3 rounded font-medium">
//               Alter
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium"
//             >
//               Cancel
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AlterTopic;