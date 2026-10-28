package edu.jsp.hr_managmentsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.jsp.hr_managmentsystem.entity.Student;
import edu.jsp.hr_managmentsystem.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepo;

	public Student createStudent(Student s) {
		return studentRepo.save(s);
	}

	public Student getStudentById(long id) {
		Optional<Student> o = studentRepo.findById(id);
		return o.isPresent() ? o.get() : null;
	}
	
	public Student getStudentByEmail(String email) {
		Optional<Student> o = studentRepo.findByEmail(email);
		return o.isPresent() ? o.get() : null;
	}
	
	public Student getStudentByContactNumber(long cno) {
		Optional<Student> o = studentRepo.findByContactNumber(cno);
		return o.isPresent() ? o.get() : null;
	}
	
	public List<Student>  getAllStudents(){
		return  studentRepo.findAll();
	}
	
	public  String  deleteStudent(long  id) {
		Optional<Student> o = studentRepo.findById(id);
		if(o.isPresent()) {
			studentRepo.deleteById(id);
			return  "data deleted";
		}
		return "Id not found";
	}

}
