package edu.jsp.hr_managmentsystem.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.jsp.hr_managmentsystem.entity.Requirement;
import edu.jsp.hr_managmentsystem.entity.RequirementStudent;
import edu.jsp.hr_managmentsystem.entity.Student;
import edu.jsp.hr_managmentsystem.repository.RequirementRepository;
import edu.jsp.hr_managmentsystem.repository.RequirementStudentRepository;
import edu.jsp.hr_managmentsystem.repository.StudentRepository;

@Service
public class RequirementStudentService {

	@Autowired
	private StudentRepository studentRepo;

	@Autowired
	private RequirementRepository requirementRepo;

	@Autowired
	private RequirementStudentRepository requirementStudentRepo;

	public String mapStudent(long reqId, long stdId) {
		Student s = studentRepo.findById(stdId).orElse(null);
		Requirement r = requirementRepo.findById(reqId).orElse(null);
		if (s != null && r != null) {
			RequirementStudent rs = new RequirementStudent();
			rs.setRequirement(r);
			rs.setStudent(s);
			requirementStudentRepo.save(rs);
			return "student mapped";
		}
		return "Data not found";
	}

	public String removeStudent(long reqId, long sid) {
		Optional<RequirementStudent> o = requirementStudentRepo.fetchRequirementStudent(reqId, sid);
		if (o.isPresent()) {
			requirementStudentRepo.delete(o.get());
			return "student removed";
		}
		return "Data not found";
	}

	public List<Student> fetchStudentByReq(Long reqId) {

		List<RequirementStudent> list = requirementStudentRepo.findByRequirementId(reqId);

		List<Student> students = new ArrayList<>();

		for (RequirementStudent rs : list) {
			students.add(rs.getStudent());
		}
		return students;
	}

}
