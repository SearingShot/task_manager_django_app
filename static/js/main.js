document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Task completion toggle with animation
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskCard = this.closest('.card');
            const taskTitle = taskCard.querySelector('.card-title');
            const taskText = taskCard.querySelector('.card-text');

            if (this.checked) {
                taskTitle.style.textDecoration = 'line-through';
                taskTitle.style.color = '#999';
                taskText.style.opacity = '0.7';
                taskCard.style.transform = 'scale(0.98)';
            } else {
                taskTitle.style.textDecoration = 'none';
                taskTitle.style.color = '';
                taskText.style.opacity = '1';
                taskCard.style.transform = 'scale(1)';
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Alert auto-dismiss
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.3s ease-out';
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Task filter functionality
    const filterButtons = document.querySelectorAll('.task-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            const tasks = document.querySelectorAll('.task-card');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            tasks.forEach(task => {
                switch(filter) {
                    case 'all':
                        task.style.display = 'block';
                        break;
                    case 'completed':
                        task.style.display = task.querySelector('.task-checkbox').checked ? 'block' : 'none';
                        break;
                    case 'active':
                        task.style.display = !task.querySelector('.task-checkbox').checked ? 'block' : 'none';
                        break;
                }
            });
        });
    });
});
