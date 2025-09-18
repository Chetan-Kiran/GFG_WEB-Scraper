import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

async function getTotalProblemsSolved(username) {
    const url = "https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/"
    const body = {
        handle : username
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

async function getMonthlySubmissions(username, month) {
    const url =
      "https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/";
    const body = {
        handle: username,
        month: month,
        requestType: "getMonthwiseUserSubmissions",
        year: 2025,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
        
    });
    const data = await response.json();
    return data;
}

app.get('/api/problems/:username', async (req, res) => {
    const { username} = req.params;
    const { month } = req.query;
    try{
        const totalproblems = await getTotalProblemsSolved(username);
        const counts = {
            School : Object.keys(totalproblems.result.School || 0).length,
            Basic : Object.keys(totalproblems.result.Basic || 0).length,
            Easy : Object.keys(totalproblems.result.Easy || 0).length,
            Medium : Object.keys(totalproblems.result.Medium || 0).length,
            Hard : Object.keys(totalproblems.result.Hard || 0).length,
            Total : totalproblems.count || 0
        }

        const monthlysubmissions = await getMonthlySubmissions(username, month);
        res.json({
            counts,
            monthlySubmissions: monthlysubmissions.result
        });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
 })

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });