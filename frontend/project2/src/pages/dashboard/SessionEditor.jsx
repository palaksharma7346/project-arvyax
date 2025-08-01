
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import debounce from "lodash.debounce";

// export default function SessionEditor() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     tags: "",
//     json_file_url: "",
//   });

//   const [steps, setSteps] = useState([]);
//   const [status, setStatus] = useState("");
//   const [mode, setMode] = useState("manual"); // "manual" or "upload"

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     autoSave();
//   };

//   const addStep = () => {
//     setSteps([...steps, { instruction: "", duration: "" }]);
//   };

//   const updateStep = (index, field, value) => {
//     const updated = [...steps];
//     updated[index][field] = value;
//     setSteps(updated);
//   };

//   const removeStep = (index) => {
//     setSteps(steps.filter((_, i) => i !== index));
//   };

//   const autoSave = debounce(() => {
//     if (mode !== "manual") return;
//     axiosInstance
//       .post(API_PATHS.SESSIONS.SAVE_DRAFT, {
//         ...form,
//         tags: form.tags.split(",").map((t) => t.trim()),
//         _id: id,
//       })
//       .then(() =>
//         setStatus("Draft auto-saved at " + new Date().toLocaleTimeString())
//       )
//       .catch(() => setStatus("Auto-save failed."));
//   }, 5000);

//   const handleJsonUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       try {
//         const json = JSON.parse(event.target.result);
//         const uploadRes = await axiosInstance.post("/api/v1/upload/json", json);
//         const fileUrl = uploadRes.data.json_file_url;

//         setForm({
//           title: json.title || "",
//           tags: json.tags?.join(", ") || "",
//           json_file_url: fileUrl,
//         });

//         alert("JSON uploaded and linked successfully!");
//       } catch (err) {
//         alert("Invalid JSON file.");
//         console.error(err);
//       }
//     };
//     reader.readAsText(file);
//   };

//   const handlePublish = async () => {
//     if (!form.title.trim()) {
//       alert("Title is required.");
//       return;
//     }

//     try {
//       let json_file_url = form.json_file_url;

//       if (mode === "manual") {
//         const sessionJSON = {
//           title: form.title,
//           steps: steps.map((s) => ({
//             instruction: s.instruction.trim(),
//             duration: Number(s.duration),
//           })),
//         };

//         const uploadRes = await axiosInstance.post("/api/v1/upload/json", sessionJSON);
//         json_file_url = uploadRes.data.json_file_url;
//       }

//       const payload = {
//         title: form.title,
//         tags: form.tags.split(",").map((t) => t.trim()),
//         json_file_url,
//         _id: id,
//       };

//       await axiosInstance.post(API_PATHS.SESSIONS.PUBLISH, payload);
//       alert("Session published successfully!");
//       navigate("/my-sessions");
//     } catch (error) {
//       console.error("Error publishing session:", error);
//       alert("Failed to publish session.");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       axiosInstance.get(API_PATHS.SESSIONS.VIEW_SINGLE(id)).then((res) => {
//         const data = res.data;
//         setForm({
//           title: data.title,
//           tags: data.tags.join(", "),
//           json_file_url: data.json_file_url || "",
//         });
//       });
//     }
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Session Editor</h2>

      

//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">Title</label>
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Session Title"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">Tags (comma-separated)</label>
//         <input
//           name="tags"
//           value={form.tags}
//           onChange={handleChange}
//           placeholder="e.g., meditation, sleep"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {mode === "manual" ? (
//         <>
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Session Steps</h3>
//             {steps.map((step, index) => (
//               <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
//                 <label className="block mb-1">
//                   Instruction:
//                   <input
//                     type="text"
//                     value={step.instruction}
//                     onChange={(e) => updateStep(index, "instruction", e.target.value)}
//                     className="w-full mt-1 p-2 border rounded"
//                   />
//                 </label>
//                 <label className="block mt-2">
//                   Duration (seconds):
//                   <input
//                     type="number"
//                     value={step.duration}
//                     onChange={(e) => updateStep(index, "duration", e.target.value)}
//                     className="w-full mt-1 p-2 border rounded"
//                   />
//                 </label>
//                 <button
//                   onClick={() => removeStep(index)}
//                   className="text-red-500 mt-2 underline"
//                 >
//                   Remove Step
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={addStep}
//               className="bg-blue-500 text-white px-3 py-1 mb-5 rounded hover:bg-blue-600"
//             >
//               + Add Step
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Upload JSON File</label>
//           <input
//             type="file"
//             accept=".json"
//             onChange={handleJsonUpload}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       )}
// <div className="mb-4">
//         <button
//           onClick={() => setMode("manual")}
//           className={`mr-2 px-3 py-1 rounded ${mode === "manual" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           Create Manually
//         </button>
//         <button
//           onClick={() => setMode("upload")}
//           className={`px-3 py-1 rounded ${mode === "upload" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           Upload JSON
//         </button>
//       </div>
//       <div className="mt-6">
//         <button
//           onClick={handlePublish}
//           className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//         >
//           Publish
//         </button>
//         <p className="text-sm mt-2 text-gray-600">{status}</p>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState,useCallback,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import debounce from "lodash.debounce";

