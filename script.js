document.addEventListener('DOMContentLoaded', () => {
    

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });


    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          
            if (window.innerWidth < 768) {
                mainNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });


    const modal = document.getElementById('session-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalTime = document.getElementById('modal-time');
    const modalDetails = document.getElementById('modal-details');

 
    const sessionData = [
        { id: 1, title: 'Financiamento Climático Global', time: 'Segunda-feira, 11 de Novembro | 10:00 - 12:00', details: 'Sessão plenária de alto nível para discutir metas de mobilização de US$ 100 bilhões e o papel dos bancos de desenvolvimento na descarbonização. Foco em Mecanismos Inovadores de Mitigação.' },
        { id: 2, title: 'Transição Energética Justa: Desafios e Soluções', time: 'Terça-feira, 12 de Novembro | 14:30 - 16:30', details: 'Painel sobre o abandono dos combustíveis fósseis, segurança energética e a importância da equidade social no processo de mudança para matrizes renováveis.' },
        
    ];

  
    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', () => {
            const sessionId = parseInt(button.dataset.sessionId);
            const session = sessionData.find(s => s.id === sessionId);

            if (session) {
                modalTitle.textContent = session.title;
                modalTime.textContent = `Horário: ${session.time}`;
                modalDetails.textContent = session.details;
                
           
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });


    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    });

    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });

   
    const form = document.getElementById('registration-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        formMessage.textContent = '';
        formMessage.className = 'form-message'; 
        
        let isValid = true;
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const uf = document.getElementById('uf').value;
        const lgpd = document.getElementById('lgpd').checked;
        const interesses = document.querySelectorAll('input[name="interesse"]:checked');
        
        
        if (nome.length < 3) {
            isValid = false;
            alert('Por favor, insira um nome completo válido (mínimo 3 caracteres).');
            document.getElementById('nome').focus();
            return;
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            alert('Por favor, insira um email válido.');
            document.getElementById('email').focus();
            return;
        }


        if (uf === "") {
            isValid = false;
            alert('Por favor, selecione seu Estado (UF).');
            document.getElementById('uf').focus();
            return;
        }

        if (!lgpd) {
            isValid = false;
            alert('Você deve aceitar os termos da LGPD para enviar a inscrição.');
            document.getElementById('lgpd').focus();
            return;
        }

        if (isValid) {

            formMessage.textContent = 'Inscrição realizada com sucesso! Acompanhe seu email para confirmação.';
            formMessage.classList.add('success');
            form.reset(); 
        } else {
           
            formMessage.textContent = 'Houve um erro no preenchimento. Verifique os campos.';
            formMessage.classList.add('error');
        }
        
    
        formMessage.style.display = 'block';
    });
});