// Get event data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let eventId = urlParams.get('eventId');
    let eventTitle = urlParams.get('title') || 'Event';
    let eventLocation = urlParams.get('location') || 'Addis Ababa';
    let eventDate = urlParams.get('date') || 'Coming Soon';
    let regularPrice = parseInt(urlParams.get('regularPrice')) || 0;
    let vipPrice = regularPrice * 2;  // VIP is 2x regular

    // Function to get regular price (for onclick)
    function getRegularPrice() {
      return regularPrice;
    }

    // Function to get VIP price (for onclick)
    function getVIPPrice() {
      return vipPrice;
    }

    // Display event details
    document.getElementById('event-title').textContent = eventTitle;
    document.getElementById('event-location').innerHTML = `📍 ${eventLocation}`;
    document.getElementById('event-date').innerHTML = `📅 ${eventDate}`;

    // Update ticket prices display
    document.getElementById('regular-price-display').textContent = regularPrice === 0 ? 'FREE' : `${regularPrice} ETB`;
    document.getElementById('vip-price-display').textContent = vipPrice === 0 ? 'FREE' : `${vipPrice} ETB`;

    // Update the data-price attributes on ticket options
    const regularTicketEl = document.querySelector('.ticket-option[data-type="regular"]');
    const vipTicketEl = document.querySelector('.ticket-option[data-type="vip"]');
    
    if (regularTicketEl) {
      regularTicketEl.setAttribute('data-price', regularPrice);
    }
    if (vipTicketEl) {
      vipTicketEl.setAttribute('data-price', vipPrice);
    }

    // Registration state
    let selectedTicket = null;
    let selectedTicketPrice = 0;
    let selectedTicketType = '';
    let ticketQuantity = 1;
    let selectedPayment = null;

    // Select ticket type
    function selectTicket(element, type, price) {
      // Remove selected class from all tickets
      document.querySelectorAll('.ticket-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Add selected class to clicked ticket
      element.classList.add('selected');
      
      selectedTicketType = type;
      selectedTicketPrice = price;
      
      // Show/hide quantity and payment sections based on ticket type
      if (price > 0) {
        document.getElementById('quantity-section').style.display = 'block';
        document.getElementById('total-section').style.display = 'block';
        document.getElementById('payment-section').style.display = 'block';
        updateTotal();
      } else {
        document.getElementById('quantity-section').style.display = 'none';
        document.getElementById('total-section').style.display = 'none';
        document.getElementById('payment-section').style.display = 'none';
        selectedPayment = null;
        // Remove payment selection
        document.querySelectorAll('.payment-option').forEach(opt => {
          opt.classList.remove('selected');
        });
      }
    }

    // Change ticket quantity
    function changeQuantity(delta) {
      let newQty = ticketQuantity + delta;
      if (newQty >= 1 && newQty <= 10) {
        ticketQuantity = newQty;
        document.getElementById('ticket-quantity').value = ticketQuantity;
        updateTotal();
      }
    }

    // Update total price
    function updateTotal() {
      const total = selectedTicketPrice * ticketQuantity;
      document.getElementById('total-price').textContent = total;
    }

    // Select payment method
    function selectPayment(element, method) {
      document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      element.classList.add('selected');
      selectedPayment = method;
    }

    // Process registration
    function processRegistration() {
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const errorDiv = document.getElementById('register-error');
      
      errorDiv.textContent = '';
      
      // Validation
      if (!name || !email || !phone) {
        errorDiv.textContent = '⚠️ Please fill in all personal information fields.';
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        errorDiv.textContent = '⚠️ Please enter a valid email address.';
        return;
      }
      
      if (!selectedTicketType) {
        errorDiv.textContent = '⚠️ Please select a ticket type.';
        return;
      }
      
      if (selectedTicketPrice > 0 && !selectedPayment) {
        errorDiv.textContent = '⚠️ Please select a payment method.';
        return;
      }
      
      // Create registration object
      const registration = {
        id: 'REG_' + Date.now(),
        eventId: eventId,
        eventTitle: eventTitle,
        eventLocation: eventLocation,
        eventDate: eventDate,
        attendeeName: name,
        attendeeEmail: email,
        attendeePhone: phone,
        ticketType: selectedTicketType,
        ticketPrice: selectedTicketPrice,
        quantity: ticketQuantity,
        totalAmount: selectedTicketPrice * ticketQuantity,
        paymentMethod: selectedPayment,
        registrationDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Save to localStorage
      let registrations = JSON.parse(localStorage.getItem('eventfinder_registrations') || '[]');
      registrations.push(registration);
      localStorage.setItem('eventfinder_registrations', JSON.stringify(registrations));
      
      // Also save user's tickets separately for easy access
      let myTickets = JSON.parse(localStorage.getItem('eventfinder_my_tickets') || '[]');
      myTickets.push({
        id: registration.id,
        eventTitle: eventTitle,
        eventDate: eventDate,
        eventLocation: eventLocation,
        ticketType: selectedTicketType,
        quantity: ticketQuantity,
        totalAmount: registration.totalAmount
      });
      localStorage.setItem('eventfinder_my_tickets', JSON.stringify(myTickets));
      
      // Show confirmation modal
      const confirmMsg = `You have successfully registered for "${eventTitle}". ${selectedTicketPrice > 0 ? `Total paid: ${registration.totalAmount} ETB` : 'Free entry confirmed.'}`;
      document.getElementById('confirm-message').textContent = confirmMsg;
      document.getElementById('confirmation-modal').classList.add('show');
      
      // Reset form
      resetForm();
    }
    
    function resetForm() {
      document.getElementById('reg-name').value = '';
      document.getElementById('reg-email').value = '';
      document.getElementById('reg-phone').value = '';
      
      // Reset ticket selection
      document.querySelectorAll('.ticket-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      selectedTicketType = null;
      selectedTicketPrice = 0;
      ticketQuantity = 1;
      selectedPayment = null;
      document.getElementById('ticket-quantity').value = 1;
      document.getElementById('quantity-section').style.display = 'none';
      document.getElementById('total-section').style.display = 'none';
      document.getElementById('payment-section').style.display = 'none';
    }
    
    function closeConfirmation() {
      document.getElementById('confirmation-modal').classList.remove('show');
    }
    
    function closeAndRedirect() {
      closeConfirmation();
      window.location.href = 'my-tickets.html';
    }
    
    // Auto-fill if user is logged in
    function loadUserData() {
      const loggedIn = localStorage.getItem('eventfinder_loggedin');
      if (loggedIn === 'true') {
        const userName = localStorage.getItem('eventfinder_username');
        if (userName) {
          document.getElementById('reg-name').value = userName;
        }
        
        // Try to get user email from signup data
        const userData = localStorage.getItem('eventfinder_user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.email) {
            document.getElementById('reg-email').value = user.email;
          }
        }
      }
    }
    
    // Load user data on page load
    loadUserData();