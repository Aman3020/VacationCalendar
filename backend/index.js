import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 5000;

app.get('/me', (req, res)=>{
    res.status(200).json({
        "msg":"Its me"
    })
})

app.get("/api/holidays", async (req, res) => {
    const { country = "US", year = "2019" } = req.query;

    try {
        const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=${country}&year=${year}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch holidays" });
    }
});


app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
