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
    
    // Calcular total de ramos únicos (sin contar duplicados por convalidación)
    const ramosUnicos = new Set();
    data.forEach(semestre => {
        semestre.ramos.forEach(ramo => {
            ramosUnicos.add(ramo.nombre);
        });
    });
    const totalRamos = ramosUnicos.size;
    
    // Contar ramos aprobados y convalidados (sin duplicar)
    const ramosCompletados = new Set([...ramosAprobados, ...ramosConvalidados]);
    const ramosAprobadosCount = ramosCompletados.size;
    
    const porcentajeCompleto = Math.round((ramosAprobadosCount / totalRamos) * 100);
    
    // SISTEMA DUAL: Calcular por semestres completos Y por porcentaje
    
    // 1. Calcular semestres COMPLETOS (todos los ramos aprobados)
    const semestresCompletadosReales = data.filter(semestre => 
        semestre.ramos.every(ramo => 
            ramosAprobados.has(ramo.nombre) || ramosConvalidados.has(ramo.nombre)
        )
    ).length;
    
    // 2. Calcular por porcentaje
    const porcentajePorSemestre = 100 / totalSemestres;
    const semestresCompletadosPorPorcentaje = Math.floor(porcentajeCompleto / porcentajePorSemestre);
    
    // 3. Tomar el MAYOR de los dos (el que más avance tenga)
    const semestresCompletados = Math.max(semestresCompletadosReales, semestresCompletadosPorPorcentaje);
    
    // Semestres restantes = total - semestres completados
    const semestresRestantes = Math.max(0, totalSemestres - semestresCompletados);
    
    // Años restantes = semestres restantes / 2
    const añosRestantes = semestresRestantes / 2;
    
    // Formatear años restantes - SOLO años enteros y medio (½)
    let añosRestantesTexto;
    if (añosRestantes === 0) {
        añosRestantesTexto = '0';
    } else if (añosRestantes % 1 === 0) {
        // Número entero exacto
        añosRestantesTexto = `${añosRestantes}`;
    } else {
        // Es X.5, mostrar con ½
        añosRestantesTexto = `${Math.floor(añosRestantes)}½`;
    }
    
    // Formatear semestres restantes
    const semestresRestantesTexto = semestresRestantes;
            
    return `
    <div class="stat-item">
        <div class="stat-number">${añosRestantesTexto}</div>
        <div class="stat-label">Años Faltantes</div>
    </div>
    <div class="stat-item">
        <div class="stat-number">${semestresRestantesTexto}</div>
        <div class="stat-label">Semestres Restantes</div>
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
    // Si el ramo está convalidado, siempre está disponible (independiente de prerrequisitos)
    if (ramosConvalidados.has(ramo.nombre)) {
        return true;
    }
    
    if (ramo.prerrequisitos.length === 0) {
        return true;
    }
    return ramo.prerrequisitos.every(prereq => ramosAprobados.has(prereq) || ramosConvalidados.has(prereq));
}

function getEstadoRamo(ramo) {
    // SIEMPRE verificar primero si está convalidado
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
    const convalidacionToggle = document.getElementById('convalidacionToggle');
    const modoConvalidacionActivo = convalidacionToggle && convalidacionToggle.classList.contains('active');
            
    data.forEach(semestre => {
        semestre.ramos.forEach(ramo => {
            // Si el ramo está convalidado y el modo convalidación está activo, NO tocarlo
            if (ramosConvalidados.has(ramo.nombre) && modoConvalidacionActivo) {
                return; // Saltar este ramo, no desaprobarlo
            }
            
            if ((ramosAprobados.has(ramo.nombre) || ramosConvalidados.has(ramo.nombre)) && 
                ramo.prerrequisitos.includes(ramoDesaprobado)) {
                ramosADesaprobar.push(ramo.nombre);
            }
        });
    });
            
    ramosADesaprobar.forEach(nombreRamo => {
        // Solo desaprobar si está en ramosAprobados
        if (ramosAprobados.has(nombreRamo)) {
            ramosAprobados.delete(nombreRamo);
            desaprobarRamosCascada(nombreRamo);
        }
        // Solo eliminar convalidados si NO estamos en modo convalidación activo
        if (ramosConvalidados.has(nombreRamo) && !modoConvalidacionActivo) {
            ramosConvalidados.delete(nombreRamo);
            desaprobarRamosCascada(nombreRamo);
        }
    });
}

function handleRamoClick(ramo) {
    const estado = getEstadoRamo(ramo);
    const convalidacionToggle = document.getElementById('convalidacionToggle');
    const modoConvalidacionActivo = convalidacionToggle && convalidacionToggle.classList.contains('active');
    
    // Si es un ramo convalidado y el modo convalidación está activo, no permitir cambios
    if (estado === 'convalidado' && modoConvalidacionActivo) {
        return; // No hacer nada, mantener el ramo convalidado
    }
    
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
    const convalidacionToggle = document.getElementById('convalidacionToggle');
    const modoConvalidacionActivo = convalidacionToggle && convalidacionToggle.classList.contains('active');
    
    const ramosDelSemestre = semestre.ramos.map(ramo => ramo.nombre);
    ramosDelSemestre.forEach(nombre => {
        if (ramosAprobados.has(nombre)) {
            ramosAprobados.delete(nombre);
            desaprobarRamosCascada(nombre);
        }
        // Solo eliminar convalidados si NO estamos en modo convalidación activo
        if (ramosConvalidados.has(nombre) && !modoConvalidacionActivo) {
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
    
    // Ocultar warning
    const warningIcon = document.getElementById('warning-semestre-7');
    if (warningIcon) {
        warningIcon.style.display = 'none';
    }
        
    mallas[carrera].forEach((bloque, index) => {
        const semestreDiv = document.createElement('div');
        semestreDiv.className = 'semester-card';
        semestreDiv.dataset.semestreIndex = index;
                
        const title = document.createElement('h3');
        title.className = 'semester-title';
        title.innerHTML = `
            <span class="semester-number">${index + 1}</span>
            ${bloque.semestre}
        `;
        semestreDiv.appendChild(title);

        // Agregar ícono de advertencia FUERA de la tarjeta
        if (index === 6 && carrera === 'prosecucion') {
            const warningIcon = document.getElementById('warning-semestre-7');
            warningIcon.dataset.targetSemestre = index;
            warningIcon.style.display = 'inline-flex';
        }

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
            
            // Si es convalidado y el modo convalidación está activo, marcar como no clickeable
            const convalidacionToggle = document.getElementById('convalidacionToggle');
            const modoConvalidacionActivo = convalidacionToggle && convalidacionToggle.classList.contains('active');
            if (estado === 'convalidado' && modoConvalidacionActivo) {
                ramoItem.style.cursor = 'not-allowed';
                ramoItem.style.opacity = '0.95';
            }
                    
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
        
        // Agregar listeners de hover para mover el warning junto con el semestre
        semestreDiv.addEventListener('mouseenter', () => {
            const warning = document.querySelector(`.semester-warning-icon[data-target-semestre="${index}"]`);
            if (warning) {
                // Mover inmediatamente sin esperar
                requestAnimationFrame(() => {
                    const currentTop = parseInt(warning.style.top);
                    warning.style.top = `${currentTop - 10}px`;
                });
            }
        });
        
        semestreDiv.addEventListener('mouseleave', () => {
            const warning = document.querySelector(`.semester-warning-icon[data-target-semestre="${index}"]`);
            if (warning) {
                requestAnimationFrame(() => {
                    const currentTop = parseInt(warning.style.top);
                    warning.style.top = `${currentTop + 10}px`;
                });
            }
        });
        
        container.appendChild(semestreDiv);
    });
    
    // Posicionar warnings después de que los semestres estén renderizados
    setTimeout(actualizarPosicionWarnings, 100);

    statsContainer.innerHTML = generateStats(carrera);
}

// Función para actualizar posición de warnings
function actualizarPosicionWarnings() {
    const warnings = document.querySelectorAll('.semester-warning-icon');
    warnings.forEach(warning => {
        const targetIndex = warning.dataset.targetSemestre;
        const targetCard = document.querySelector(`[data-semestre-index="${targetIndex}"]`);
        if (targetCard) {
            const rect = targetCard.getBoundingClientRect();
            const containerRect = document.getElementById('mallaContainer').getBoundingClientRect();
            
            // Ajustar offset según el tamaño de pantalla
            let rightOffset;
            if (window.innerWidth <= 480) {
                rightOffset = 35; // Mobile - más adentro para evitar overflow
            } else if (window.innerWidth <= 768) {
                rightOffset = 40; // Tablet
            } else if (window.innerWidth <= 900) {
                rightOffset = 45; // Tablet grande
            } else {
                rightOffset = 50; // Desktop
            }
            
            warning.style.top = `${rect.top - containerRect.top + 20}px`;
            warning.style.left = `${rect.left - containerRect.left + rect.width - rightOffset}px`;
        }
    });
}

function resetProgress() {
    ramosAprobados.clear();
    
    // Solo limpiar convalidados si NO estamos en modo convalidación activo
    const convalidacionToggle = document.getElementById('convalidacionToggle');
    if (!convalidacionToggle.classList.contains('active')) {
        ramosConvalidados.clear();
    }
    
    renderMalla(carreraActual);
}

// Ramos a convalidar
function aplicarConvalidacion() {
    const ramosLista = ramosConvalidar[carreraActual] || [];
    
    ramosAprobados.clear();
    ramosConvalidados.clear();
    
    ramosLista.forEach(ramo => {
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
// Event listeners para navegación
botones.forEach(btn => {
    btn.addEventListener('click', () => {
        botones.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        ramosAprobados.clear();
        ramosConvalidados.clear();
        
        const carrera = btn.dataset.carrera;
        const convalidacionContainer = document.getElementById('convalidacionContainer');
        const convalidacionToggle = document.getElementById('convalidacionToggle');
        const advertencia = document.getElementById('advertencia');
        const slider = convalidacionToggle.querySelector('.toggle-slider-content');
        
        // Configurar advertencia según la carrera
        const configAdvertencia = advertencias[carrera];
        
        if (configAdvertencia) {
            // Mostrar advertencia con el texto configurado
            advertencia.querySelector('.content').innerHTML = configAdvertencia.texto;
            advertencia.style.display = 'flex';
            
            // Mostrar toggle solo si está configurado
            convalidacionContainer.style.display = configAdvertencia.mostrarToggle ? 'flex' : 'none';
        } else {
            // No hay advertencia configurada para esta carrera
            advertencia.style.display = 'none';
            convalidacionContainer.style.display = 'none';
        }
        
        // Resetear toggle
        convalidacionToggle.classList.remove('active');
        slider.innerHTML = '<span class="toggle-icon">📋</span><span>NORMAL</span>';
        
        renderMalla(carrera);
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
        // Reiniciar todo cuando vuelve a modo normal
        ramosAprobados.clear();
        ramosConvalidados.clear();
        renderMalla(carreraActual);
    }
});

// Header dinámico - se oculta al pasar "Malla Curricular"
const header = document.querySelector('.header');
const navLinks = document.querySelector('.nav-links');
const mallaCurricularSection = document.querySelector('.curriculum-section');

window.addEventListener('scroll', () => {
    const mallaCurricularTop = mallaCurricularSection.offsetTop;
    const currentScrollY = window.scrollY;
    
    // Ocultar cuando pase el título "Malla Curricular" (con offset de 100px)
    if (currentScrollY > mallaCurricularTop - 100) {
        navLinks.style.maxHeight = '0';
        navLinks.style.opacity = '0';
        navLinks.style.marginTop = '0';
        navLinks.style.overflow = 'hidden';
        header.style.padding = '8px 0';
    }
    // Mostrar cuando suba antes de "Malla Curricular"
    else {
        navLinks.style.maxHeight = '200px';
        navLinks.style.opacity = '1';
        navLinks.style.marginTop = '';
        navLinks.style.overflow = 'visible';
        header.style.padding = '10px 0';
    }
});

// Inicializar
renderMalla('ejecucion');

initializeProgress();

// Reposicionar warnings cuando cambia el tamaño de ventana
window.addEventListener('resize', () => {
    actualizarPosicionWarnings();
});

// Reposicionar warnings cuando se hace scroll
window.addEventListener('scroll', () => {
    actualizarPosicionWarnings();
});
