import type { JobEntry } from "./AddJobForm";

interface JobListProps {
  jobs: JobEntry[];
  triggerDelete:(job:JobEntry)=>void
}

export function JobList({ jobs, triggerDelete }: JobListProps) {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No jobs added yet</p>;
  }
  return (
    <div className="mt-8 max-w-md mx-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Job Applications
      </h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border-b pb-2">
            <div>
              <div className="font-medium text-black">
                {job.position} @ {job.company}
              </div>
              <div className="text-sm text-gray-600">Stage: {job.stage}</div>
              {job.dateApplied && (
                <div className="text-sm text-gray-500">
                  Applied on: {job.dateApplied}
                </div>
              )}
            </div>
            <button
              onClick={()=>triggerDelete(job)}
              className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
