document.addEventListener('DOMContentLoaded', () => {
    const videoCorners = document.querySelectorAll('.video-corner');
    const heroContent = document.getElementById('heroContent');
    const videoPopupPlayer = document.getElementById('videoPopupPlayer');
    const popupVideo = document.getElementById('popupVideo');
    const closePopupBtn = document.querySelector('.close-popup-btn');

    videoCorners.forEach(cornerDiv => {
        const videoElement = cornerDiv.querySelector('video');
        const playIcon = cornerDiv.querySelector('.play-icon');
        const muteIcon = cornerDiv.querySelector('.mute-icon');
        const videoOverlay = cornerDiv.querySelector('.video-overlay');

        // hover
        cornerDiv.addEventListener('mouseenter', () => {
            videoElement.play(); // Inicia o vídeo no hover
            videoElement.muted = true; // Garante que esteja mutado
            playIcon.style.display = 'none'; // Oculta o ícone de play
            muteIcon.style.display = 'inline-block'; // Mostra o ícone de mudo
            videoOverlay.style.opacity = '0'; // Faz o overlay desaparecer
        });

        // mouseout
        cornerDiv.addEventListener('mouseleave', () => {
            videoElement.pause(); // Pausa o vídeo
            videoElement.currentTime = 0; // Volta para o início
            playIcon.style.display = 'inline-block'; // Mostra o ícone de play novamente
            muteIcon.style.display = 'none'; // Oculta o ícone de mudo
            videoOverlay.style.opacity = '1'; // Faz o overlay reaparecer
        });

        // Toggle do mudo
        muteIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique propague para o vídeo-corner
            if (videoElement.muted) {
                videoElement.muted = false;
                muteIcon.classList.remove('fa-volume-mute');
                muteIcon.classList.add('fa-volume-up');
            } else {
                videoElement.muted = true;
                muteIcon.classList.remove('fa-volume-up');
                muteIcon.classList.add('fa-volume-mute');
            }
        });

        // Clique no vídeo-corner para abrir o popup
        cornerDiv.addEventListener('click', () => {
            const videoSrc = videoElement.getAttribute('src');
            if (videoSrc) {
                // Pausa o vídeo no canto e oculta o overlay
                videoElement.pause();
                videoElement.currentTime = 0; // Volta para o início
                videoOverlay.style.opacity = '1'; // Garante que o overlay volte para o vídeo que foi clicado

                // Oculta o conteúdo Hero
                heroContent.style.opacity = '0';
                heroContent.style.visibility = 'hidden';
                heroContent.style.transform = 'scale(0.8)';

                // Pequeno delay para a transição de opacidade antes de mostrar o player
                setTimeout(() => {
                    popupVideo.src = videoSrc;
                    popupVideo.muted = false;
                    videoPopupPlayer.classList.add('active');
                    popupVideo.play();
                }, 300); // Tempo igual ou maior que a transition do hero-content
            }
        });
    });

    // Listener para o botão de fechar o popup
    closePopupBtn.addEventListener('click', () => {
        popupVideo.pause();
        popupVideo.src = '';
        
        // Oculta o player de vídeo
        videoPopupPlayer.classList.remove('active');

        // Pequeno delay para a transição de opacidade antes de mostrar o hero-content
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.visibility = 'visible';
            heroContent.style.transform = 'scale(1)'; 
        }, 300); 
    });

    
});