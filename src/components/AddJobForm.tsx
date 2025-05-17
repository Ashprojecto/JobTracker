import { useState} from "react";
import type { FormEvent } from "react";

export interface JobEntry{
    id:string,
    company:string,
    position:string,
    stage:"Applied"|"Interview"|"Offer"|"Rejected",
    dateApplied:string
}

interface AddJobFormProps{
    onAddJob:(job:JobEntry)=>void
}

export function AddJobForm({onAddJob}:AddJobFormProps){
    
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [stage, setStage] = useState<JobEntry["stage"]>("Applied")
    const [dateApplied, setDateApplied] = useState("")

    function handleSubmit(e:FormEvent){
        e.preventDefault()

        if(!company.trim() || !position.trim()) return

        onAddJob({
            id:Date.now().toString(),
            company:company.trim(),
            position:position.trim(),
            stage,
            dateApplied
        })

        setCompany("")
        setPosition("")
        setStage("Applied")
        setDateApplied("")

    }

    return(
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-black">Add New Job</h2>
            
            <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company" className="w-full border rounded px-3 py-2" />

            <input type="text" value={position} onChange={(e)=>setPosition(e.target.value)} placeholder="Position" className="w-full border rounded px-3 py-2" />

            <select value={stage} onChange={(e)=>setStage(e.target.value as JobEntry["stage"])} className="w-full border rounded px-3 py-2">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>

            <input type="date" value={dateApplied} onChange={(e)=>setDateApplied(e.target.value)} placeholder="Date" className="w-full border rounded px-3 py-2" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Job
            </button>

        </form>
    )

}