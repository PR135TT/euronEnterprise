
        // Simple animation for stats counting
        document.addEventListener('DOMContentLoaded', function() {
            // Animate stats on scroll
            const animateStats = () => {
                const stats = document.querySelectorAll('.stat-item-number');
                
                stats.forEach(stat => {
                    const value = stat.innerText;
                    let suffix = '';
                    
                    if (value.includes('+')) {
                        suffix = '+';
                    }
                    
                    if (value.includes('%')) {
                        suffix = '%';
                    }
                    
                    const targetNumber = parseFloat(value.replace(/[^\d.-]/g, ''));
                    
                    let startValue = 0;
                    const duration = 2000;
                    const startTime = Date.now();
                    
                    const updateNumber = () => {
                        const currentTime = Date.now();
                        const elapsed = currentTime - startTime;
                        
                        if (elapsed < duration) {
                            const progress = elapsed / duration;
                            const currentValue = Math.round(targetNumber * progress * 100) / 100;
                            
                            if (suffix === '%' || (value.includes('.'))) {
                                stat.innerText = currentValue.toFixed(2) + suffix;
                            } else {
                                stat.innerText = Math.floor(currentValue) + suffix;
                            }
                            
                            requestAnimationFrame(updateNumber);
                        } else {
                            stat.innerText = value;
                        }
                    };
                    
                    updateNumber();
                });
            };
            
            // Basic scroll reveal
            const revealElements = () => {
                const elements = document.querySelectorAll('.service-card, .section-title');
                
                elements.forEach(element => {
                    const windowHeight = window.innerHeight;
                    const elementTop = element.getBoundingClientRect().top;
                    
                    if (elementTop < windowHeight - 100) {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Apply initial styles for animation
            const serviceCards = document.querySelectorAll('.service-card, .section-title');
            serviceCards.forEach(card => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            // Trigger animations
            setTimeout(animateStats, 500);
            window.addEventListener('scroll', revealElements);
            revealElements(); // Initial check
        });