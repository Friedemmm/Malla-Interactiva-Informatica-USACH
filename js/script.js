// Variables globales
const container = document.getElementById('mallaContainer');
const statsContainer = document.getElementById('statsContainer');
const carreraTitle = document.getElementById('carrera-title');
const botones = document.querySelectorAll('.nav-button');

// Estado global para manejar ramos aprobados
let ramosAprobados = new Set();
let carreraActual = 'ejecucion';
let ramosConvalidados = new Set();

// Función para generar estadísticas
function generateStats(carrera) {
    const data = mallas[carrera];
    const totalSemestres = data.length;
    const totalRamos = data.reduce((total, semestre) => total + semestre.ramos.length, 0);
    const ramosAprobadosCount = ramosAprobados.size + ramosConvalidados.size;
    const porcentajeCompleto = Math.round((ramosAprobadosCount / totalRamos) * 100);
    
    const semestresCompletados = data.filter(semestre => 
        semestre.ramos.every(ramo => 
            ramosAprobados.has(ramo.nombre) || ramosConvalidados.has(ramo.nombre)
        )
    ).length;
    
    const semestresRestantes = totalSemestres - semestresCompletados;
    const añosRestantes = semestresRestantes / 2;
    const añosRestantesTexto = añosRestantes % 1 === 0 
        ? `${añosRestantes}` 
        : `${Math.floor(añosRestantes)}.5`;
            
    return `
    <div class="stat-item">
        <div class="stat-number">${añosRestantesTexto}</div>
        <div class="stat-label">Años Faltantes</div>
    </div>
    <div class="stat-item">
        <div class="stat-number">${semestresRestantes}</div>
        <div class="stat-label">Semestres Restantes</div>
    </div>
    <div class="stat-item">
        <div class="stat-number">${semestresCompletados}</div>
        <div class="stat-label">Semestres Completados</div>
    </div>
    <div class="stat-item">
        <div class="stat-number">${ramosAprobadosCount}/${totalRamos}</div>
        <div class="stat-label">Ramos Aprobados</div>
    </div>
    <div class="stat-item">
        <div class="stat-number">${porcentajeCompleto}%</div>
        <div class="stat-label">Progreso</div>
    </div>
    `;
}

function puedeTomarRamo(ramo) {
    if (ramo.prerrequisitos.length === 0) {
        return true;
    }
    return ramo.prerrequisitos.every(prereq => ramosAprobados.has(prereq) || ramosConvalidados.has(prereq));
}

function getEstadoRamo(ramo) {
    if (ramosConvalidados.has(ramo.nombre)) {
        return 'convalidado';
    } 
    else if (ramosAprobados.has(ramo.nombre)) {
        return 'aprobado';
    } 
    else if (puedeTomarRamo(ramo)) {
        return 'disponible';
    } 
    else {
        return 'bloqueado';
    }
}

function desaprobarRamosCascada(ramoDesaprobado) {
    const data = mallas[carreraActual];
    const ramosADesaprobar = [];
            
    data.forEach(semestre => {
        semestre.ramos.forEach(ramo => {
            if ((ramosAprobados.has(ramo.nombre) || ramosConvalidados.has(ramo.nombre)) && 
                ramo.prerrequisitos.includes(ramoDesaprobado)) {
                ramosADesaprobar.push(ramo.nombre);
            }
        });
    });
            
    ramosADesaprobar.forEach(nombreRamo => {
        ramosAprobados.delete(nombreRamo);
        ramosConvalidados.delete(nombreRamo);
        desaprobarRamosCascada(nombreRamo);
    });
}

function handleRamoClick(ramo) {
    const estado = getEstadoRamo(ramo);
    
    if (estado === 'convalidado') {
        ramosConvalidados.delete(ramo.nombre);
        desaprobarRamosCascada(ramo.nombre);
    } 
    else if (estado === 'aprobado') {
        ramosAprobados.delete(ramo.nombre);
        desaprobarRamosCascada(ramo.nombre);
    } 
    else if (estado === 'disponible') {
        ramosAprobados.add(ramo.nombre);
    }
    
    renderMalla(carreraActual);
}

function semestreTieneRamosDisponibles(semestre) {
    return semestre.ramos.some(ramo => 
        puedeTomarRamo(ramo) && !ramosAprobados.has(ramo.nombre) && !ramosConvalidados.has(ramo.nombre)
    );
}

function marcarTodoSemestre(semestre) {
    semestre.ramos.forEach(ramo => {
        if (puedeTomarRamo(ramo)) {
            ramosAprobados.add(ramo.nombre);
        }
    });
    renderMalla(carreraActual);
}

function desmarcarTodoSemestre(semestre) {
    const ramosDelSemestre = semestre.ramos.map(ramo => ramo.nombre);
    ramosDelSemestre.forEach(nombre => {
        if (ramosAprobados.has(nombre)) {
            ramosAprobados.delete(nombre);
            desaprobarRamosCascada(nombre);
        }
        if (ramosConvalidados.has(nombre)) {
            ramosConvalidados.delete(nombre);
            desaprobarRamosCascada(nombre);
        }
    });
    renderMalla(carreraActual);
}

