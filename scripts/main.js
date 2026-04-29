function filterByCategory(category) {
        const cards = document.querySelectorAll(".event-card");

        cards.forEach((card) => {
          const title = card.querySelector("h3").textContent.toLowerCase();

          if (category === "all") {
            card.style.display = "block";
          } else if (
            category === "music" &&
            (title.includes("concert") ||
              title.includes("jazz") ||
              title.includes("music"))
          ) {
            card.style.display = "block";
          } else if (
            category === "religion" &&
            (title.includes("church") ||
              title.includes("gospel") ||
              title.includes("conference"))
          ) {
            card.style.display = "block";
          } else if (
            category === "business" &&
            (title.includes("business") ||
              title.includes("startup") ||
              title.includes("pitch"))
          ) {
            card.style.display = "block";
          } else if (
            category === "tech" &&
            (title.includes("tech") || title.includes("meetup"))
          ) {
            card.style.display = "block";
          } else if (
            category === "health" &&
            (title.includes("health") ||
              title.includes("wellness") ||
              title.includes("yoga"))
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }

      function searchEvents() {
        const query = document
          .getElementById("search-input")
          .value.toLowerCase()
          .trim();
        const cards = document.querySelectorAll(".event-card");

        cards.forEach((card) => {
          const title = card.querySelector("h3").textContent.toLowerCase();
          const location = card
            .querySelector(".card-meta")
            .textContent.toLowerCase();
          const desc = card
            .querySelector(".card-desc")
            .textContent.toLowerCase();

          if (
            title.includes(query) ||
            location.includes(query) ||
            desc.includes(query)
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }

      const categoryEmojis = {
        music: "🎵",
        religion: "⛪️",
        business: "💼",
        tech: "💻",
        health: "❤️",
        sports: "⚽️",
        theatre: "🎭",
        finearts: "🎨",
        gaming: "🎮",
        social: "🎉",
      };

      function openAddEventForm() {
        document
          .getElementById("add-event-overlay")
          .removeAttribute("data-editing");
        document.querySelector("#add-event-overlay h2").textContent =
          "➕ Add New Event";
        document.querySelector(
          "#add-event-overlay button:last-of-type",
        ).textContent = "Add Event";
        document.getElementById("add-event-overlay").style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      function closeAddEventFormDirect() {
        document.getElementById("add-event-overlay").style.display = "none";
        document.body.style.overflow = "";
      }

      function closeAddEventForm(e) {
        if (e.target === document.getElementById("add-event-overlay"))
          closeAddEventFormDirect();
      }
      function editEvent(id, e) {
        e.stopPropagation();
        const ev = eventData[id];
        if (!ev) return;

        document.getElementById("new-event-name").value = ev.title;
        document.getElementById("new-event-category").value = ev.category;
        document.getElementById("new-event-location").value = ev.rawLocation;
        document.getElementById("new-event-date").value = ev.rawDate;
        document.getElementById("new-event-desc").value = ev.desc;

        document
          .getElementById("add-event-overlay")
          .setAttribute("data-editing", id);
        document.querySelector("#add-event-overlay h2").textContent =
          "✏️ Edit Event";
        document.querySelector(
          "#add-event-overlay button:last-of-type",
        ).textContent = "Save Changes";

        document.getElementById("add-event-overlay").style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      function deleteEvent(id, e) {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this event?")) return;

        delete eventData[id];

        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) card.remove();

        saveToLocalStorage();
      }

      function saveToLocalStorage() {
        const userEvents = {};
        Object.keys(eventData).forEach((key) => {
          if (key.startsWith("user_")) {
            userEvents[key] = eventData[key];
          }
        });
        localStorage.setItem("userEvents", JSON.stringify(userEvents));
      }

      function loadFromLocalStorage() {
        const saved = localStorage.getItem("userEvents");
        if (!saved) return;

        const userEvents = JSON.parse(saved);
        const grid = document.querySelector(".event-grid");

        Object.keys(userEvents).forEach((id) => {
          const ev = userEvents[id];
          eventData[id] = ev;

          const emoji = categoryEmojis[ev.category] || "🎉";
          const dateObj = new Date(ev.rawDate);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          const card = document.createElement("div");
          card.className = "event-card";
          card.setAttribute("data-category", ev.category);
          card.setAttribute("data-id", id);
          card.innerHTML = `
      <div class="card-img">${emoji}</div>
      <div class="card-body">
        <h3>${ev.title}</h3>
        <div class="card-meta">
          <span>📅 ${formattedDate}</span>
          <span>📍 ${ev.rawLocation}</span>
        </div>
        <p class="card-desc">${ev.desc}</p>
        <span class="read-more">Read more →</span>
        <div class="user-card-actions">
          <button class="edit-btn" onclick="editEvent('${id}', event)">✏️ Edit</button>
          <button class="delete-btn" onclick="deleteEvent('${id}', event)">🗑️ Delete</button>
        </div>
      </div>
    `;
          card.addEventListener("click", () => openModal(id));
          grid.appendChild(card);
        });
      }

      function submitNewEvent() {
        const name = document.getElementById("new-event-name").value.trim();
        const category = document.getElementById("new-event-category").value;
        const location = document
          .getElementById("new-event-location")
          .value.trim();
        const date = document.getElementById("new-event-date").value;
        const desc = document.getElementById("new-event-desc").value.trim();
        const error = document.getElementById("add-event-error");
        const editingId = document
          .getElementById("add-event-overlay")
          .getAttribute("data-editing");

        error.textContent = "";

        if (!name || !location || !date || !desc) {
          error.textContent = "⚠️ Please fill in all fields.";
          return;
        }

        const emoji = categoryEmojis[category] || "🎉";
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        if (editingId) {
          // UPDATE existing card
          eventData[editingId] = {
            title: name,
            location: "📍 " + location + "  •  📅 " + formattedDate,
            img: "https://via.placeholder.com/500x200",
            desc: desc,
            category: category,
            rawDate: date,
            rawLocation: location,
          };

          const existingCard = document.querySelector(
            `[data-id="${editingId}"]`,
          );
          if (existingCard) {
            existingCard.setAttribute("data-category", category);
            existingCard.querySelector("h3").textContent = name;
            existingCard.querySelector(".card-img").textContent = emoji;
            existingCard.querySelector(".card-desc").textContent = desc;
            existingCard.querySelectorAll(".card-meta span")[0].textContent =
              "📅 " + formattedDate;
            existingCard.querySelectorAll(".card-meta span")[1].textContent =
              "📍 " + location;
          }

          document
            .getElementById("add-event-overlay")
            .removeAttribute("data-editing");
          document.querySelector("#add-event-overlay h2").textContent =
            "➕ Add New Event";
          document.querySelector(
            "#add-event-overlay button:last-of-type",
          ).textContent = "Add Event";
        } else {
          // CREATE new card
          const id = "user_" + Date.now();

          eventData[id] = {
            title: name,
            location: "📍 " + location + "  •  📅 " + formattedDate,
            img: "https://via.placeholder.com/500x200",
            desc: desc,
            category: category,
            rawDate: date,
            rawLocation: location,
            regularPrice: price 
          };

          const grid = document.querySelector(".event-grid");
          const card = document.createElement("div");
          card.className = "event-card";
          card.setAttribute("data-category", category);
          card.setAttribute("data-id", id);
          card.innerHTML = `
      <div class="card-img">${emoji}</div>
      <div class="card-body">
        <h3>${name}</h3>
        <div class="card-meta">
          <span>📅 ${formattedDate}</span>
          <span>📍 ${location}</span>
        </div>
        <p class="card-desc">${desc}</p>
        <span class="read-more">Read more →</span>
        <div class="user-card-actions">
          <button class="edit-btn" onclick="editEvent('${id}', event)">✏️ Edit</button>
          <button class="delete-btn" onclick="deleteEvent('${id}', event)">🗑️ Delete</button>
        </div>
      </div>
    `;
          card.addEventListener("click", () => openModal(id));
          grid.appendChild(card);
        }

        saveToLocalStorage();
        closeAddEventFormDirect();

        document.getElementById("new-event-name").value = "";
        document.getElementById("new-event-location").value = "";
        document.getElementById("new-event-date").value = "";
        document.getElementById("new-event-desc").value = "";
      }

      const eventData = {
        tech: {
          title: "Tech Meetup",
          location: "📍 Addis Ababa  •  📅 Apr 20",
          img: "assets/images/Tech.png",
          desc: "Join developers, designers and founders for an evening of lightning talks, networking and demos of the latest projects built right here in Addis. Bring your laptop, ideas, and business cards.",
          regularPrice: 100
        },
        concert: {
          title: "Live Concert",
          location: "📍 Bole  •  📅 Apr 25",
          img: "assets/images/Concert.png",
          desc: "An unforgettable evening of live music featuring local artists. Enjoy great performances, food stalls, and a vibrant crowd. Doors open at 7:00 PM.",
          regularPrice: 200 
        },
        church: {
          title: "Church Conference",
          location: "📍 Kazanchis  •  📅 Apr 28",
          img: "https://via.placeholder.com/500x200",
          desc: "A two-day youth conference focused on faith, leadership, and community service. Featuring workshops, worship sessions, and keynote speakers from across Ethiopia.",
          regularPrice: 0 
        },
        football: {
          title: "Football Tournament",
          location: "📍 Meskel Square  •  📅 May 3",
          img: "assets/images/football.png",
          desc: "Eight local teams compete in a single-day knockout tournament. Come cheer, enjoy street food stalls, and maybe join the mini-skills challenge at halftime.",
          regularPrice: 50
        },
        poetry: {
          title: "Amharic Poetry Night",
          location: "📍 National Theatre  •  📅 May 8",
          img: "assets/images/poem.png",
          desc: "Celebrate Ethiopian literature with an open-mic poetry evening in Amharic and Tigrinya. New voices welcome — sign up to read at the door. Light refreshments served.",
        regularPrice: 100
        },
        dance: {
          title: "Afrobeats Dance Night",
          location: "📍 Sky Bar, Bole  •  📅 May 10",
          img: "assets/images/afrobeat.png",
          desc: "Addis' biggest monthly social night is back — DJ sets, dance battles, and a bar serving cocktails all night. 21+ only. Tickets sell out fast.",
        regularPrice: 150
        },
        business: {
          title: "Startup Pitch Night",
          location: "📍 Bole, Addis Ababa  •  📅 May 15",
          img: "assets/images/start-up.png",
          desc: "Ten early-stage startups pitch their ideas to a panel of investors and mentors. Network with founders, investors and the local business community after the pitches. Free entry for audience members.",
        regularPrice: 0
        },
        health: {
          title: "Wellness & Yoga Morning",
          location: "📍 Entoto Park  •  📅 May 17",
          img: "assets/images/yoga.png",
          desc: "Start your Saturday right with a guided outdoor yoga session followed by a nutrition talk and healthy breakfast. Open to all fitness levels. Bring your mat and a friend for a great morning out in the fresh air of Entoto.",
        regularPrice: 75
        },
        gaming: {
          title: "Addis Gaming Tournament",
          location: "📍 Unity Park  •  📅 May 20",
          img: "assets/images/game.png",
          desc: "Compete in FIFA, Mortal Kombat and Call of Duty tournaments with prizes for top players. Casual gaming stations also available for non-competitors. Food and drinks on site all day.",
        regularPrice: 100
        },
        finearts: {
          title: "Ethiopian Fine Arts Exhibition",
          location: "📍 Addis Ababa Museum  •  📅 May 22",
          img: "assets/images/fine-arts.png",
          desc: "A three-day exhibition showcasing paintings, sculptures and photography from over 30 Ethiopian artists. Guided tours available every two hours. Support local artists directly.",
        regularPrice: 250
        },
        theatre: {
          title: "National Theatre Play",
          location: "📍 National Theatre, Addis  •  📅 May 25",
          img: "assets/images/theatre.png",
          desc: "A powerful new Amharic play exploring themes of identity, family and modern Ethiopian life. Performed by the National Theatre cast over three nights. Book your seat early as it sells out fast..",
        regularPrice: 150
        },
        gospel: {
          title: "Gospel Music Festival",
          location: "📍 Meskel Square  •  📅 May 27",
          img: "https://via.placeholder.com/500x200",
          desc: "A full day of gospel music, worship and community celebration featuring choirs and solo artists from across Ethiopia. Free entry for all. Come with family and friends for an uplifting day of music and community togetherness.",
        regularPrice: 0
        },
      };
      loadFromLocalStorage();
      function openModal(id) {
        const ev = eventData[id];
        document.getElementById("modal-title").textContent = ev.title;
        document.getElementById("modal-location").textContent = ev.location;
        document.getElementById("modal-desc").textContent = ev.desc;
        document.getElementById("modal-img").src = ev.img;
        
        // Store the event price in a data attribute for the register button
        const registerBtn = document.querySelector("#modal-overlay .register-btn");
        if (registerBtn) {
          registerBtn.setAttribute("data-event-id", id);
          registerBtn.setAttribute("data-regular-price", ev.regularPrice || 0);
          registerBtn.setAttribute("data-event-title", ev.title);
          registerBtn.setAttribute("data-event-location", ev.location);
          registerBtn.setAttribute("data-event-date", extractDateFromLocation(ev.location));
        }
        
        const overlay = document.getElementById("modal-overlay");
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      // Helper function to extract date from location string
      function extractDateFromLocation(locationStr) {
        const dateMatch = locationStr.match(/📅\s*(.+?)(?:\s|$)/);
        return dateMatch ? dateMatch[1] : "TBD";
      }

      function closeModal(e) {
        if (e.target === document.getElementById("modal-overlay"))
          closeModalDirect();
      }

      // Direct close modal function
      function closeModalDirect() {
        document.getElementById('modal-overlay').style.display = 'none';
        document.body.style.overflow = '';
      }

      // Also close modal with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeModalDirect();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModalDirect();
      });

      function redirectToRegistration() {
          const modalTitle = document.getElementById('modal-title').textContent;
          const modalLocation = document.getElementById('modal-location').textContent;
          
          // Extract just the location without the emoji and extra text
          let locationText = modalLocation.replace('📍', '').replace('•', '').trim();
          let dateText = '';
          
          // Try to extract date from location string (format: "📍 Addis Ababa • 📅 Apr 20")
          const dateMatch = modalLocation.match(/📅\s*(.+?)(?:\s|$)/);
          if (dateMatch) {
            dateText = dateMatch[1];
            locationText = locationText.replace(/•\s*📅.*$/, '').trim();
          }
          
          // Get event ID from the card (you'll need to set this when creating cards)
          let eventId = 'event_' + Date.now();
          const activeCard = document.querySelector('.event-card:hover');
          if (activeCard && activeCard.getAttribute('data-id')) {
            eventId = activeCard.getAttribute('data-id');
          }
          
          window.location.href = `register.html?eventId=${encodeURIComponent(eventId)}&title=${encodeURIComponent(modalTitle)}&location=${encodeURIComponent(locationText)}&date=${encodeURIComponent(dateText)}`;
        }

        function redirectToRegistrationWithPrice(button) {
          const eventId = button.getAttribute("data-event-id");
          const eventTitle = button.getAttribute("data-event-title");
          const eventLocation = button.getAttribute("data-event-location");
          const eventDate = button.getAttribute("data-event-date");
          const regularPrice = parseInt(button.getAttribute("data-regular-price")) || 0;
          
          // Clean up location (remove emoji and date)
          let cleanLocation = eventLocation.replace('📍', '').replace(/•\s*📅.*$/, '').trim();
          
          window.location.href = `register.html?eventId=${encodeURIComponent(eventId)}&title=${encodeURIComponent(eventTitle)}&location=${encodeURIComponent(cleanLocation)}&date=${encodeURIComponent(eventDate)}&regularPrice=${regularPrice}`;
        }