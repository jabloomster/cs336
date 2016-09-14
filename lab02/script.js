/**
 * This code creates a Person instance with some methods to describe the person.
 * Also creates a Student instance, which is a sub class of Person to show
 * inheritance, polymorphism, and encapsulation.
 *
 * @author Jesse Bloomster
 * @version Fall 2016
 */


/* Creation of class Person.
 * @param: name, name of person,
 *         birthdate, birthdate of person,
 *         friends, list of friends of person.
 */
function Person(name, birthdate, friends=[]) {
    this.name = name;
    this.birthdate = birthdate;
	this.friends = friends;
}

/* Changes the name of the person.
 * @param: newName, the new name for the person.
 */
Person.prototype.changeName = function(newName) {
    this.name = newName;
}

/* Computes the age of the person based on the birthdate. 
 * Taken from Naveen Jose,
 * http://jsfiddle.net/codeandcloud/n33RJ/
 * @return: the age of the person.
 */
Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/* Adds a friend to the list of friends for the person.
 * @param: friend, the person to be added as a friend.
 */
Person.prototype.addFriend = function(friend) {
	this.friends.push(friend);
}

/* Prints a greeting from the person. */
Person.prototype.greet = function() {
	console.log("I am " + this.name);
}

var p1 = new Person("Jim", "10/9/1950");
console.log(p1);
var p2 = new Person("Mary", "5/8/1996");
console.log(p2);
var p3 = new Person("Donna", "7/14/1980");
p1.changeName("John");
console.log(p1);

console.log(p1.getAge());
console.log(p2.getAge());
console.log(p1.getAge() == p2.getAge());

p1.addFriend(p2);
p1.addFriend(p3);
console.log(p1)

p3.greet();


/* Creation of class Student, which is a subclass of Person.
 * @param: name, name of student,
 *         birthdate, birthdate of student,
 *         friends, list of friends of student,
 *         study, area of subject study.
 */
function Student(name, birthdate, friends=[], study) {
	Person.call(this, name, birthdate, friends);
	this.study = study;
}

// Student inherits all Person class methods.
Student.prototype = Object.create(Person.prototype);

/* Changes the area of study for student.
 * @param: newStudy, the new area of study.
 */
Student.prototype.changeStudy = function(newStudy) {
	this.study = newStudy;
}

/* Prints a greeting from the student */
Student.prototype.greet = function() {
	console.log("I am " + this.name + " and I am a student.");
}

var s1 = new Student("Mark", "5/9/1995", [], "biology");
console.log(s1);
s1.changeName("Kyle");
console.log(s1);
s1.greet();

console.log(s1 instanceof Person)
console.log(s1 instanceof Student)

