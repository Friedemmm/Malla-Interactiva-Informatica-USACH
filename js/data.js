// Datos de las mallas con prerrequisitos
const mallas = {
    ejecucion: [
        {
            semestre: 'Primer Semestre', 
            ramos: [
                { nombre: 'Cálculo I', codigo: '10101', prerrequisitos: [] },
                { nombre: 'Álgebra I', codigo: '10102', prerrequisitos: [] },
                { nombre: 'Física I', codigo: '10103', prerrequisitos: [] },
                { nombre: 'Taller de Desarrollo Personal e Integral', codigo: '10104', prerrequisitos: [] },
                { nombre: 'Introducción a la Ingeniería', codigo: '10125', prerrequisitos: [] },
                { nombre: 'Métodos de Estudio', codigo: '10126', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Segundo Semestre', 
            ramos: [
                { nombre: 'Cálculo II', codigo: '10107', prerrequisitos: ['Cálculo I'] },
                { nombre: 'Álgebra II', codigo: '10108', prerrequisitos: ['Álgebra I'] },
                { nombre: 'Física II', codigo: '10109', prerrequisitos: ['Física I'] },
                { nombre: 'Fundamentos de Computación y Programación', codigo: '10110', prerrequisitos: ['Álgebra I'] },
                { nombre: 'Química General', codigo: '10111', prerrequisitos: [] },
                { nombre: 'Introducción a la Ingeniería Informática', codigo: '13287', prerrequisitos: ['Introducción a la Ingeniería'] }
            ]
        },
        { 
            semestre: 'Tercer Semestre', 
            ramos: [
                { nombre: 'Análisis Estadístico', codigo: '10115', prerrequisitos: ['Cálculo II'] },
                { nombre: 'Ecuaciones Diferenciales y Métodos Numéricos', codigo: '10123', prerrequisitos: ['Cálculo II', 'Fundamentos de Computación y Programación'] },
                { nombre: 'Electricidad y Magnetismo', codigo: '10127', prerrequisitos: ['Cálculo II', 'Física II'] },
                { nombre: 'Comunicación Efectiva', codigo: '10128', prerrequisitos: ['Taller de Desarrollo Personal e Integral'] },
                { nombre: 'Inglés I', codigo: '10130', prerrequisitos: ['Métodos de Estudio'] },
                { nombre: 'Métodos de Programación', codigo: '13201', prerrequisitos: ['Fundamentos de Computación y Programación', 'Introducción a la Ingeniería Informática'] }
            ]
        },
        { 
            semestre: 'Cuarto Semestre', 
            ramos: [
                { nombre: 'Fundamentos de Economía', codigo: '10116', prerrequisitos: ['Cálculo I'] },
                { nombre: 'Inglés II', codigo: '10131', prerrequisitos: ['Inglés I'] },
                { nombre: 'Paradigmas de Programación', codigo: '13204', prerrequisitos: ['Métodos de Programación'] },
                { nombre: 'Análisis de Algoritmos y Estructura de Datos', codigo: '13205', prerrequisitos: ['Métodos de Programación'] },
                { nombre: 'Ingeniería de Sistemas', codigo: '13252', prerrequisitos: ['Análisis Estadístico', 'Química General', 'Introducción a la Ingeniería'] },
                { nombre: 'Estructura de Computadores', codigo: '13273', prerrequisitos: ['Electricidad y Magnetismo', 'Álgebra II'] }
            ]
        },
        { 
            semestre: 'Quinto Semestre', 
            ramos: [
                { nombre: 'Inglés III', codigo: '10132', prerrequisitos: ['Inglés II'] },
                { nombre: 'Fundamentos de Ingeniería de Software', codigo: '13209', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Informática y Sociedad', codigo: '13260', prerrequisitos: ['Comunicación Efectiva'] },
                { nombre: 'Sistemas de Información', codigo: '13261', prerrequisitos: ['Ingeniería de Sistemas'] },
                { nombre: 'Diseño de Base de Datos', codigo: '13274', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Organización de Computadores', codigo: '13275', prerrequisitos: ['Estructura de Computadores'] },
                { nombre: 'Evaluación de Proyectos Informáticos', codigo: '13288', prerrequisitos: ['Fundamentos de Economía', 'Ecuaciones Diferenciales y Métodos Numéricos'] }
            ]
        },
        { 
            semestre: 'Sexto Semestre', 
            ramos: [
                { nombre: 'Inglés IV', codigo: '10133', prerrequisitos: ['Inglés III'] },
                { nombre: 'Sistemas Operativos', codigo: '13212', prerrequisitos: ['Organización de Computadores', 'Análisis de Algoritmos y Estructura de Datos'] },
                { nombre: 'Taller de Bases de Datos', codigo: '13215', prerrequisitos: ['Fundamentos de Ingeniería de Software', 'Diseño de Base de Datos'] },
                { nombre: 'Técnicas de Ingeniería de Software', codigo: '13265', prerrequisitos: ['Fundamentos de Ingeniería de Software'] },
                { nombre: 'Redes Computacionales', codigo: '13266', prerrequisitos: ['Organización de Computadores'] },
                { nombre: 'Administración de Proyectos Informáticos', codigo: '13289', prerrequisitos: ['Evaluación de Proyectos Informáticos'] }
            ]
        },
        { 
            semestre: 'Séptimo Semestre', 
            ramos: [
                { nombre: 'Proyecto de Ingeniería de Software', codigo: '13267', prerrequisitos: ['Taller de Bases de Datos', 'Técnicas de Ingeniería de Software', 'Administración de Proyectos Informáticos'] },
                { nombre: 'Tópicos de Especialidad I', codigo: '13268', prerrequisitos: ['Técnicas de Ingeniería de Software', 'Redes Computacionales'] },
                { nombre: 'Tópicos de Especialidad II', codigo: '13269', prerrequisitos: ['Técnicas de Ingeniería de Software', 'Redes Computacionales'] },
                { nombre: 'Tópicos de Especialidad III', codigo: '13270', prerrequisitos: ['Técnicas de Ingeniería de Software', 'Redes Computacionales', 'Administración de Proyectos Informáticos'] },
                { nombre: 'Seminario de Computación e Informática', codigo: '13276', prerrequisitos: ['Sistemas Operativos', 'Taller de Bases de Datos', 'Informática y Sociedad', 'Sistemas de Información'] }
            ]
        },
        { 
            semestre: 'Octavo Semestre', 
            ramos: [
                { nombre: 'Trabajo de Titulación', codigo: '13277', prerrequisitos: ['Seminario de Computación e Informática'] }
            ]
        }
    ],
    civil: [
        { 
            semestre: 'Primer Semestre', 
            ramos: [
                { nombre: 'Cálculo I', codigo: '10138', prerrequisitos: [] },
                { nombre: 'Álgebra I', codigo: '10139', prerrequisitos: [] },
                { nombre: 'Física I', codigo: '10140', prerrequisitos: [] },
                { nombre: 'Introducción al Diseño en Ingeniería', codigo: '10141', prerrequisitos: [] },
                { nombre: 'Ingeniería y Sostenibilidad', codigo: '13344', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Segundo Semestre', 
            ramos: [
                { nombre: 'Cálculo II', codigo: '10142', prerrequisitos: ['Cálculo I'] },
                { nombre: 'Álgebra II', codigo: '10143', prerrequisitos: ['Álgebra I'] },
                { nombre: 'Física II', codigo: '10144', prerrequisitos: ['Física I'] },
                { nombre: 'Fundamentos de Programación', codigo: '10145', prerrequisitos: ['Introducción al Diseño en Ingeniería'] },
                { nombre: 'Introducción a la Ingeniería Informática', codigo: '13301', prerrequisitos: ['Introducción al Diseño en Ingeniería'] },
                { nombre: 'Fundamentos de Computación', codigo: '13302', prerrequisitos: ['Introducción al Diseño en Ingeniería'] }
            ]
        },
        { 
            semestre: 'Tercer Semestre', 
            ramos: [
                { nombre: 'Inglés I', codigo: '10130', prerrequisitos: [] },
                { nombre: 'Cálculo III', codigo: '10146', prerrequisitos: ['Cálculo II'] },
                { nombre: 'Fundamentos de Economía', codigo: '10157', prerrequisitos: ['Cálculo I'] },
                { nombre: 'Electricidad, Magnetismo y Ondas', codigo: '13305', prerrequisitos: ['Cálculo II', 'Física II'] },
                { nombre: 'Estructura de Datos', codigo: '13345', prerrequisitos: ['Fundamentos de Programación', 'Fundamentos de Computación'] },
                { nombre: 'Diseño de Algoritmos', codigo: '13346', prerrequisitos: ['Fundamentos de Programación', 'Introducción a la Ingeniería Informática', 'Fundamentos de Computación'] }
            ]
        },
        { 
            semestre: 'Cuarto Semestre', 
            ramos: [
                { nombre: 'Inglés II', codigo: '10131', prerrequisitos: ['Inglés I'] },
                { nombre: 'Taller de Diseño en Ingeniería', codigo: '10148', prerrequisitos: ['Fundamentos de Economía'] },
                { nombre: 'Ecuaciones Diferenciales y Métodos Numéricos', codigo: '13307', prerrequisitos: ['Cálculo III', 'Fundamentos de Programación'] },
                { nombre: 'Diseño de Bases de Datos', codigo: '13308', prerrequisitos: ['Álgebra II', 'Fundamentos de Computación'] },
                { nombre: 'Arquitectura de Computadores', codigo: '13309', prerrequisitos: ['Electricidad, Magnetismo y Ondas', 'Fundamentos de Computación'] },
                { nombre: 'Paradigmas de Programación', codigo: '13310', prerrequisitos: ['Estructura de Datos', 'Diseño de Algoritmos'] }
            ]
        },
        { 
            semestre: 'Quinto Semestre', 
            ramos: [
                { nombre: 'Inglés III', codigo: '10132', prerrequisitos: ['Inglés II'] },
                { nombre: 'Estadística Computacional', codigo: '13311', prerrequisitos: ['Cálculo III', 'Fundamentos de Programación'] },
                { nombre: 'Teoría de la Computación', codigo: '13312', prerrequisitos: ['Estructura de Datos', 'Diseño de Algoritmos'] },
                { nombre: 'Sistemas Operativos', codigo: '13313', prerrequisitos: ['Arquitectura de Computadores', 'Ingeniería y Sostenibilidad'] },
                { nombre: 'Fundamentos de Ingeniería de Software', codigo: '13314', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Taller de Programación', codigo: '13315', prerrequisitos: ['Paradigmas de Programación'] }
            ]
        },
        { 
            semestre: 'Sexto Semestre', 
            ramos: [
                { nombre: 'Inglés IV', codigo: '10133', prerrequisitos: ['Inglés III'] },
                { nombre: 'Estadística Inferencial', codigo: '13316', prerrequisitos: ['Estadística Computacional', 'Inglés II'] },
                { nombre: 'Bases de Datos Avanzadas', codigo: '13317', prerrequisitos: ['Sistemas Operativos', 'Diseño de Bases de Datos'] },
                { nombre: 'Procesamiento de Señales e Imágenes', codigo: '13318', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Técnicas de Ingeniería de Software', codigo: '13319', prerrequisitos: ['Fundamentos de Ingeniería de Software', 'Diseño de Bases de Datos'] },
                { nombre: 'Evaluación de Proyectos', codigo: '13320', prerrequisitos: ['Taller de Diseño en Ingeniería', 'Fundamentos de Economía'] }
            ]
        },
        { 
            semestre: 'Séptimo Semestre', 
            ramos: [
                { nombre: 'Modelos y Simulación', codigo: '13321', prerrequisitos: ['Estadística Inferencial', 'Ecuaciones Diferenciales y Métodos Numéricos'] },
                { nombre: 'Métodos de Optimización', codigo: '13322', prerrequisitos: ['Teoría de la Computación', 'Cálculo III'] },
                { nombre: 'Redes de Comunicación', codigo: '13323', prerrequisitos: ['Procesamiento de Señales e Imágenes', 'Sistemas Operativos'] },
                { nombre: 'Gestión de Proyectos TI', codigo: '13324', prerrequisitos: ['Evaluación de Proyectos', 'Fundamentos de Ingeniería de Software'] },
                { nombre: 'Innovación y Emprendimiento', codigo: '13325', prerrequisitos: ['Evaluación de Proyectos', 'Taller de Programación'] },
                { nombre: 'Formación Integral I', codigo: '13326', prerrequisitos: ['Inglés III'] }
            ]
        },
        { 
            semestre: 'Octavo Semestre', 
            ramos: [
                { nombre: 'Análisis de Datos', codigo: '13327', prerrequisitos: ['Modelos y Simulación', 'Métodos de Optimización'] },
                { nombre: 'Ciberseguridad', codigo: '13328', prerrequisitos: ['Redes de Comunicación', 'Inglés IV'] },
                { nombre: 'Sistemas Distribuidos y Paralelos', codigo: '13329', prerrequisitos: ['Redes de Comunicación', 'Bases de Datos Avanzadas'] },
                { nombre: 'Proyecto de Ingeniería de Software', codigo: '13331', prerrequisitos: ['Bases de Datos Avanzadas', 'Técnicas de Ingeniería de Software'] },
                { nombre: 'Formación Integral II', codigo: '13332', prerrequisitos: ['Inglés IV'] },
                { nombre: 'Gestión de Servicios TI', codigo: '13347', prerrequisitos: ['Gestión de Proyectos TI'] }
            ]
        },
        { 
            semestre: 'Noveno Semestre', 
            ramos: [
                { nombre: 'Aprendizaje Automático', codigo: '13333', prerrequisitos: ['Análisis de Datos'] },
                { nombre: 'Tópico de Especialidad I', codigo: '13334', prerrequisitos: ['Modelos y Simulación', 'Métodos de Optimización'] },
                { nombre: 'Tópico de Especialidad II', codigo: '13335', prerrequisitos: ['Redes de Comunicación', 'Gestión de Proyectos TI', 'Innovación y Emprendimiento'] },
                { nombre: 'Gobernanza y Gestión TI', codigo: '13336', prerrequisitos: ['Ciberseguridad', 'Gestión de Servicios TI'] },
                { nombre: 'Electivo I', codigo: '13337', prerrequisitos: ['Proyecto de Ingeniería de Software'] }
            ]
        },
        { 
            semestre: 'Décimo Semestre', 
            ramos: [
                { nombre: 'Seminario de Informática', codigo: '13338', prerrequisitos: ['Electivo I', 'Formación Integral II', 'Formación Integral I'] },
                { nombre: 'Tópico de Especialidad III', codigo: '13339', prerrequisitos: ['Tópico de Especialidad I'] },
                { nombre: 'Tópico de Especialidad IV', codigo: '13340', prerrequisitos: ['Tópico de Especialidad II'] },
                { nombre: 'Electivo Interdisciplinario', codigo: '13341', prerrequisitos: ['Proyecto de Ingeniería de Software', 'Formación Integral II'] },
                { nombre: 'Electivo II', codigo: '13342', prerrequisitos: ['Electivo I'] }
            ]
        },
        { 
            semestre: 'Undécimo Semestre', 
            ramos: [
                { nombre: 'Trabajo de Titulación', codigo: '13343', prerrequisitos: ['Seminario de Informática', 'Electivo II', 'Aprendizaje Automático', 'Gobernanza y Gestión TI'] }
            ]
        }
    ],
    prosecucion: [
        { 
            semestre: 'Primer Semestre', 
            ramos: [
                { nombre: 'Paradigmas de Programación', codigo: '-', prerrequisitos: [] },
                { nombre: 'Estructura de Computadores', codigo: '-', prerrequisitos: [] },
                { nombre: 'Matemática Avanzada', codigo: '-', prerrequisitos: [] },
                { nombre: 'Inglés III', codigo: '-', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Segundo Semestre', 
            ramos: [
                { nombre: 'Fundamentos de Ingeniería de Software', codigo: '-', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Análisis de Algoritmos y Estructura de Datos', codigo: '-', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Base de Datos', codigo: '-', prerrequisitos: ['Paradigmas de Programación'] },
                { nombre: 'Organización de Computadores', codigo: '-', prerrequisitos: ['Estructura de Computadores'] },
                { nombre: 'Inglés IV', codigo: '-', prerrequisitos: ['Inglés III'] }
            ]
        },
        { 
            semestre: 'Tercer Semestre', 
            ramos: [
                { nombre: 'Interferencia y Modelos Estadísticos', codigo: '-', prerrequisitos: ['Matemática Avanzada'] },
                { nombre: 'Procesamiento de Lenguajes Formales', codigo: '-', prerrequisitos: ['Matemática Avanzada'] },
                { nombre: 'Redes de Computadores', codigo: '-', prerrequisitos: [] },
                { nombre: 'Finanzas y Contabilidad', codigo: '-', prerrequisitos: [] },
                { nombre: 'Sistemas Operativos', codigo: '-', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Cuarto Semestre', 
            ramos: [
                { nombre: 'Ciencia, Tecnología y Sociedad', codigo: '-', prerrequisitos: [] },
                { nombre: 'Análisis de Datos', codigo: '-', prerrequisitos: [] },
                { nombre: 'Teoría de la Computación', codigo: '-', prerrequisitos: [] },
                { nombre: 'Algoritmos Numéricos', codigo: '-', prerrequisitos: [] },
                { nombre: 'Ingeniería de Sistemas', codigo: '-', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Quinto Semestre', 
            ramos: [
                { nombre: 'Métodos de Optimización', codigo: '-', prerrequisitos: [] },
                { nombre: 'Modelación y Simulación', codigo: '-', prerrequisitos: [] },
                { nombre: 'Sistemas de Comunicación', codigo: '-', prerrequisitos: [] },
                { nombre: 'Evaluación de Proyectos', codigo: '-', prerrequisitos: [] },
                { nombre: 'Administración de Proyectos de Software', codigo: '-', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Sexto Semestre', 
            ramos: [
                { nombre: 'Seguridad de Auditoría Informática', codigo: '-', prerrequisitos: [] },
                { nombre: 'Proyecto de Ingenería de Software', codigo: '-', prerrequisitos: [] },
                { nombre: 'Dirección y Gestión de Empresas', codigo: '-', prerrequisitos: [] },
                { nombre: 'Macroeconomía y Globalización', codigo: '-', prerrequisitos: [] },
                { nombre: 'Sistemas Distribuidos', codigo: '-', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Séptimo Semestre', 
            ramos: [
                { nombre: 'Tópicos de Especialidad I', codigo: '-', prerrequisitos: [] },
                { nombre: 'Tópicos de Especialidad II', codigo: '-', prerrequisitos: [] },
                { nombre: 'Tópicos de Especialidad III', codigo: '-', prerrequisitos: [] },
                { nombre: 'Proyecto de Ingeniería de Software', codigo: '-', prerrequisitos: [] },
                { nombre: 'Seminario de Informática', codigo: '-', prerrequisitos: [] }
            ]
        },
        { 
            semestre: 'Octavo Semestre', 
            ramos: [
                { nombre: 'Trabajo de Titulación', codigo: '-', prerrequisitos: ['Seminario de Computación e Informática'] },
                { nombre: 'Tópicos de Especialidad IV', codigo: '-', prerrequisitos: [] }
            ]
        }
    ]
};

const carreraTitles = {
    ejecucion: 'Ingeniería de Ejecución en Computación e Informática (1353)',
    civil: 'Ingeniería Civil en Informática (1463)',
    prosecucion: 'Prosecución en Ingeniería Civil en Informática'
};