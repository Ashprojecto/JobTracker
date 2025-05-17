import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET all jobs
app.get("/jobs", async (req, res) => {
  const jobs = await prisma.job.findMany();
  res.json(jobs);
});

// POST new job
app.post("/jobs", async (req, res) => {
  const { company, position, stage, dateApplied } = req.body;
  const newJob = await prisma.job.create({
    data: { company, position, stage, dateApplied },
  });
  res.json(newJob);
});

//DELETE jobs
app.delete("/jobs/:id",async(req,res)=>{
  const {id} = req.params
  try{
    await prisma.job.delete({where:{id}})
    res.status(204).send()
  } catch(error){
    res.status(500).json({error:"Failed to delete job"})
  }
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
