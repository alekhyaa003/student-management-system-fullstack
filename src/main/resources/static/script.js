
const API_URL = "http://localhost:8080/students";

function loadStudents() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            let table = document.getElementById("studentTable");

            table.innerHTML = "";

            data.forEach(student => {
                console.log(student);
table.innerHTML += `

    <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.marks}</td>
        <td>
    <button onclick="editStudent(${student.id},
                                '${student.name}',
                                ${student.age},
                                ${student.marks})">
        Edit
    </button>

    <button onclick="deleteStudent(${student.id})">
        Delete
    </button>
</td>
    </tr>
`;
               
            });
        });
}

function addStudent() {

    const student = {

        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        marks: document.getElementById("marks").value
    };

    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })
    .then(() => loadStudents());
}

function deleteStudent(id) {

    fetch(API_URL + "/" + id, {

        method: "DELETE"

    })
    .then(() => loadStudents());
}
let currentId = null;

function editStudent(id, name, age, marks) {

    currentId = id;

    document.getElementById("id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("marks").value = marks;
}

function updateStudent() {

    const student = {

        id: currentId,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        marks: document.getElementById("marks").value
    };

    fetch(API_URL + "/" + currentId, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })
    .then(() => loadStudents());
}

loadStudents();