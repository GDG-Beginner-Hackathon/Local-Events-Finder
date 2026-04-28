  function filterByCategory(category) {
        const cards = document.querySelectorAll(".event-card");

        cards.forEach(card => {
          const cardCategory = card.dataset.category;

          if (category === "all" || cardCategory === category) {
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
      const eventData = {
        tech: {
          title: "Tech Meetup",
          location: "📍 Addis Ababa  •  📅 Apr 20",
          img: "assets/images/Tech.png",
          desc: "Join developers, designers and founders for an evening of lightning talks, networking and demos of the latest projects built right here in Addis. Bring your laptop, ideas, and business cards.",
        },
        concert: {
          title: "Live Concert",
          location: "📍 Bole  •  📅 Apr 25",
          img: "assets/images/Concert.png",
          desc: "An unforgettable evening of live music featuring local artists. Enjoy great performances, food stalls, and a vibrant crowd. Doors open at 7:00 PM.",
        },
        church: {
          title: "Church Conference",
          location: "📍 Kazanchis  •  📅 Apr 28",
          img: "https://via.placeholder.com/500x200",
          desc: "A two-day youth conference focused on faith, leadership, and community service. Featuring workshops, worship sessions, and keynote speakers from across Ethiopia.",
        },
        football: {
          title: "Football Tournament",
          location: "📍 Meskel Square  •  📅 May 3",
          img: "assets/images/football.png",
          desc: "Eight local teams compete in a single-day knockout tournament. Come cheer, enjoy street food stalls, and maybe join the mini-skills challenge at halftime. Entry is 50 ETB.",
        },
        poetry: {
          title: "Amharic Poetry Night",
          location: "📍 National Theatre  •  📅 May 8",
          img: "assets/images/poem.png",
          desc: "Celebrate Ethiopian literature with an open-mic poetry evening in Amharic and Tigrinya. New voices welcome — sign up to read at the door. Light refreshments served. 100 ETB entry.",
        },
        dance: {
          title: "Afrobeats Dance Night",
          location: "📍 Sky Bar, Bole  •  📅 May 10",
          img: "assets/images/afrobeat.png",
          desc: "Addis' biggest monthly social night is back — DJ sets, dance battles, and a bar serving cocktails all night. 21+ only. Tickets sell out fast. 150 ETB entry.",
        },
        business: {
          title: "Startup Pitch Night",
          location: "📍 Bole, Addis Ababa  •  📅 May 15",
          img: "assets/images/start-up.png",
          desc: "Ten early-stage startups pitch their ideas to a panel of investors and mentors. Network with founders, investors and the local business community after the pitches. Free entry for audience members. Come early to grab a good seat.",
        },
        health: {
          title: "Wellness & Yoga Morning",
          location: "📍 Entoto Park  •  📅 May 17",
          img: "assets/images/yoga.png",
          desc: "Start your Saturday right with a guided outdoor yoga session followed by a nutrition talk and healthy breakfast. Open to all fitness levels. Bring your mat and a friend for a great morning out in the fresh air of Entoto.",
        },
        gaming: {
          title: "Addis Gaming Tournament",
          location: "📍 Unity Park  •  📅 May 20",
          img: "assets/images/game.png",
          desc: "Compete in FIFA, Mortal Kombat and Call of Duty tournaments with prizes for top players. Casual gaming stations also available for non-competitors. Food and drinks on site all day. Registration is 100 ETB per player.",
        },
        finearts: {
          title: "Ethiopian Fine Arts Exhibition",
          location: "📍 Addis Ababa Museum  •  📅 May 22",
          img: "assets/images/fine-arts.png",
          desc: "A three-day exhibition showcasing paintings, sculptures and photography from over 30 Ethiopian artists. Guided tours available every two hours. Entry is 80 ETB and supports local artists directly. A must-see for art lovers.",
        },
        theatre: {
          title: "National Theatre Play",
          location: "📍 National Theatre, Addis  •  📅 May 25",
          img: "assets/images/theatre.png",
          desc: "A powerful new Amharic play exploring themes of identity, family and modern Ethiopian life. Performed by the National Theatre cast over three nights. Book your seat early as it sells out fast. Tickets are 150 ETB.",
        },
        gospel: {
          title: "Gospel Music Festival",
          location: "📍 Meskel Square  •  📅 May 27",
          img: "https://via.placeholder.com/500x200",
          desc: "A full day of gospel music, worship and community celebration featuring choirs and solo artists from across Ethiopia. Free entry for all. Come with family and friends for an uplifting day of music and community togetherness.",
        },
      };

      function openModal(id) {
        const ev = eventData[id];
        document.getElementById("modal-title").textContent = ev.title;
        document.getElementById("modal-location").textContent = ev.location;
        document.getElementById("modal-desc").textContent = ev.desc;
        document.getElementById("modal-img").src = ev.img;
        const overlay = document.getElementById("modal-overlay");
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      function closeModalDirect() {
        document.getElementById("modal-overlay").style.display = "none";
        document.body.style.overflow = "";
      }

      function closeModal(e) {
        if (e.target === document.getElementById("modal-overlay"))
          closeModalDirect();
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModalDirect();
      });