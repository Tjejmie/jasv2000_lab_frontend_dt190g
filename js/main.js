import { Atlas } from './atlas.js';
import { RESTDataSource } from './rest-data-source.js';

/** The data source for our Atlas */
//const dataSource = new RESTDataSource("http://localhost:3000");
const dataSource = new RESTDataSource("https://jasv2000-lab2-backend-dt190g.azurewebsites.net");
/** The Atlas instance */
const atlas = new Atlas(dataSource);

/** The name of the page displaying the list of My courses */
const MY_COURSES_PAGE = "my-courses.html";

/** The name of the page curretly beeing displayed */
let currentPage = "index.html";

/** An array of all courses to list on the page. It can be Miun 
 * courses or My courses depending on the current page. */
let courses = [];

/** Limit the number of courses to show on the page.
 * A search will search among all courses in the list.
 */
const limit = 100;

/** Compare two course codes (can be used when sorting a list of courses) */
const courseCodeDescending = (a, b) => a.courseCode > b.courseCode ? 1 : -1;

/** A filter that returns true for courses whose course code or name contains the searched string */
const searchFilter = (course, searchString) => {
	// Search in course code and course name
	const haystack = (
		course.courseCode + "|" + 
		course.name
		).toLowerCase();

	// return false if nothing to search for or if the searched string is found or not
	return searchString == '' || haystack.includes(searchString);
};

/**
 * Handles initialization of the app.
 */
function starterFunction() {
	// Get the name of the current page
	currentPage = window.location.pathname.split("/").find(str => str.includes(".html"));

	// Call searchCourses function on keyup events from the search text input
	document.getElementById("search").addEventListener("keyup", searchCourses);

	

	
	// Get the list of courses from Atlas
	const coursesPromise = currentPage == MY_COURSES_PAGE ? atlas.getMyCourses() : atlas.getCourses();
	coursesPromise
	.then(fetchedCourses => {
		courses = fetchedCourses;
		createTable(); // create the table with the fetched courses
	})
	.catch(error => console.error(`An error occurd when getting courses from Atlas: ${error}`));
	
	if(currentPage == MY_COURSES_PAGE){
		addGradeOption();
	}
}

/**
* Creates the HTML table displaying the courses (either Miun courses or My courses).
*/
function createTable() {
	// The type of course (a Miun course or a My course) to be listed in the table depends
	// on the name of the current location (name of the page). The structure of the table 
	// displaying course data also depends upon this.

	// Descide the function to be used when creaing the HTML tabel
	const tableCreator = currentPage == MY_COURSES_PAGE ? createTableForMyCourses : createTableForMiunCourses;

	// Regardles the type of table to create, sort and filter the courses
	const searchString = document.getElementById("search").value.toLowerCase();

	// Keep the original course array intact by assigning the filterad courses to a new array
	let coursesToList = courses.filter(course => searchFilter(course, searchString));
	coursesToList = coursesToList.sort(courseCodeDescending).slice(0, limit); // limit the number of courses to display

	// Clear any existing data in the table
	const table = document.getElementById("courses_table");
	table.innerHTML = null;
	
	// Create the table 
	// (a call to createTableForMyCourses(courses, table) or createTableForMiunCourses(courses, table))
	tableCreator(coursesToList, table);
}

/**
* Create table rows for all Miun courses in the array.
* @param courses an array of Miun courses to create table rows for
* @param table the table or the table body to add the rows to
*/
function createTableForMiunCourses(courses, table) {
	
	// For each course create a table row with course data
	courses.forEach(course => {
		// Make a table row
		const tr = document.createElement("tr");
		
		// Populate the row with the data to display
		createTd(course.courseCode, tr);
		createTd(course.name, tr);
		createTd(course.progression, tr);
		createTd(course.points, tr);
		createTd(course.institutionCode, tr,
			element => element.classList.add("center"));
		createTd(course.subject, tr);
		// Add the row to the table
		table.appendChild(tr);
	});
}

/**
* Create table rows for all My courses in the array.
* @param courses an array of My courses to create table rows for
* @param table the table or the table body to add the rows to
*/
function createTableForMyCourses(courses, table) {
	

	// Get grades from Atlas and then create the table
	atlas.getGrades().then(grades => {
		
		// For each My course create a table row with course data
		courses.forEach(course => {
			// Make a table row
			const tr = document.createElement("tr");
			
			// Populate the row with the data to display
			createTd(course.courseCode, tr);
			createTd(course.name, tr);
			
			// Create a td to hold the select element for selecting grade
			const td = document.createElement("td");
			td.classList.add("center");

			// Create a select element for the grades that can be selected
			const selectElement = document.createElement("select");
			selectElement.id = "select_" + course.courseCode;

			const deleteButton = document.createElement("span");
			deleteButton.className += "button delete";
			deleteButton.innerText = "radera";
			deleteButton.classList.add("delete-button");
			deleteButton.addEventListener("click", (_) => deleteCourse(course.courseCode))
			document.getElementById("addCourse").addEventListener("click", addCourse);
			// Add each grade as an option in the select element and set
			// the course grade as the selected grade in the list
			createGradeOptions(selectElement, grades, course.grade);
			

			selectElement.addEventListener("change", option => {
				atlas.updateMyCourse(course.courseCode, option.target.value);
			});
			
			td.appendChild(selectElement);
			tr.appendChild(td);
			
			// Add the button to the table row
			tr.appendChild(deleteButton);

			// Add the row to the table
			table.appendChild(tr);

		});
	});
}

function deleteCourse(courseCode){
	atlas.deleteMyCourse(courseCode)
	courses = courses.filter(course => course.courseCode != courseCode)
	createTable();
}

function addGradeOption(){
	const grade = atlas.getGrades();
	grade.then(grades =>{
		const selectElement = document.getElementById("grades");
		createGradeOptions(selectElement, grades);
	})
}

function addCourse(){
	
	const courseCode = document.getElementById("coursecode").value;
	const grade = document.getElementById("grades").value;

	atlas.addMyCourse(courseCode, grade)
		.then(course => { 
			courses.push(course);
			createTable();
		})
}

/**
* Create option elements for the specified select element.
* @param selectElement the select element to create and add option elements for
* @param grades an array of grades to create option elements for
* @param selectedGrade the grade to be the selected option in the selectElement
*/
function createGradeOptions(selectElement, grades, selectedGrade) {
	
	for (const val of grades)
    {
		var option = document.createElement("option");
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
		selectElement.appendChild(option);
		selectElement.value = selectedGrade;
    }
	
}

/**
* Create a data cell (td element) with the specified text
* @param text the text to to be displayed in the data cell
* @param tr the table row to add the data cell to
* @param extra a lambda that handles any extra that needs to be added to the data cell
*/
function createTd(text, tr, extra) {
	const td = document.createElement("td");
	td.innerText = text;
	
	if (extra) {
		extra(td);
	}

	tr.appendChild(td);
}

/**
 * Perform a search for courses matching the text entered in the search input.
 */
function searchCourses() {
	// A re-creation of the table will filter out the courses not matching the searched value
	createTable();
}

document.addEventListener('DOMContentLoaded', starterFunction);
