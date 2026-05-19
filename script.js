document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Submission
    const form = document.getElementById('waitlist-form');
    const successMsg = document.getElementById('success-message');

    // Initialize Supabase (credentials in gitignored config.js)
    const { url: supabaseUrl, anonKey: supabaseKey } = window.SUPABASE_CONFIG;
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const submitBtn = document.querySelector('#waitlist-form .submit-btn');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (email && email.includes('@')) {
            // Visual loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Joining...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Insert email into Supabase 'waitlist' table
            const { data, error } = await supabase
                .from('waitlist')
                .insert([{ email: email }]);

            if (error) {
                console.error('Supabase Error:', error);
                alert('There was an issue joining the waitlist. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            } else {
                // Show the success modal!
                if (modal) {
                    modal.classList.add('active');
                } else {
                    form.style.display = 'none';
                    if (successMsg) successMsg.classList.remove('hidden');
                }
                
                // Optionally reset the form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // 2. 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (max 5 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // 3. Alive Background Orbs (Parallax)
    const orbs = document.querySelectorAll('.orb');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            // Different orbs move at different speeds
            const speed = (index + 1) * 20; 
            const x = (mouseX * speed) - (speed / 2);
            const y = (mouseY * speed) - (speed / 2);
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // 4. Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic');
    
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move max 20% of distance from center
            magnet.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0px, 0px)';
        });
    }); 
});