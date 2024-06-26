document.addEventListener('DOMContentLoaded', function() {
    const starRating = document.getElementById('starRating1'); // Altere o ID conforme necessário para cada página
    const stars = starRating.querySelectorAll('.star');
    const submitButton = document.getElementById('submitRating1'); // Altere o ID conforme necessário para cada página
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            highlightStars(selectedRating);
            checkSubmitButton();
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    function checkSubmitButton() {
        if (selectedRating > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    submitButton.addEventListener('click', () => {
        const filme = starRating.parentElement.querySelector('h1').textContent.trim(); // Nome do filme
        const avaliacao = { filme, estrelas: Number(selectedRating) };

        fetch('/avaliar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliacao)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Exibir mensagem de retorno
            resetRating(); // Limpar a seleção de estrelas
        })
        .catch(error => {
            console.error('Erro ao enviar avaliação:', error);
        });
    });

    function resetRating() {
        selectedRating = 0;
        highlightStars(selectedRating);
        submitButton.disabled = true; // Desabilitar o botão após enviar a avaliação
    }
});
