package edu.jsp.hr_managmentsystem.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.jsp.hr_managmentsystem.entity.Requirement;
import edu.jsp.hr_managmentsystem.entity.Student;
import edu.jsp.hr_managmentsystem.service.RequirementService;
import edu.jsp.hr_managmentsystem.service.RequirementStudentService;

@RestController
@RequestMapping("/api/Requirement")
public class RequirementController {

	@Autowired
	public RequirementService requirementSer;
	
	@Autowired
	public RequirementStudentService requirementStudentSer;

	@PostMapping
	public Requirement createRequirement(@RequestBody Requirement requirement) {
		return requirementSer.createRequirement(requirement);
	}

	@GetMapping("/{id}")
	public Requirement fetchById(@PathVariable Long id) {
		return requirementSer.fetchById(id);
	}

	@GetMapping("/branch/{dealCode}")
	public Requirement fetchByBranchDealCode(@PathVariable String dealCode) {
		return requirementSer.fetchByBranchDealCode(dealCode);
	}

	@GetMapping("/company/{name}")
	public Requirement fetchByComanyName(@PathVariable String name) {
		return requirementSer.fetchByComanyName(name);
	}

	@GetMapping
	public List<Requirement> fetchAllRequirements() {
		return requirementSer.fetchAllRequirements();
	}

	@DeleteMapping("/{id}")
	public String deleteRequirement(@PathVariable long id) {
		return requirementSer.deleteRequirement(id);
	}


	@PostMapping("/mapstd")
	public String   mapStudent(@RequestParam long rid,@RequestParam long sid) {
		return  requirementStudentSer.mapStudent(rid, sid);
	}
	
	@DeleteMapping("/removeStd")
	public String removeStudent(@RequestParam long reqId,@RequestParam long sid) {
		return requirementStudentSer.removeStudent(reqId, sid);
	}
	
	
	@GetMapping("/getStudent/{reqId}")
	public List<Student> fetchStudentByReq(@PathVariable Long reqId) {
	return  requirementStudentSer.fetchStudentByReq(reqId);	
	}
	
	
}
