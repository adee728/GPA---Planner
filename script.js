function showGpaPopup() {
    document.getElementById('gpaPopup').style.display = 'block';
}

function hideGpaPopup() {
    document.getElementById('gpaPopup').style.display = 'none';
    document.getElementById('courseInputs').innerHTML = `
        <div class="input-group">
            <input type="number" placeholder="Marks (0-100)" min="0" max="100" required>
            <input type="number" placeholder="Credits" min="1" required>
        </div>
    `;
}

function addCourseInput() {
    const courseInputs = document.getElementById('courseInputs');
    const newInput = document.createElement('div');
    newInput.className = 'input-group';
    newInput.innerHTML = `
        <input type="number" placeholder="Marks (0-100)" min="0" max="100" required>
        <input type="number" placeholder="Credits" min="1" required>
    `;
    courseInputs.appendChild(newInput);
}

document.getElementById('gpaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = document.getElementsByClassName('input-group');
    let totalPoints = 0;
    let totalCredits = 0;

    // Function to convert marks to GPA
    function marksToGPA(marks) {
        if (marks >= 90) return 4.0;
        else if (marks >= 85) return 3.7;
        else if (marks >= 80) return 3.3;
        else if (marks >= 75) return 3.0;
        else if (marks >= 70) return 2.7;
        else if (marks >= 65) return 2.3;
        else if (marks >= 60) return 2.0;
        else if (marks >= 50) return 1.0;
        else return 0.0;
    }

    for (let i = 0; i < inputs.length; i++) {
        const marksInput = inputs[i].getElementsByTagName('input')[0];
        const creditInput = inputs[i].getElementsByTagName('input')[1];
        const marks = parseInt(marksInput.value);
        const credits = parseInt(creditInput.value);

        if (isNaN(marks) || marks < 0 || marks > 100) {
            alert('Invalid marks: Please enter a value between 0 and 100.');
            return;
        }
        if (isNaN(credits) || credits < 1) {
            alert('Please enter a valid credit value (minimum 1).');
            return;
        }

        const gpa = marksToGPA(marks);
        totalPoints += gpa * credits;
        totalCredits += credits;

        // Clear inputs after processing
        marksInput.value = '';
        creditInput.value = '';
    }

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('gpaResult').textContent = `GPA: ${gpa}`;
});
