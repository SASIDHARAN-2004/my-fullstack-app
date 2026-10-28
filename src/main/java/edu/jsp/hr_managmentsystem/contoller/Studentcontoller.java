package edu.jsp.hr_managmentsystem.contoller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import edu.jsp.hr_managmentsystem.entity.Student;
import edu.jsp.hr_managmentsystem.service.StudentService;

@RestController
@RequestMapping("/api/student")
public class Studentcontoller {

	@Autowired
	private StudentService studentSer;
	
	@PostMapping
	public Student createStudent(@RequestBody Student s) {
		return studentSer.createStudent(s);
	}

	@GetMapping("/getByid/{id}")
	public Student getStudentById(@PathVariable long id) {
		return studentSer.getStudentById(id);
	}
	
	@GetMapping("/getbyemail/{email}")
	public Student getStudentByEmail(@PathVariable String email) {
		return studentSer.getStudentByEmail(email);
	}
	
	@GetMapping("/getbyph/{cno}")
	public Student getStudentByContactNumber(@PathVariable long cno) {
		return studentSer.getStudentByContactNumber(cno);
	}
	
	@GetMapping
	public List<Student>  getAllStudents(){
		return  studentSer.getAllStudents();
	}
	
	@DeleteMapping("/{id}")
	public  String  deleteStudent(long  id) {
		return studentSer.deleteStudent(id);
	}
	
}
