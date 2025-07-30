// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { API_PATHS } from '../../utils/apiPaths';
// import debounce from 'lodash.debounce';
// import axiosInstance from '../../utils/axiosInstance';

// export default function SessionEditor() {
//   const { id } = useParams();
//   const [form, setForm] = useState({ title: '', tags: '', json_file_url: '' });
//   const [status, setStatus] = useState('');

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//     autoSave();
//   };

//   const autoSave = debounce(() => {
//     API_PATHS.post('/my-sessions/save-draft', {
//       ...form,
//       tags: form.tags.split(',').map(t => t.trim()),
//       _id: id,
//     }).then(() => setStatus('Auto-saved at ' + new Date().toLocaleTimeString()));
//   }, 5000);

//   const handlePublish = async () => {
//   try {
//     const payload = {
//       title: form.title,
//       tags: form.tags.split(',').map(t => t.trim()),
//       json_file_url: form.json_file_url,
//       _id: id, // needed for editing existing session
//     };

//     console.log("Publishing payload:", payload);

//     const res = await axiosInstance.post(API_PATHS.SESSIONS.PUBLISH, payload);
//     console.log("Publish response:", res.data);

//     if (res.status === 200 || res.status === 201) {
//       alert("Session published successfully!");
//     } else {
//       alert("Failed to publish session.");
//     }
//   } catch (error) {
//     console.error("Error publishing session:", error.response?.data || error.message);
//     alert("Something went wrong while publishing.");
//   }
// };



//   useEffect(() => {
//     if (id) {
//       API_PATHS.get(`/my-sessions/${id}`).then(res => {
//         const data = res.data;
//         setForm({
//           title: data.title,
//           tags: data.tags.join(', '),
//           json_file_url: data.json_file_url,
//         });
//       });
//     }
//   }, [id]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Session Editor</h2>
//       <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="block mb-2" />
//       <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="block mb-2" />
//       <input name="json_file_url" value={form.json_file_url} onChange={handleChange} placeholder="JSON File URL" className="block mb-2" />
//       <button onClick={handlePublish} className="bg-green-500 text-white px-4 py-2">Publish</button>
//       <p className="text-sm mt-2">{status}</p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    autoSave();
  };

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

  const autoSave = debounce(() => {
    if (mode !== "manual") return;
    axiosInstance
      .post(API_PATHS.SESSIONS.SAVE_DRAFT, {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
        _id: id,
      })
      .then(() =>
        setStatus("Draft auto-saved at " + new Date().toLocaleTimeString())
      )
      .catch(() => setStatus("Auto-save failed."));
  }, 5000);

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
        _id: id,
      };

      await axiosInstance.post(API_PATHS.SESSIONS.PUBLISH, payload);
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
        });
      });
    }
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Session Editor</h2>

      

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Session Title"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Tags (comma-separated)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="e.g., meditation, sleep"
          className="w-full p-2 border rounded"
        />
      </div>

      {mode === "manual" ? (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Session Steps</h3>
            {steps.map((step, index) => (
              <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
                <label className="block mb-1">
                  Instruction:
                  <input
                    type="text"
                    value={step.instruction}
                    onChange={(e) => updateStep(index, "instruction", e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </label>
                <label className="block mt-2">
                  Duration (seconds):
                  <input
                    type="number"
                    value={step.duration}
                    onChange={(e) => updateStep(index, "duration", e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </label>
                <button
                  onClick={() => removeStep(index)}
                  className="text-red-500 mt-2 underline"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              onClick={addStep}
              className="bg-blue-500 text-white px-3 py-1 mb-5 rounded hover:bg-blue-600"
            >
              + Add Step
            </button>
          </div>
        </>
      ) : (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Upload JSON File</label>
          <input
            type="file"
            accept=".json"
            onChange={handleJsonUpload}
            className="border p-2 rounded w-full"
          />
        </div>
      )}
<div className="mb-4">
        <button
          onClick={() => setMode("manual")}
          className={`mr-2 px-3 py-1 rounded ${mode === "manual" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Create Manually
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`px-3 py-1 rounded ${mode === "upload" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Upload JSON
        </button>
      </div>
      <div className="mt-6">
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Publish
        </button>
        <p className="text-sm mt-2 text-gray-600">{status}</p>
      </div>
    </div>
  );
}
