const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const termRoutes = require("./routes/terms");
const assignmentsRoutes = require("./routes/assignments");
const security = require("./middleware/security");
const morgan = require("morgan");
const { PORT } = require("./config");
const { NotFoundError } = require("./utils/errors");

// instance of express
const app = express();

app.use(cors());

app.use(express.json());
//logs request
app.use(morgan("tiny"));

app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);
app.use("/terms", termRoutes); 


app.use((req, res, next) => {
    return next(new NotFoundError());
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT} 🚀`);
});
