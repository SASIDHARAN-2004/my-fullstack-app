package edu.jsp.hr_managmentsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.jsp.hr_managmentsystem.entity.RequirementStudent;

public interface RequirementStudentRepository  extends  JpaRepository<RequirementStudent, Long> {

	@Query(value = "select rs from RequirementStudent rs "
			+ "where rs.requirement.id = ?1  and rs.student.id =?2")
	Optional<RequirementStudent>  fetchRequirementStudent(Long reqid,Long stdId);
	
	List<RequirementStudent>   findByRequirementId(Long id);
	
	
	
}
