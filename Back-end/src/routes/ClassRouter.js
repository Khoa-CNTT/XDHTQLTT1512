const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");
const { authMiddleWare} = require("../middleware/authMiddleware");

router.post("/create", authMiddleWare, ClassController.createClass);
router.get("/get-all", ClassController.getAllClasses);
router.get("/get-class-by-id/:id", ClassController.getClassById);
router.put("/update/:id", authMiddleWare, ClassController.updateClass);
router.delete("/delete/:id", authMiddleWare, ClassController.deleteClass);
router.get("/get-all-students", authMiddleWare, ClassController.getTotalStudentByCourses)
router.get("/get-total-classes", ClassController.getTotalClasses);
router.get("/get-all-by-teacherid/:teacherId", ClassController.getClassesByTeacherId);
router.get("/get-student-in-classes/:classId", ClassController.getStudentsInClass);
router.get("/get-class-by-studentId/:studentId", ClassController.getClassesByStudentId);
router.get("/get-schedule-by-classId/:classId", ClassController.getScheduleByClassId);

module.exports = router;
