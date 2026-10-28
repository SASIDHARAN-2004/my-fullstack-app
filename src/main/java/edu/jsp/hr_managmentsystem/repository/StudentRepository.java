package edu.jsp.hr_managmentsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.jsp.hr_managmentsystem.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

	Optional<Student> findByContactNumber(long cno);

	Optional<Student> findByEmail(String email);

}
