// Solar Tech - Script Principal

document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle do Menu Hambúrguer Responsivo
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.header_nav');
    
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('active');
            toggleBtn.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                const icon = toggleBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });

        // Fechar menu ao redimensionar a janela para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                const icon = toggleBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }

    // 2. Destacar link ativo na Navbar
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.header_nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        const pageName = href.substring(href.lastIndexOf('/') + 1);
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

        if (pageName === currentPage || (currentPage === '' && pageName === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 3. Efeito Glassmorphic no Header ao Rolar a Página
    const headerWrapper = document.querySelector('.wrapperContainer-fixed');
    if (headerWrapper) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                headerWrapper.classList.add('scrolled');
            } else {
                headerWrapper.classList.remove('scrolled');
            }
        });
    }
});

// 4. Calculadora de Geração Solar
function principal() {
    const ppwInput = document.getElementById('ppw');
    const m2diaInput = document.getElementById('m2dia');
    const diasmesInput = document.getElementById('diasmes');
    const efisisInput = document.getElementById('efisis');
    const resposta = document.getElementById('resposta');

    if (!ppwInput || !m2diaInput || !diasmesInput || !efisisInput || !resposta) return;

    const ppw = Number(ppwInput.value);
    const m2dia = Number(m2diaInput.value);
    const diasmes = Number(diasmesInput.value);
    const efisis = Number(efisisInput.value);

    if (isNaN(ppw) || isNaN(m2dia) || isNaN(diasmes) || isNaN(efisis) || ppw <= 0 || m2dia <= 0 || diasmes <= 0) {
        resposta.style.display = 'block';
        resposta.className = 'calc-result calc-error';
        resposta.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Por favor, preencha todos os campos com valores válidos.`;
        return;
    }

    // Fórmula: KWH = (W * KWH/M2/DIA * DIASMES * EFISIS) / 1000
    const kwh = (ppw * m2dia * diasmes * efisis) / 1000;

    resposta.style.display = 'block';
    resposta.className = 'calc-result calc-success';
    resposta.innerHTML = `
        <div class="result-badge">
            <i class="fas fa-solar-panel"></i> Geração Estimada
        </div>
        <div class="result-value">${kwh.toFixed(2)} <span class="unit">kWh/mês</span></div>
        <p class="result-desc">Estimativa baseada em ${ppw}Wp de potência com irradiação de ${m2dia} kWh/m²/dia.</p>
    `;
}