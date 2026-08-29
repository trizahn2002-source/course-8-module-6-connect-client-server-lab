// Load existing events from the back end and render them
fetch("http://127.0.0.1:5000/events")
  .then(response => response.json())
  .then(events => {
    events.forEach(renderEvent);
  });

// Handle the "Add Event" form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const title = titleInput.value;

  fetch("http://127.0.0.1:5000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
    .then(response => response.json())
    .then(newEvent => {
      renderEvent(newEvent);
      titleInput.value = "";
    });
});

// Add one event to the page
function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  document.querySelector("#event-list").appendChild(li);
}