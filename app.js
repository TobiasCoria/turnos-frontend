const API_URL = "http://localhost:5176/api/turnos";

async function createAppointment() {
    const client = document.getElementById("client").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client: client,
            service: service,
            date: date
        })
    });

    document.getElementById("message").innerText =
        response.ok
            ? "Appointment created successfully"
            : "Error creating appointment";

    if (response.ok) {
        loadAppointments();
    }
}

async function loadAppointments() {
    const response = await fetch(API_URL);
    const appointments = await response.json();

    const list = document.getElementById("appointmentList");
    list.innerHTML = "";

    appointments.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${t.cliente}</strong> - ${t.servicio}<br>
            ${new Date(t.fecha).toLocaleString()}<br>
            Status: ${t.estado}
            <div class="actions">
                <button onclick="changeStatus(${t.id}, 'Confirmado')">Confirm</button>
<button onclick="changeStatus(${t.id}, 'Cancelado')">Cancel</button>

            </div>
        `;

        list.appendChild(li);
    });
}

async function changeStatus(id, status) {
    const response = await fetch(`${API_URL}/${id}/estado`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            estado: status
        })
    });

    if (!response.ok) {
        alert("Error updating appointment");
        return;
    }

    await loadAppointments();
}




