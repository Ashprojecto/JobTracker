import { useState, useEffect } from "react";
import { AddJobForm } from "./components/AddJobForm";
import { JobList } from "./components/JobList";
import type { JobEntry } from "./components/AddJobForm";
import "./App.css"

function App() {
  const [jobs, setJobs] = useState<JobEntry[]>([]);
  const [jobToDelete, setJobToDelete] = useState<JobEntry|null>(null)


  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to load jobs:", err));
  }, []);

 
  async function handleAddJob(newJob: JobEntry) {
    try {
      const res = await fetch('/api/jobs', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      const savedJob = await res.json();
      setJobs((prev) => [savedJob, ...prev]);
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <AddJobForm onAddJob={handleAddJob} />
      <JobList jobs={jobs} triggerDelete={(job)=>setJobToDelete(job)} />
        {jobToDelete &&(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-black">
                Are you sure you want to delete <br/>
                <span className="text-red-600">{jobToDelete.position}</span> @{" "}
                <span className="text-blue-700">{jobToDelete.company}</span>?
              </h3>
              <div className="flex justify-center gap-4">
                <button onClick={()=>setJobToDelete(null)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={async ()=>{
                  try{
                    await fetch(`/api/jobs/${jobToDelete.id}`,{
                      method:"DELETE"
                    })
                    setJobs((prev)=>prev.filter((job)=>job.id !== jobToDelete.id))
                    setJobToDelete(null)
                  } catch(err){
                    console.error("Failed to delete job",err)
                  }
                }} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Delete
                </button>
              </div>
            </div>
          </div>
        )}
    </div> 
    
  );
}

export default App;
