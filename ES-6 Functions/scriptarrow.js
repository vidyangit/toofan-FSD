let selectedRow = null;

const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = readFormData();

    // Validate form data to check if any field is empty
    if (Object.values(formData).some(value => value.trim() === '')) {
        alert('Please fill in all fields.');
        return; // Exit the function if validation fails
    }

    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}


// Retrieve the data
const readFormData = () => ({
    productCode: document.getElementById("productCode").value,
    product: document.getElementById("product").value,
    qty: document.getElementById("qty").value,
    perPrice: document.getElementById("perPrice").value
});

// Insert the data
const insertNewRecord = (data) => {
    const table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.productCode;
    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.product;
    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.qty;
    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.perPrice;
    const cell5 = newRow.insertCell(4);
    cell5.innerHTML = `
        <button onClick="onEdit(this)">Edit</button>
        <button onClick="onDelete(this)">Delete</button>
    `;
}

// Edit the data
const onEdit = (td) => {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}

const updateRecord = (formData) => {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;
}

// Delete the data
const onDelete = (td) => {
    if (confirm('Do you want to delete this record?')) {
        const row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

// Reset the data
const resetForm = () => {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}
