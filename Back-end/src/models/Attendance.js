const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    attendances: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            status: { type: String, required: true, enum: ["present", "absent"] }
        }
    ]
});

module.exports = mongoose.model("Attendance", attendanceSchema);