function renderMalla(carrera) {
    carreraActual = carrera;
    container.innerHTML = '';
    carreraTitle.textContent = `${carreraTitles[carrera]}`;
        
    mallas[carrera].forEach((bloque, index) => {
        const semestreDiv = document.createElement('div');
        semestreDiv.className = 'semester-card';
                
        const title = document.createElement('h3');
        title.className = 'semester-title';
        title.innerHTML = `
            <span class="semester-number">${index + 1}</span>
            ${bloque.semestre}
        `;
        semestreDiv.appendChild(title);

        const botonesContainer = document.createElement('div');
        botonesContainer.className = 'semester-buttons';

        const completarBtn = document.createElement('button');
        completarBtn.className = 'complete-semester-btn';
        completarBtn.textContent = '✓ Marcar Todo';

        const limpiarBtn = document.createElement('button');
        limpiarBtn.className = 'clear-semester-btn';
        limpiarBtn.textContent = '✗ Desmarcar Todo';

        const tieneRamosDisponibles = semestreTieneRamosDisponibles(bloque);
        const tieneRamosAprobados = bloque.ramos.some(ramo => 
            ramosAprobados.has(ramo.nombre) || ramosConvalidados.has(ramo.nombre)
        );

        completarBtn.disabled = !tieneRamosDisponibles;
        limpiarBtn.disabled = !tieneRamosAprobados;

        completarBtn.addEventListener('click', () => marcarTodoSemestre(bloque));
        limpiarBtn.addEventListener('click', () => desmarcarTodoSemestre(bloque));

        botonesContainer.appendChild(completarBtn);
        botonesContainer.appendChild(limpiarBtn);
        semestreDiv.appendChild(botonesContainer);

        const ramosContainer = document.createElement('ul');
        ramosContainer.className = 'subject-list';

        bloque.ramos.forEach(ramo => {
            const ramoItem = document.createElement('li');
            const estado = getEstadoRamo(ramo);
                    
            ramoItem.className = `subject-item ${estado}`;
                    
            let tooltipHtml = '';
            if (estado === 'bloqueado' && ramo.prerrequisitos.length > 0) {
                tooltipHtml = `<div class="prerequisite-tooltip">Prerrequisitos: ${ramo.prerrequisitos.join(', ')}</div>`;
            }
                    
            ramoItem.innerHTML = `
                <span class="subject-code">${ramo.codigo}</span>
                ${ramo.nombre}
                ${tooltipHtml}
            `;
                    
            if (estado !== 'bloqueado') {
                ramoItem.addEventListener('click', () => handleRamoClick(ramo));
            }
                    
            ramosContainer.appendChild(ramoItem);
        });

        semestreDiv.appendChild(ramosContainer);
        container.appendChild(semestreDiv);
    });
            
    statsContainer.innerHTML = generateStats(carrera);
}

function resetProgress() {
    ramosAprobados.clear();
    ramosConvalidados.clear();
    renderMalla(carreraActual);
}

function aplicarConvalidacion() {
    const ramosConvalidadosLista = [
        'Paradigmas de Programación',
        'Estructura de Computadores',
        'Inglés III',
        'Fundamentos de Ingeniería de Software',
        'Análisis de Algoritmos y Estructura de Datos',
        'Base de Datos',
        'Organización de Computadores',
        'Inglés IV',
        'Redes de Computadores',
        'Sistemas Operativos',
        'Ingeniería de Sistemas',
        'Evaluación de Proyectos',
        'Tópicos de Especialidad IV',
        'Proyecto de Ingeniería de Software'
    ];
    
    ramosAprobados.clear();
    ramosConvalidados.clear();
    
    ramosConvalidadosLista.forEach(ramo => {
        ramosConvalidados.add(ramo);
    });
    
    renderMalla(carreraActual);
}

function initializeProgress() {
    const primerSemestre = mallas[carreraActual][0];
    primerSemestre.ramos.forEach(ramo => {
        if (ramo.prerrequisitos.length === 0) {
            // Los ramos están disponibles por defecto
        }
    });
}

// Event listeners para navegación
botones.forEach(btn => {
    btn.addEventListener('click', () => {
        botones.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        ramosAprobados.clear();
        ramosConvalidados.clear();
        
        const convalidacionContainer = document.getElementById('convalidacionContainer');
        const convalidacionToggle = document.getElementById('convalidacionToggle');
        const advertenciaRequisitos = document.getElementById('advertenciaRequisitos');
        
        if (btn.dataset.carrera === 'prosecucion') {
            convalidacionContainer.style.display = 'flex';
            advertenciaRequisitos.style.display = 'block';
            convalidacionToggle.classList.remove('active');
        } else {
            convalidacionContainer.style.display = 'none';
            advertenciaRequisitos.style.display = 'none';
            convalidacionToggle.classList.remove('active');
        }
        
        renderMalla(btn.dataset.carrera);
    });
});

// Configurar toggle de convalidación
const convalidacionContainer = document.getElementById('convalidacionContainer');
const convalidacionToggle = document.getElementById('convalidacionToggle');
convalidacionContainer.style.display = 'none';

convalidacionToggle.addEventListener('click', () => {
    const slider = convalidacionToggle.querySelector('.toggle-slider-content');
    convalidacionToggle.classList.toggle('active');
            
    if (convalidacionToggle.classList.contains('active')) {
        slider.innerHTML = '<span class="toggle-icon">✅</span><span>CONVALIDADO</span>';
        aplicarConvalidacion();
    } 
    else {
        slider.innerHTML = '<span class="toggle-icon">📋</span><span>NORMAL</span>';
        ramosConvalidados.clear();
        renderMalla(carreraActual);
    }
});

// Inicializar
renderMalla('ejecucion');
initializeProgress();