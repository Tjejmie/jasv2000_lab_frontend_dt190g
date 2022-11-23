import { DataSource } from "./data-source.js";

/**
 * This class represents a data source where a REST API is used 
 * to get data from.
 * @extends DataSource
 */
export class RESTDataSource extends DataSource {
	/**
	 * Create a new data source with the specified JSON file as its source of data.
	 * @param url the name of the JSON file to be used as source of data
	 */
	constructor(url) {
		super(url);
	}

	/**
 * Get data from the specified endpoint. The endpoint will 
 * be appended to the base URL by the superclass DataSource. Example: 
 * If the base URL is http://localhost:3000 and the endpoint is /api/courses, 
 * the HTTP request will be sent to http://localhost:3000/api/courses.
 * 
 * For any HTTP method but GET, the specified body will be sent with 
 * the request.
 * @param endpoint the endpoint to use, default an empty string ''
 * @param method the HTTP request method to use, default GET
 * @param body the body to be sent with the request, default an empty body {}
 * @return a Promise that resolves with the result of parsing the response 
 * body text as JSON.
 */
	 async getData(endpoint = '', method = 'GET', body = {}) {
		return super.getData(endpoint, method, body) // getData returns a Promise<Response>
		.then(resp => resp.json()); // parses the Response body text as JSON

		
	}
	
	/**
	* Get all Miun courses from the REST API.
	* @return a Promise that resolves to an array of courses
	*/
	async getCourses() {
		// Get data from the endpoint api/courses/

		return this.getData('api/courses/');
	}
	
	/**
	* Get the Miun course with the specified course code from the REST API.
	* @param courseCode the course code of the course to get
	* @return a Promise that resolves to a course object or {} if the course doesn't exist
	*/
	async getCourse(courseCode) {

		return this.getData('api/courses/'+courseCode) || {};
	}

	/**
	* Get all My courses from the REST API.
	* @return a Promise that resolves to an array of My courses (a Miun course with grade included)
	*/
	async getMyCourses() {
		return this.getData('api/courses/my/');
		
	}

	/**
	* Get the My course with the specified course code from the REST API.
	* @param courseCode the course code of the course to get
	* @return a Promise that resolves to a My course object or {} if the course doesn't exist
	*/
	async getMyCourse(courseCode) {
		return this.getData('api/courses/my/'+courseCode) || {};
	}

	/**
	* Add a My course with a grade to the REST API.
	* @param courseCode the course code for the course to be added
	* @param grade the student's grade in the course being added
	* @return a Promise that resolves to a My course object of the course added or an error 
	*         message explaining why the course couldn't be added
	*/
	async addMyCourse(courseCode, grade) {

		return this.getData('api/courses/my/', 'POST', {courseCode, grade})
		|| console.error(error);
	}

	/**
	* Delete a My course from the REST API.
	* @param courseCode the course code for the course to be deleted
	* @return a Promise that resolves to the My course deleted or an error 
	*         message explaining why the course couldn't be deleted
	*/
	async deleteMyCourse(courseCode) {
		return this.getData('api/courses/my/:'+{courseCode}, 'DELETE')
		|| console.error(error);
	}

	/**
	* Update the grade for a My course in the REST API.
	* @param courseCode the course code of the My course to update the grade for
	* @param grade the new grade
	* @return a Promise that resolves to the My course updated or an error 
	*         message explaining why the course's grade couldn't be updated
	*/
	updateMyCourse(courseCode, grade) {
		return this.getData('api/courses/my/:'+{courseCode}, 'PUT', {grade})
		|| console.error(error);
	}

	/**
	* Get all grades in the grade scale from the REST API.
	* @return a Promise that resolves to an array of grades
	*/
	async getGrades() {
		return this.getData('api/grades');
	}
}
