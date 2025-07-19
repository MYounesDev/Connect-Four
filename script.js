(function () {
  // DOM Elements
  const prefixEl = document.querySelector("#prefix");
  const primaryTextEl = document.querySelector(".primary");
  const secondaryTextEl = document.querySelector(".secondary");
  const currentPlayerNameEl = document.querySelector("#current-player");
  const otherPlayerNameEl = document.querySelector("#other-player");
  const playAgainEl = document.querySelector("#play-again");
  const playAgainBtnEl = document.querySelector("#play-again-btn");
  const gameBoardEl = document.querySelector("#board");
  const fullScreenBtnEl = document.querySelector("#btn");
  const soundToggleEl = document.querySelector("#sound-toggle");
  const soundIconEl = document.querySelector("#sound-icon");
  const resetGameEl = document.querySelector("#reset-game");
  const winnerMessageEl = document.querySelector("#winner-message");
  const messageContentEl = document.querySelector(".message-content");
  const confettiContainerEl = document.querySelector(".confetti-container");
  
  // Audio elements
  const dropSound = document.querySelector("#drop-sound");
  const winSound = document.querySelector("#win-sound");
  const drawSound = document.querySelector("#draw-sound");
  const hoverSound = document.querySelector("#hover-sound");
  const clickSound = document.querySelector("#click-sound");
  const celebrationSound = document.querySelector("#celebration-sound");
  
  // Fun emojis for player names
  const playerEmojis = ["🚀", "🦄", "🐯", "🦊", "🐶", "🐱", "🦁", "🐼", "🐨", "🐵"];
  
  // Fun toy emojis for background
  const toyEmojis = ["🎯", "🎪", "🎭", "🎨", "🧸", "🎲", "🎮", "🎡", "🎠", "🧩", "🪀", "🚂", "🏎️", "🦖", "🦕", "🐢", "🦔", "🦜"];
  
  // Create fun floating elements in the background
  function createFloatingElements() {
    const container = document.getElementById("floating-elements");
    const elementTypes = ["star", "bubble", "game-piece", "toy"];
    const count = 25; // Number of floating elements
    
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const element = document.createElement("div");
      const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
      element.classList.add("floating-element", type);
      
      // Random position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      
      // Random speed
      const duration = 15 + Math.random() * 30;
      element.style.animationDuration = `${duration}s`;
      
      // Random delay
      element.style.animationDelay = `${Math.random() * 10}s`;
      
      // Set content based on type
      if (type === "star") {
        element.innerHTML = "⭐";
      } else if (type === "game-piece") {
        const isRed = Math.random() > 0.5;
        element.classList.add(isRed ? "red-piece" : "blue-piece");
      } else if (type === "toy") {
        const randomEmoji = toyEmojis[Math.floor(Math.random() * toyEmojis.length)];
        element.innerHTML = randomEmoji;
      }
      
      container.appendChild(element);
    }
  }
  
  // Add emojis to player names
  function addRandomEmojiToPlayer() {
    const randomEmoji1 = playerEmojis[Math.floor(Math.random() * playerEmojis.length)];
    const randomEmoji2 = playerEmojis[Math.floor(Math.random() * playerEmojis.length)];
    currentPlayerNameEl.textContent = `${randomEmoji1} Player 1`;
    otherPlayerNameEl.textContent = `${randomEmoji2} Player 2`;
  }
  
  // Load game preferences (sound)
  const loadPreferences = () => {
    // Sound preference
    const sound = localStorage.getItem('sound') !== 'off';
    if (!sound) {
      soundIconEl.classList.remove('fa-volume-up');
      soundIconEl.classList.add('fa-volume-mute');
    }
    return { sound };
  };

  // Initialize particles background
  const initParticles = () => {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
        },
        "opacity": {
          "value": 0.5,
          "random": true,
        },
        "size": {
          "value": 3,
          "random": true,
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.8
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  };

  // Create confetti animation
  const createConfetti = () => {
    confettiContainerEl.innerHTML = '';
    const colors = ['#fd79a8', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = confetti.style.width;
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      confetti.style.opacity = Math.random();
      
      // Animation
      confetti.style.animation = `
        fall ${Math.random() * 3 + 2}s linear forwards, 
        sway ${Math.random() * 2 + 3}s ease-in-out infinite alternate
      `;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Define the animation in a style tag
      const style = document.createElement('style');
      const randomX = Math.random() * 100 - 50;
      style.textContent = `
        @keyframes fall {
          to { transform: translateY(100vh) rotate(${Math.random() * 360}deg); }
        }
        @keyframes sway {
          from { transform: translateX(0); }
          to { transform: translateX(${randomX}px); }
        }
      `;
      document.head.appendChild(style);
      
      confettiContainerEl.appendChild(confetti);
    }
  };

  // Show winner message with animation
  const showWinnerMessage = (message) => {
    messageContentEl.textContent = message;
    winnerMessageEl.classList.add('show');
    
    // Create trophy animation
    const trophyAnimation = document.querySelector('.trophy-animation');
    trophyAnimation.innerHTML = '🏆';
    
    // Create starburst effect
    const starBurst = document.createElement('div');
    starBurst.classList.add('star-burst');
    winnerMessageEl.appendChild(starBurst);
    
    // Add additional starbursts with different timings
    setTimeout(() => {
      const starBurst2 = document.createElement('div');
      starBurst2.classList.add('star-burst');
      starBurst2.style.left = '30%';
      starBurst2.style.top = '30%';
      winnerMessageEl.appendChild(starBurst2);
    }, 300);
    
    setTimeout(() => {
      const starBurst3 = document.createElement('div');
      starBurst3.classList.add('star-burst');
      starBurst3.style.left = '70%';
      starBurst3.style.top = '30%';
      winnerMessageEl.appendChild(starBurst3);
    }, 600);
    
    // Play both win sound and celebration sound
    playSound(winSound);
    setTimeout(() => {
      playSound(celebrationSound);
    }, 500);
    
    // Create enhanced confetti with more colors and shapes
    createEnhancedConfetti();
    
    // Change background particles to celebration mode
    celebrationParticles();
    
    setTimeout(() => {
      winnerMessageEl.classList.remove('show');
      
      // Reset all added elements
      trophyAnimation.innerHTML = '';
      const starbursts = document.querySelectorAll('.star-burst');
      starbursts.forEach(star => star.remove());
      
      // Reset particles
      initParticles();
    }, 6000);
  };
  
  // Create enhanced confetti animation for winning
  const createEnhancedConfetti = () => {
    confettiContainerEl.innerHTML = '';
    const colors = ['#fd79a8', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#ff7675', '#00cec9', '#ffeaa7', '#fab1a0', '#81ecec'];
    const shapes = ['circle', 'square', 'triangle', 'heart'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      // Random shape
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.classList.add(shape);
      
      // Random color
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Random position
      confetti.style.left = Math.random() * 100 + '%';
      
      // Random size
      const size = Math.random() * 15 + 5;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      
      // For special shapes
      if (shape === 'heart') {
        confetti.style.backgroundColor = 'transparent';
        confetti.innerHTML = '❤️';
        confetti.style.fontSize = size + 'px';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.borderLeft = size/2 + 'px solid transparent';
        confetti.style.borderRight = size/2 + 'px solid transparent';
        confetti.style.borderBottom = size + 'px solid ' + colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = 'transparent';
      } else if (shape === 'square') {
        // Square is default
      }
      
      // Animation
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      confetti.style.opacity = Math.random();
      
      // Animation
      confetti.style.animation = `
        fall ${Math.random() * 5 + 2}s linear forwards, 
        sway ${Math.random() * 2 + 3}s ease-in-out infinite alternate
      `;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Define the animation in a style tag
      const style = document.createElement('style');
      const randomX = Math.random() * 100 - 50;
      style.textContent = `
        @keyframes fall {
          to { transform: translateY(100vh) rotate(${Math.random() * 360}deg); }
        }
        @keyframes sway {
          from { transform: translateX(0); }
          to { transform: translateX(${randomX}px); }
        }
      `;
      document.head.appendChild(style);
      
      confettiContainerEl.appendChild(confetti);
    }
  };
  
  // Special celebration particles
  const celebrationParticles = () => {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 120,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
        },
        "shape": {
          "type": ["circle", "triangle", "star", "polygon"],
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
        },
        "opacity": {
          "value": 0.7,
          "random": true,
        },
        "size": {
          "value": 6,
          "random": true,
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.3,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 4,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.8
            }
          },
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 8
          }
        }
      },
      "retina_detect": true
    });
  };

  // Game preferences
  let preferences = loadPreferences();
  
  // Event Listeners
  playAgainBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
  
  gameBoardEl.addEventListener("click", placeGamePiece);
  
  currentPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
  otherPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
  
  fullScreenBtnEl.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });
  
  soundToggleEl.addEventListener("click", () => {
    const isSoundOn = preferences.sound;
    
    if (isSoundOn) {
      soundIconEl.classList.remove('fa-volume-up');
      soundIconEl.classList.add('fa-volume-mute');
      localStorage.setItem('sound', 'off');
      preferences.sound = false;
    } else {
      soundIconEl.classList.remove('fa-volume-mute');
      soundIconEl.classList.add('fa-volume-up');
      localStorage.setItem('sound', 'on');
      preferences.sound = true;
    }
  });
  
  resetGameEl.addEventListener("click", () => {
    location.reload();
  });

  const playSound = (sound) => {
    if (preferences.sound && sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Error playing sound:', e));
    }
  };

  // Place game piece and handle game logic
  function placeGamePiece(e) {
    if (e.target.tagName !== "BUTTON") return;
    
    const targetCell = e.target.parentElement;
    const targetRow = targetCell.parentElement;
    const targetRowCells = [...targetRow.children];
    const gameBoardRowsEls = [...document.querySelectorAll("#board tr")];
    
    let x_pos = targetRowCells.indexOf(targetCell);
    let y_pos = gameBoardRowsEls.indexOf(targetRow);
    
    // If clicked on column header button
    if (y_pos === 0 && e.target.classList.contains('column-btn')) {
      x_pos = parseInt(e.target.getAttribute('data-column'));
      y_pos = 0;
    }
    
    y_pos = Game.do.dropToBottom(x_pos, y_pos);
    
    if (Game.check.isPositionTaken(x_pos, y_pos)) {
      alert(Game.config.takenMsg);
      return;
    }
    
    Game.do.addDiscToBoard(x_pos, y_pos);
    
    // Add animation to the placed piece
    const placedPiece = gameBoardRowsEls[y_pos].children[x_pos].firstElementChild;
    placedPiece.classList.add('drop-animation');
    
    // Highlight the column briefly
    const columnCells = gameBoardRowsEls.map(row => row.children[x_pos]);
    columnCells.forEach(cell => {
      cell.classList.add('column-highlight');
      setTimeout(() => cell.classList.remove('column-highlight'), 300);
    });
    
    Game.do.printBoard();
    playSound(dropSound);
    
    if (
      Game.check.isVerticalWin() ||
      Game.check.isHorizontalWin() ||
      Game.check.isDiagonalWin()
    ) {
      gameBoardEl.removeEventListener("click", placeGamePiece);
      prefixEl.textContent = Game.config.winMsg;
      currentPlayerNameEl.contentEditable = false;
      secondaryTextEl.remove();
      playAgainEl.classList.add("show");
      
      // Add winner animation to winning pieces
      const winningCells = document.querySelectorAll('.board button.winning');
      winningCells.forEach(cell => {
        cell.classList.add('winner');
        
        // Create explosion effect around winning pieces
        const explosion = document.createElement('div');
        explosion.classList.add('explosion-effect');
        cell.appendChild(explosion);
        
        // Add glowing effect
        cell.style.boxShadow = '0 0 15px 5px gold, 0 0 30px 10px rgba(255, 215, 0, 0.5)';
        cell.style.zIndex = '100';
        
        // Add spin animation
        cell.animate([
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(360deg) scale(1.2)' },
          { transform: 'rotate(720deg) scale(1)' }
        ], {
          duration: 1500,
          iterations: 2
        });
      });
      
      // Play win sound and show winner message
      playSound(winSound);
      showWinnerMessage(`${Game.config.winMsg} ${currentPlayerNameEl.textContent} 🏆`);
      
      return;
    } else if (Game.check.isGameADraw()) {
      gameBoardEl.removeEventListener("click", placeGamePiece);
      primaryTextEl.textContent = Game.config.drawMsg;
      secondaryTextEl.remove();
      playAgainEl.classList.add("show");
      
      // Play draw sound
      playSound(drawSound);
      
      return;
    }
    
    Game.do.changePlayer();
  }
  
  // Initialize the game
  const init = () => {
    initParticles();
    loadPreferences();
    addRandomEmojiToPlayer();
    createFloatingElements();
    
    // Add fun styling to the column buttons
    const columnButtons = document.querySelectorAll('.column-btn');
    columnButtons.forEach((btn, index) => {
      btn.addEventListener('mouseover', () => {
        btn.style.transform = 'scale(1.2)';
        playSound(hoverSound);
      });
      btn.addEventListener('mouseout', () => {
        btn.style.transform = 'scale(1)';
      });
      btn.addEventListener('click', () => {
        playSound(clickSound);
      });
    });
    
    // Add click sound to reset and play again buttons
    resetGameEl.addEventListener('click', () => {
      playSound(clickSound);
    }, { once: true });
    
    playAgainBtnEl.addEventListener('click', () => {
      playSound(clickSound);
    }, { once: true });
  };
  
  // Start the game
  init();
})();
