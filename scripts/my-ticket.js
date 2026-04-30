    let pendingDeleteId = null;
    
    function loadTickets() {
      const tickets = JSON.parse(localStorage.getItem('eventfinder_my_tickets') || '[]');
      const container = document.getElementById('tickets-list');
      const emptyState = document.getElementById('empty-state');
      
      if (tickets.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
      }
      
      emptyState.style.display = 'none';
      container.innerHTML = tickets.map((ticket, index) => `
        <div class="ticket-card" data-ticket-index="${index}" data-ticket-id="${ticket.id}">
          <button class="delete-ticket-btn" onclick="showDeleteConfirm('${ticket.id}', ${index})">✕</button>
          <div class="ticket-header">
            <h3>${escapeHtml(ticket.eventTitle)}</h3>
            <span class="ticket-badge">${ticket.ticketType.toUpperCase()}</span>
          </div>
          <div class="ticket-details">
            <span>📅 ${ticket.eventDate}</span>
            <span>📍 ${escapeHtml(ticket.eventLocation)}</span>
            <span>🎟️ ${ticket.quantity} ticket(s)</span>
            ${ticket.totalAmount > 0 ? `<span>💰 ${ticket.totalAmount} ETB</span>` : '<span>🎫 Free Entry</span>'}
          </div>
          <button class="add-event-btn" style="margin-top: 10px;" onclick="window.location.href='index.html'">Browse More Events</button>
        </div>
      `).join('');
    }
    
    // Helper function to escape HTML to prevent XSS
    function escapeHtml(str) {
      if (!str) return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    
    // Show delete confirmation dialog
    function showDeleteConfirm(ticketId, index) {
      pendingDeleteId = { ticketId, index };
      document.getElementById('confirm-dialog').classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    
    // Close confirmation dialog
    function closeConfirmDialog() {
      document.getElementById('confirm-dialog').classList.remove('show');
      pendingDeleteId = null;
      document.body.style.overflow = '';
    }
    
    // Confirm and delete ticket
    function confirmDelete() {
      if (!pendingDeleteId) return;
      
      const { ticketId, index } = pendingDeleteId;
      
      // Get current tickets
      let tickets = JSON.parse(localStorage.getItem('eventfinder_my_tickets') || '[]');
      let registrations = JSON.parse(localStorage.getItem('eventfinder_registrations') || '[]');
      
      // Remove from my_tickets
      tickets = tickets.filter(ticket => ticket.id !== ticketId);
      localStorage.setItem('eventfinder_my_tickets', JSON.stringify(tickets));
      
      // Remove from registrations as well
      registrations = registrations.filter(reg => reg.id !== ticketId);
      localStorage.setItem('eventfinder_registrations', JSON.stringify(registrations));
      
      // Close dialog
      closeConfirmDialog();
      
      // Reload the tickets display
      loadTickets();
      
      // Show temporary success message
      showToast('✅ Ticket deleted successfully!');
    }
    
    // Simple toast notification
    function showToast(message) {
      // Create toast element
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #43cea2;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1001;
        animation: fadeInOut 2s ease;
        font-size: 14px;
      `;
      
      document.body.appendChild(toast);
      
      // Remove after 2 seconds
      setTimeout(() => {
        toast.remove();
      }, 2000);
    }
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; bottom: 0px; }
        15% { opacity: 1; bottom: 20px; }
        85% { opacity: 1; bottom: 20px; }
        100% { opacity: 0; bottom: 0px; }
      }
    `;
    document.head.appendChild(style);
    
    // Load tickets when page loads
    loadTickets();