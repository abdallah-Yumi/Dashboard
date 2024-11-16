document.getElementById("upload-excel").addEventListener("change", handleFileUpload);

let excelData = [];

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    console.log("No file selected.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    excelData = XLSX.utils.sheet_to_json(sheet);

    console.log("Parsed Excel Data:", excelData); 
  };

  reader.onerror = (err) => {
    console.error("Error reading file:", err);
  };

  reader.readAsArrayBuffer(file);
}

document.getElementById("search-bar").addEventListener("input", handleSearch);

function handleSearch(event) {
  const query = event.target.value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  if (!resultsContainer) {
    console.error("Search results container not found!");
    return;
  }

  resultsContainer.innerHTML = "";

  if (query === "" || excelData.length === 0) return;

  const filteredResults = excelData
    .map((row, originalIndex) => ({ row, originalIndex }))
    .filter(({ row }) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );

  
  filteredResults.forEach(({ row, originalIndex }) => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("search-result-item");

    
    const fullName = `${row["First Name"] || ""} ${row["Last Name"] || ""}`.trim();

    
    const matchedItem = Object.entries(row).find(([key, value]) =>
      value.toString().toLowerCase().includes(query)
    );

    
    resultDiv.innerHTML = `
      <div><strong>Name:</strong> ${fullName || "N/A"}</div>
      <div><strong>ID:</strong> ${row.No || "N/A"}</div>
      <div><strong>Matched:</strong> ${
        matchedItem ? `${matchedItem[0]}: ${matchedItem[1]}` : "N/A"
      }</div>
    `;

   
    resultDiv.addEventListener("click", () => handleResultClick(originalIndex));

    resultsContainer.appendChild(resultDiv);
  });
}


function handleResultClick(index) {
  const selectedRow = excelData[index];
  console.log("Selected Row:", selectedRow);

  const firstName = selectedRow["First Name"] || "";
  const lastName = selectedRow["Last Name"] || "";
  const fullName = `${firstName} ${lastName}`.trim();

  
  document.getElementById("name-placeholder").textContent = fullName || "[Name]";
  document.getElementById("id-placeholder").textContent = selectedRow.No || "[No]";
  document.getElementById("gender-placeholder").textContent = selectedRow.Gender || "[Gender]";
  document.getElementById("country-placeholder").textContent = selectedRow.Country || "[Country]";
  document.getElementById("variable1-value").textContent = selectedRow.Department || "[Department]";
  document.getElementById("variable2-value").textContent = selectedRow["Start Date"] || "[Start Date]";
  document.getElementById("variable3-value").textContent = selectedRow.Years || "[Years]";
  document.getElementById("variable4-value").textContent = selectedRow["Monthly Salary"] || "[Monthly Salary]";
  document.getElementById("variable5-value").textContent = selectedRow["Overtime Hours"] || "[Overtime Hours]";
}



const ctxBox1 = document.getElementById('chartBox1').getContext('2d');


const chartBox1 = new Chart(ctxBox1, {
  type: 'bar', 
  data: {
    labels: ['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6'], 
    datasets: [{
      label: 'completed:',
      data: [12, 19, 3, 5, 2, 3], 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true, 
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Tasks Completed' 
      }
    },
    scales: {
      y: {
        beginAtZero: true 
      }
    }
  }
});
