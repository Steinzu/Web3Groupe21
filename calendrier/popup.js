document.addEventListener("DOMContentLoaded", function () {
    const monthYearDisplay = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const eventModal = document.getElementById("eventModal");
    const eventTitleInput = document.getElementById("eventTitle");
    const eventDetailsInput = document.getElementById("eventDetails");
    const addEventButton = document.getElementById("addEventButton");
    const closeModalButton = document.getElementById("closeModalButton");
    const monthlyEventsContainer = document.getElementById("monthlyEvents");
    
    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem("events")) || {};

    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearDisplay.textContent = currentDate.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long"
        });

        calendarDays.innerHTML = "";
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
            calendarDays.appendChild(document.createElement("span"));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("span");
            dayElement.textContent = day;

            const eventDateKey = `${year}-${month + 1}-${day}`;
            if (events[eventDateKey]) {
                dayElement.classList.add("event");
            }
            if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                dayElement.classList.add("current-day");
            }

            dayElement.addEventListener("click", () => openEventModal(eventDateKey));
            calendarDays.appendChild(dayElement);
        }

        displayMonthlyEvents();
    }

    function openEventModal(dateKey) {
        eventModal.style.display = "block";
        eventTitleInput.value = "";
        eventDetailsInput.value = "";
        addEventButton.onclick = () => addEvent(dateKey);
    }

    function closeEventModal() {
        eventModal.style.display = "none";
    }

    function addEvent(dateKey) {
        const title = eventTitleInput.value.trim();
        const details = eventDetailsInput.value.trim();

        if (title) {
            if (!events[dateKey]) events[dateKey] = [];
            events[dateKey].push({ title, details });
            saveEvents();
            updateCalendar();
            closeEventModal();
        }
    }

    function displayMonthlyEvents() {
        monthlyEventsContainer.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        
        Object.keys(events).forEach(dateKey => {
            const [eventYear, eventMonth, eventDay] = dateKey.split("-").map(Number);
            if (eventYear === year && eventMonth === month) {
                events[dateKey].forEach(event => {
                    const eventItem = document.createElement("div");
                    eventItem.classList.add("event-item");
                    eventItem.innerHTML = `
                        <p class="event-date">Date: ${eventDay} ${monthYearDisplay.textContent}</p>
                        <p class="event-title">Titre: ${event.title}</p>
                        <p class="event-details">Détails: ${event.details}</p>
                    `;
                    monthlyEventsContainer.appendChild(eventItem);
                });
            }
        });
    }

    prevMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    closeModalButton.addEventListener("click", closeEventModal);

    updateCalendar();
});