export default function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    tags: "",
    json_file_url: "",
  });

  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("manual"); // "manual" or "upload"

  

  const addStep = () => {
    setSteps([...steps, { instruction: "", duration: "" }]);
  };

  const updateStep = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const autoSave = useRef(
    debounce(async (formData, stepsData, modeValue, idValue) => {
      if (modeValue !== "manual") return;
      try {
        const res = await axiosInstance.post(API_PATHS.SESSIONS.SAVE_DRAFT, {
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()),
          steps: stepsData,
          _id: idValue || formData._id,
        });
        setStatus("Draft auto-saved at " + new Date().toLocaleTimeString());
        if (!formData._id && res.data._id) {
          setForm((prev) => ({ ...prev, _id: res.data._id }));
          window.history.replaceState(null, "", `/editor/${res.data._id}`);
        }
      } catch {
        setStatus("Auto-save failed.");
      }
    }, 5000)
  );
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
  // Do NOT call autoSave here!
};
useEffect(() => {
  autoSave.current(form,steps);
  // eslint-disable-next-line
}, [form, steps, mode]);
  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const uploadRes = await axiosInstance.post("/api/v1/upload/json", json);
        const fileUrl = uploadRes.data.json_file_url;

        setForm({
          title: json.title || "",
          tags: json.tags?.join(", ") || "",
          json_file_url: fileUrl,
        });

        alert("JSON uploaded and linked successfully!");
      } catch (err) {
        alert("Invalid JSON file.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };
const handlePublish = async () => {
  if (!form.title.trim()) {
    alert("Title is required.");
    return;
  }

  try {
    let json_file_url = form.json_file_url;

    if (mode === "manual") {
      const sessionJSON = {
        title: form.title,
        steps: steps.map((s) => ({
          instruction: s.instruction.trim(),
          duration: Number(s.duration),
        })),
      };
      const uploadRes = await axiosInstance.post("/api/v1/upload/json", sessionJSON);
      json_file_url = uploadRes.data.json_file_url;
    }

    const payload = {
      title: form.title,
      tags: form.tags.split(",").map((t) => t.trim()),
      json_file_url,
      _id:id || form._id, // Use form._id if present
    };

    const res = await axiosInstance.post(API_PATHS.SESSIONS.PUBLISH, payload);
    // Optionally update form._id here as well
    setForm((prev) => ({ ...prev, _id: res.data._id }));
    alert("Session published successfully!");
    navigate("/my-sessions");
  } catch (error) {
    console.error("Error publishing session:", error);
    alert("Failed to publish session.");
  }
};

  useEffect(() => {
    if (id) {
      axiosInstance.get(API_PATHS.SESSIONS.VIEW_SINGLE(id)).then((res) => {
        const data = res.data;
        setForm({
          title: data.title,
          tags: data.tags.join(", "),
          json_file_url: data.json_file_url || "",
           _id: data._id,
        });
      });
    }
  }, [id]);
  return (
  <div className="my-10 px-4 flex flex-col items-center text-center">
    <h2 className="text-3xl font-semibold text-green-800 mb-8">Session Editor</h2>

    <div className="w-full max-w-3xl bg-gradient-to-br from-[#e0f7f1] to-[#fff7ec] border border-gray-200 rounded-xl shadow-md px-6 py-8 text-left">
      
      {/* Mode toggle */}
     

      {/* Title Input */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Session Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      {/* Tags Input */}
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="e.g., meditation, sleep"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>
       <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            mode === "manual"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Create Manually
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            mode === "upload"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Upload JSON
        </button>
      </div>
      {/* JSON Upload */}
      {mode === "upload" && (
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">Upload JSON File</label>
          <input
            type="file"
            accept=".json"
            onChange={handleJsonUpload}
            className="w-full border border-gray-300 p-3 rounded-md"
          />
        </div>
      )}

      {/* Manual Steps Input */}
      {mode === "manual" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Session Steps</h3>

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm"
            >
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instruction</label>
                <input
                  type="text"
                  value={step.instruction}
                  onChange={(e) =>
                    updateStep(index, "instruction", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
                <input
                  type="number"
                  value={step.duration}
                  onChange={(e) =>
                    updateStep(index, "duration", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={() => removeStep(index)}
                className="text-red-500 mt-2 text-sm underline"
              >
                Remove Step
              </button>
            </div>
          ))}

          <button
            onClick={addStep}
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            + Add Step
          </button>
        </div>
      )}

      {/* Publish */}
      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-green-700 transition"
        >
          Publish
        </button>
        <p className="text-sm text-gray-600 mt-2">{status}</p>
      </div>
    </div>
  </div>
);
}