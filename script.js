let records = [];


// Add Fuel Record
function addFuel() {

    let vehicle =
        document.getElementById("vehicle").value.trim();

    let date =
        document.getElementById("date").value;

    let km =
        parseFloat(document.getElementById("km").value);

    let litres =
        parseFloat(document.getElementById("litres").value);

    let price =
        parseFloat(document.getElementById("price").value);


    // Check fields
    if (
        vehicle === "" ||
        date === "" ||
        isNaN(km) ||
        isNaN(litres) ||
        isNaN(price)
    ) {
        alert("Please fill all fields.");
        return;
    }


    // Check positive values
    if (km < 0 || litres <= 0 || price <= 0) {
        alert("Please enter valid values.");
        return;
    }


    // Check previous KM
    if (records.length > 0) {

        let previousKM =
            records[records.length - 1].km;

        if (km < previousKM) {

            showWarning(
                "⚠️ Current KM reading is smaller than previous reading!"
            );

            return;
        }
    }


    hideWarning();


    // Calculate mileage
    let mileage = 0;

    if (records.length > 0) {

        let previousKM =
            records[records.length - 1].km;

        let distance = km - previousKM;

        mileage = distance / litres;
    }


    // Calculate cost
    let cost = litres * price;


    // Create record
    let record = {

        vehicle: vehicle,
        date: date,
        km: km,
        litres: litres,
        price: price,
        cost: cost,
        mileage: mileage
    };


    // Add record
    records.push(record);


    // Display
    displayRecords();


    // Clear form
    clearForm();
}


// Display Records
function displayRecords() {

    let table =
        document.getElementById("fuelTable");

    table.innerHTML = "";

    let totalMoney = 0;

    let mileages = [];


    records.forEach(function(record, index) {

        totalMoney += record.cost;


        if (record.mileage > 0) {
            mileages.push(record.mileage);
        }


        let row = `
            <tr>

                <td>${record.vehicle}</td>

                <td>${record.date}</td>

                <td>${record.km}</td>

                <td>${record.litres}</td>

                <td>₹${record.price.toFixed(2)}</td>

                <td>₹${record.cost.toFixed(2)}</td>

                <td>
                    ${
                        record.mileage > 0
                        ? record.mileage.toFixed(2) + " km/L"
                        : "First Entry"
                    }
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteRecord(${index})">
                        Delete
                    </button>
                </td>

            </tr>
        `;

        table.innerHTML += row;

    });


    // Total money
    document.getElementById("totalMoney")
        .innerText = totalMoney.toFixed(2);


    // Mileage calculations
    if (mileages.length > 0) {

        let totalMileage =
            mileages.reduce(
                function(sum, value) {
                    return sum + value;
                },
                0
            );


        let average =
            totalMileage / mileages.length;


        let best =
            Math.max(...mileages);


        let worst =
            Math.min(...mileages);


        document.getElementById("averageMileage")
            .innerText = average.toFixed(2);

        document.getElementById("bestMileage")
            .innerText = best.toFixed(2);

        document.getElementById("worstMileage")
            .innerText = worst.toFixed(2);

    } else {

        document.getElementById("averageMileage")
            .innerText = "0";

        document.getElementById("bestMileage")
            .innerText = "0";

        document.getElementById("worstMileage")
            .innerText = "0";
    }
}


// Delete record
function deleteRecord(index) {

    records.splice(index, 1);

    displayRecords();
}


// Warning
function showWarning(message) {

    let warning =
        document.getElementById("warning");

    warning.innerText = message;

    warning.style.display = "block";
}


function hideWarning() {

    document.getElementById("warning")
        .style.display = "none";
}


// Clear form
function clearForm() {

    document.getElementById("vehicle").value = "";

    document.getElementById("date").value = "";

    document.getElementById("km").value = "";

    document.getElementById("litres").value = "";

    document.getElementById("price").value = "";
}