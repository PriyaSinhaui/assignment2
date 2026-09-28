const express = require("express");

const router = express.Router();

let students = require("../data/students");

// GET /students
// Get all students
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});


// GET /students/:id
// Get student by ID
router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});


// POST /students
// Add new student
router.post("/", (req, res) => {

    const { name, course, age } = req.body;

    // Validation
    if (!name || !course || !age) {
        return res.status(400).json({
            success: false,
            message: "Name, course and age are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name,
        course,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});


// PUT /students/:id
// Update student
router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, course, age } = req.body;

    if (!name || !course || !age) {
        return res.status(400).json({
            success: false,
            message: "Name, course and age are required"
        });
    }

    students[studentIndex] = {
        id,
        name,
        course,
        age: Number(age)
    };

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: students[studentIndex]
    });
});


// DELETE /students/:id
// Delete student
router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});


module.exports = router;