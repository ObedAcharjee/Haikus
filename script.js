function changeText() {
    let title = document.getElementById("text");
    
    // Apply fade-out effect (800ms)
    title.classList.add("fade-out");
    
    setTimeout(() => {
      // Toggle text and apply sparkle if it becomes "Shylla"
      if (title.innerText === "Twilight Bonds") {
        title.innerText = "✨Shylla✨";
        title.classList.add("sparkle");
      } else {
        title.innerText = "Twilight Bonds";
        title.classList.remove("sparkle");
      }
      title.classList.remove("fade-out");
      title.classList.add("fade-in");
    }, 800);
    
    // Remove the fade-in class after the transition
    setTimeout(() => {
      title.classList.remove("fade-in");
    }, 1600);
  }
  
  // Add event listeners to all download buttons
  document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const spinner = document.getElementById('loading-spinner');
    
    downloadButtons.forEach(button => {
      button.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const haikuCard = this.closest('.haiku-card');
        
        // Show loading spinner
        spinner.style.display = 'flex';
        
        // Hide download button temporarily
        this.style.opacity = '0';
        
        // Use dom-to-image-more with an added scale factor to improve resolution
        domtoimage.toPng(haikuCard, {
          quality: 1.0,
          scale: 2, // Scale factor for higher resolution output
          bgcolor: 'rgba(20, 20, 20, 0.85)',
          style: {
            'transform': 'none',
            'border-color': 'rgba(255,255,255,0.1)'
          },
          filter: (node) => {
            // Exclude the download button from the capture
            return node.tagName !== 'BUTTON';
          }
        })
        .then(function(dataUrl) {
          const link = document.createElement('a');
          link.download = `haiku-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
          link.href = dataUrl;
          link.click();
          
          // Hide spinner and show download button again
          spinner.style.display = 'none';
          button.style.opacity = '';
        })
        .catch(function(error) {
          console.error('Error generating image:', error);
          // Fallback to html2canvas if domtoimage fails
          html2canvas(haikuCard, {
            backgroundColor: 'rgba(20, 20, 20, 0.85)',
            scale: 2,
            logging: false,
            useCORS: true,
            onclone: function(clonedDoc) {
              // Remove download button from cloned document before screenshot
              const clonedButton = clonedDoc.querySelector('.download-btn');
              if (clonedButton) {
                clonedButton.style.display = 'none';
              }
            }
          }).then(canvas => {
            const link = document.createElement('a');
            link.download = `haiku-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Hide spinner and show download button again
            spinner.style.display = 'none';
            button.style.opacity = '';
          });
        });
      });
    });
  });
  