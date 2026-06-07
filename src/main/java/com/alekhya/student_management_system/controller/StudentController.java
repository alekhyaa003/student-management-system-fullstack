package com.alekhya.student_management_system.controller;

import com.alekhya.student_management_system.entity.Student;
import com.alekhya.student_management_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
    @PutMapping("/students/{id}")
public Student updateStudent(@PathVariable int id,
                             @RequestBody Student updatedStudent) {

    Student student = studentRepository.findById(id).orElse(null);

    if (student != null) {
        student.setName(updatedStudent.getName());
        student.setAge(updatedStudent.getAge());
        student.setMarks(updatedStudent.getMarks());

        return studentRepository.save(student);
    }

    return null;
}
@DeleteMapping("/students/{id}")
public String deleteStudent(@PathVariable int id) {

    studentRepository.deleteById(id);

    return "Student Deleted Successfully";
}
}