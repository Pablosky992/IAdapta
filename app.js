// Application State
let currentSpread = []; // Array of drawn card objects
let flippedCount = 0;
let totalCardsInSpread = 1;
let selectedCategory = 'general';
let isShuffling = false;
let isFromHistory = false;

// Astrological State Variables
let currentAstroSpread = [];
let astroFlippedCount = 0;
let astroTotalCards = 1;
let selectedZodiac = 'aries';
let selectedAstroSpread = 'astro_daily';
let isAstroShuffling = false;
let isAstroFromHistory = false;

// Lunar Calendar State Variables
let selectedLunarDate = new Date();
let lunarCalendarMonth = new Date().getMonth();
let lunarCalendarYear = new Date().getFullYear();

// Astrological correspondences for the 22 Major Arcana (from Golden Dawn and Papus)
const ASTRO_MAP = {
  0: { ruler: "Urano", symbol: "♅", keywords: "Originalidad y libertad", element: "Aire", card: "El Loco" },
  1: { ruler: "Mercurio", symbol: "☿", keywords: "Mente y comunicación", planet: "Mercurio", card: "El Mago" },
  2: { ruler: "La Luna", symbol: "☽", keywords: "Intuición y misterio", planet: "Luna", card: "La Sacerdotisa" },
  3: { ruler: "Venus", symbol: "♀", keywords: "Amor, abundancia y arte", planet: "Venus", card: "La Emperatriz" },
  4: { ruler: "Aries", symbol: "♈", keywords: "Iniciativa y voluntad", sign: "Aries", card: "El Emperador" },
  5: { ruler: "Tauro", symbol: "♉", keywords: "Valores y tradición", sign: "Tauro", card: "El Papa" },
  6: { ruler: "Géminis", symbol: "♊", keywords: "Relaciones y elección", sign: "Géminis", card: "Los Enamorados" },
  7: { ruler: "Cáncer", symbol: "♋", keywords: "Emociones y protección", sign: "Cáncer", card: "El Carro" },
  8: { ruler: "Libra", symbol: "♎", keywords: "Justicia y equilibrio", sign: "Libra", card: "La Justicia" },
  9: { ruler: "Virgo", symbol: "♍", keywords: "Prudencia e introspección", sign: "Virgo", card: "El Ermitaño" },
  10: { ruler: "Júpiter", symbol: "♃", keywords: "Suerte y destino", planet: "Júpiter", card: "La Rueda de la Fortuna" },
  11: { ruler: "Leo", symbol: "♌", keywords: "Coraje y pasión", sign: "Leo", card: "La Fuerza" },
  12: { ruler: "Neptuno", symbol: "♆", keywords: "Entrega y nueva visión", element: "Agua", card: "El Colgado" },
  13: { ruler: "Escorpio", symbol: "♏", keywords: "Transmutación y renacer", sign: "Escorpio", card: "La Muerte" },
  14: { ruler: "Sagitario", symbol: "♐", keywords: "Sanación y templanza", sign: "Sagitario", card: "La Templanza" },
  15: { ruler: "Capricornio", symbol: "♑", keywords: "Deseo y ambición", sign: "Capricornio", card: "El Diablo" },
  16: { ruler: "Marte", symbol: "♂", keywords: "Catarsis y despertar", planet: "Marte", card: "La Torre" },
  17: { ruler: "Acuario", symbol: "♒", keywords: "Fe y esperanza", sign: "Acuario", card: "La Estrella" },
  18: { ruler: "Piscis", symbol: "♓", keywords: "Fantasías y subconsciente", sign: "Piscis", card: "La Luna" },
  19: { ruler: "El Sol", symbol: "☉", keywords: "Vitalidad y claridad", planet: "Sol", card: "El Sol" },
  20: { ruler: "Plutón", symbol: "♇", keywords: "Vocación y juicio final", element: "Fuego", card: "El Juicio" },
  21: { ruler: "Saturno", symbol: "♄", keywords: "Realización y límites", planet: "Saturno", card: "El Mundo" }
};

// Esoteric Zodiac sign information (Papus & Master E.K.)
const ZODIAC_INFO = {
  aries: { name: "Aries", symbol: "♈", element: "Fuego", ruler: "Marte", angel: "Samael", body: "la cabeza y el cerebro", diastesis: "hepática (calor seco)" },
  tauro: { name: "Tauro", symbol: "♉", element: "Tierra", ruler: "Venus", angel: "Anael", body: "el cuello y la garganta", diastesis: "renal (frío seco)" },
  geminis: { name: "Géminis", symbol: "♊", element: "Aire", ruler: "Mercurio", angel: "Raphael", body: "los hombros, brazos y manos", diastesis: "craneal (calor húmedo)" },
  cancer: { name: "Cáncer", symbol: "♋", element: "Agua", ruler: "Luna", angel: "Gabriel", body: "el pecho, pulmones y diafragma", diastesis: "cráneo-abdominal (frío húmedo)" },
  leo: { name: "Leo", symbol: "♌", element: "Fuego", ruler: "Sol", angel: "Michael", body: "el corazón y el plexo cardíaco", diastesis: "cardíaca (calor seco)" },
  virgo: { name: "Virgo", symbol: "♍", element: "Tierra", ruler: "Mercurio", angel: "Raphael", body: "las entrañas, vientre e intestinos", diastesis: "craneal (frío seco)" },
  libra: { name: "Libra", symbol: "♎", element: "Aire", ruler: "Venus", angel: "Anael", body: "los riñones y la región lumbar", diastesis: "renal (calor húmedo)" },
  escorpio: { name: "Escorpio", symbol: "♏", element: "Agua", ruler: "Plutón y Marte", angel: "Samael", body: "los órganos reproductores y sistema sexual", diastesis: "hepática (frío húmedo)" },
  sagitario: { name: "Sagitario", symbol: "♐", element: "Fuego", ruler: "Júpiter", angel: "Zacariel", body: "las caderas y los muslos", diastesis: "torácica (calor seco)" },
  capricornio: { name: "Capricornio", symbol: "♑", element: "Tierra", ruler: "Saturno", angel: "Cassiel", body: "las rodillas y el esqueleto", diastesis: "esplénica (frío seco)" },
  acuario: { name: "Acuario", symbol: "♒", element: "Aire", ruler: "Urano y Saturno", angel: "Cassiel", body: "las piernas y los tobillos", diastesis: "esplénica (calor húmedo)" },
  piscis: { name: "Piscis", symbol: "♓", element: "Agua", ruler: "Neptuno y Júpiter", angel: "Zacariel", body: "los pies y la base linfática", diastesis: "torácica (frío húmedo)" }
};

const PLANETARY_ANGELS = {
  "Saturno": { angel: "Cassiel", genio: "reflexión en la luz astral" },
  "Júpiter": { angel: "Zacariel", genio: "concordia, justicia y arbitraje" },
  "Marte": { angel: "Samael", genio: "fuerza ígnea purificadora" },
  "El Sol": { angel: "Micael", genio: "luz espiritual y soberanía" },
  "Sol": { angel: "Micael", genio: "luz espiritual y soberanía" },
  "Venus": { angel: "Anael", genio: "amor y cohesión en el alma universal" },
  "Mercurio": { angel: "Raphael", genio: "sabiduría y arte intelectual" },
  "La Luna": { angel: "Gabriel", genio: "fluidos y subconsciente" },
  "Luna": { angel: "Gabriel", genio: "fluidos y subconsciente" },
  "Urano": { angel: "Cassiel", genio: "reflexión y desapego en el espacio" },
  "Neptuno": { angel: "Gabriel", genio: "devoción lunar sublimada" },
  "Plutón": { angel: "Samael", genio: "fuerza ígnea de transmutación" }
};

// Helper to sanitize zodiac sign keys (removes accents and lowercases)
function getSanitizedSignKey(signName) {
  if (!signName) return '';
  return signName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Chakras based on Sign Pairs (Master E.K. Spiritual Astrology)
function getAstroChakra(sunSign) {
  const pairs = {
    aries: { name: "Sahásrâra (Coronario)", loc: "Parte más alta de la cabeza", func: "Iniciación y liberación espiritual" },
    libra: { name: "Sahásrâra (Coronario)", loc: "Parte más alta de la cabeza", func: "Iniciación y liberación espiritual" },
    tauro: { name: "Âjñâ (Entrecejo)", loc: "Glándulas pineal y pituitaria", func: "El tercer ojo y el puente superior" },
    piscis: { name: "Âjñâ (Entrecejo)", loc: "Glándulas pineal y pituitaria", func: "El tercer ojo y el puente superior" },
    geminis: { name: "Visuddhi (Laríngeo)", loc: "Cuerdas vocales / Garganta", func: "El centro del Verbo y la expresión del prâna" },
    acuario: { name: "Visuddhi (Laríngeo)", loc: "Cuerdas vocales / Garganta", func: "El centro del Verbo y la expresión del prâna" },
    cancer: { name: "Anâhata (Cardíaco)", loc: "Corazón y pulmones", func: "Actividad respiratoria, circulatoria y amor universal" },
    capricornio: { name: "Anâhata (Cardíaco)", loc: "Corazón y pulmones", func: "Actividad respiratoria, circulatoria y amor universal" },
    leo: { name: "Svâdhistâna (Esplénico)", loc: "Bazo y diafragma", func: "La voluntad de amor, vitalidad y protección" },
    sagitario: { name: "Svâdhistâna (Esplénico)", loc: "Bazo y diafragma", func: "La voluntad de amor, vitalidad y protección" },
    virgo: { name: "Manipûraka (Umbilical)", loc: "Vientre y centros digestivos", func: "La envoltura del deseo y el magnetismo animal" },
    escorpio: { name: "Manipûraka (Umbilical)", loc: "Vientre y centros digestivos", func: "La envoltura del deseo y el magnetismo animal" }
  };
  return pairs[getSanitizedSignKey(sunSign)] || { name: "Mûlâdhâra (Base)", loc: "Base de la columna vertebral", func: "Kundalini y base de la materia" };
}

// Map of Gematria values (Pythagorean system including Spanish character Ñ)
const GEMATRIA_MAP = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, ñ: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const NUM_SOUL_DB = {
  1: "Deseo profundo de independencia, liderazgo y autosuficiencia. Tu yo interno busca abrir nuevos caminos y destacar por mérito propio.",
  2: "Búsqueda íntima de paz, armonía y cooperación. Tu motivación principal es formar vínculos afectivos estables y actuar como pacificador.",
  3: "Deseo de expresar tu creatividad, alegría y optimismo. Tu alma se nutre de la comunicación, el arte y el contacto social genuino.",
  4: "Necesidad de orden, estabilidad y seguridad. Tu motivación es construir bases sólidas y ver que tus esfuerzos den frutos concretos.",
  5: "Anhelo profundo de libertad, aventura y cambios constantes. Tu alma huye de la rutina y ansía explorar el mundo con independencia.",
  6: "Deseo de proteger, amar y servir a tu familia y comunidad. Buscas crear armonía, belleza y asumir responsabilidades afectivas.",
  7: "Anhelo de introspección, análisis y conocimiento espiritual. Tu alma busca la verdad en la soledad, el estudio y la meditación.",
  8: "Deseo de logro material, éxito y poder constructivo. Tu alma se motiva al organizar, dirigir y liderar proyectos de gran envergadura.",
  9: "Deseo humanitario y altruista de amor incondicional. Tu alma busca ayudar a los demás, sanar heridas y trascender apegos materiales.",
  11: "Llamado espiritual a guiar a otros mediante tu intuición. Tu alma busca la elevación de conciencia y la inspiración mística.",
  22: "Gran constructor universal. Tu alma aspira a materializar grandes ideas y proyectos a nivel colectivo que beneficien a la humanidad.",
  33: "Consagración al servicio universal. Tu alma siente un amor desinteresado y busca ser un faro de iluminación y guía espiritual."
};

const NUM_PERSONALITY_DB = {
  1: "Te muestras como una persona fuerte, segura, dinámica e independiente. A los ojos de los demás pareces un líder nato y alguien emprendedor.",
  2: "Transmites una imagen pacífica, amable, diplomática y cooperadora. Los demás te perciben como alguien sensible, comprensivo y buen oyente.",
  3: "Proyectas carisma, simpatía, alegría y gran elocuencia. Pareces una persona muy sociable, expresiva, artística y llena de vitalidad.",
  4: "Das la impresión de ser alguien serio, trabajador, organizado, práctico y confiable. Transmites estabilidad, orden y honestidad.",
  5: "Te perciben como alguien magnético, aventurero, versátil y lleno de energía. Pareces una persona libre, adaptable y amante del cambio.",
  6: "Muestras una imagen protectora, hogareña, cariñosa y responsable. Das la impresión de ser el hombro en el que todos pueden apoyarse.",
  7: "Proyectas una imagen de reserva, misterio, inteligencia y espiritualidad. Los demás te ven como alguien analítico, culto y reflexivo.",
  8: "Transmites autoridad, fuerza material, éxito y capacidad ejecutiva. Pareces una persona decidida, eficiente y con gran poder físico y mental.",
  9: "Pareces una persona generosa, tolerante, comprensiva y con una visión amplia de la vida. Das la impresión de ser sabia, magnética y mística.",
  11: "Proyectas una vibración magnética especial, inspiradora y visionaria. Pareces un canal directo de ideas elevadas o intuición pura.",
  22: "Transmites la imagen de un organizador magistral. Los demás ven en ti una capacidad única para planificar a gran escala y concretar utopías.",
  33: "Proyectas un aura de paz, compasión infinita y amor protector. Pareces una persona entregada por entero a sanar y consolar a los necesitados."
};

const NUM_DESTINY_DB = {
  1: "Tu misión es aprender a ser autosuficiente, cultivar el coraje y desarrollar el liderazgo positivo, abriendo caminos para otros sin caer en el egoísmo.",
  2: "Tu misión consiste en aprender a cooperar, conciliar y mediar en conflictos, desarrollando la diplomacia, la empatía y fortaleciendo tus relaciones.",
  3: "Tu misión de vida es comunicar, inspirar y esparcir alegría a través de tu creatividad, el arte, la palabra hablada o escrita y tu optimismo natural.",
  4: "Tu camino te exige aprender el valor del trabajo constante, la autodisciplina y el orden, construyendo una vida sólida y segura paso a paso.",
  5: "Tu misión es experimentar la vida en libertad, adaptarte a los cambios con valentía y actuar como un puente de comunicación y versatilidad.",
  6: "Tu camino te llama a asumir responsabilidades afectivas, brindar amor, sostener a tu familia, crear espacios de belleza y sanar a tu entorno.",
  7: "Tu misión es profundizar en el conocimiento, desarrollar tu intuición y espiritualidad, convirtiéndote en un sabio, investigador o maestro mental.",
  8: "Tu sendero te reta a dominar el plano material y financiero, asumiendo la autoridad con justicia y manifestando éxito para proveer a la sociedad.",
  9: "Tu misión es alcanzar el amor universal, el altruismo y el perdón absoluto, ayudando desinteresadamente a la humanidad y soltando los apegos.",
  11: "Tu camino maestro te exige sintonizar con la luz espiritual y ser una fuente de inspiración y elevación espiritual para tu comunidad.",
  22: "Tu sendero te llama a ser un constructor a gran escala, uniendo ideales espirituales con realizaciones físicas prácticas que trasciendan generaciones.",
  33: "Tu misión suprema es encarnar el amor incondicional del maestro, brindando consuelo, sanación y una guía desinteresada a la humanidad."
};

const NUM_POTENTIAL_DB = {
  1: "En tu madurez, destacarás por tu total independencia y por iniciar proyectos innovadores con gran determinación personal.",
  2: "La segunda mitad de tu vida estará marcada por una profunda paz interior, el trabajo colaborativo de éxito y relaciones muy armoniosas.",
  3: "Tus años maduros te traerán una gran expansión creativa, reconocimiento social y la felicidad de expresarte libremente.",
  4: "Tu madurez te regalará una vida estable, un patrimonio firme construido con esfuerzo y la tranquilidad de tener bases seguras.",
  5: "En tu madurez vivirás grandes viajes, renovación constante y una versatilidad que te mantendrá siempre con energía juvenil.",
  6: "Tus años de adultez mayor se centrarán en la calidez del hogar, el afecto incondicional de los tuyos y el rol de consejero familiar.",
  7: "Tu madurez será un período de profunda sabiduría espiritual, estudio de misterios y una rica vida contemplativa interior.",
  8: "La madurez te traerá el máximo logro material, reconocimiento de tu autoridad y la capacidad de gestionar finanzas y éxito.",
  9: "En tu etapa de madurez alcanzarás el desapego evolutivo, realizando labores de ayuda social y conectando con tu dimensión espiritual.",
  11: "Tus años maduros te verán actuar como un canal de inspiración espiritual y guía de conciencia para quienes te rodean.",
  22: "En tu madurez lograrás concretar proyectos colectivos que dejen una huella duradera de orden y bienestar material en el mundo.",
  33: "Tu madurez representará una entrega compasiva y de amor universal, guiando a la comunidad con sabiduría y serenidad espiritual."
};

const NUM_BIRTHDAY_DB = {
  1: { desc: "Liderazgo y originalidad innata. Tienes el impulso de iniciar proyectos.", group: 1 },
  2: { desc: "Gran sensibilidad, diplomacia y predisposición al trabajo en pareja.", group: 2 },
  3: { desc: "Talento creativo, expresión fluida y gran carisma social.", group: 3 },
  4: { desc: "Habilidad para organizar, perseverancia y apego a la estabilidad.", group: 4 },
  5: { desc: "Amor por el cambio, adaptabilidad y una mente inquieta.", group: 5 },
  6: { desc: "Afecto protector, sentido del deber familiar y amor por la armonía.", group: 6 },
  7: { desc: "Mente investigadora, interés por el misterio y necesidad de soledad.", group: 7 },
  8: { desc: "Ambición material, capacidad ejecutiva y resistencia física.", group: 8 },
  9: { desc: "Idealismo, visión compasiva y un fuerte sentido de la justicia.", group: 9 },
  10: { desc: "Poder de voluntad enfocado, nuevos comienzos y magnetismo personal.", group: 1 },
  11: { desc: "Intuición excepcional, sensibilidad psíquica y grandes ideales.", group: 2 },
  12: { desc: "Capacidad de ver el mundo desde el arte y facilidad para convencer.", group: 3 },
  13: { desc: "Fuerza para reconstruir desde las cenizas, disciplina y rigor.", group: 4 },
  14: { desc: "Búsqueda constante de equilibrio a través de viajes y cambios.", group: 5 },
  15: { desc: "Poder de atracción personal, magnetismo y amor por el hogar.", group: 6 },
  16: { desc: "Búsqueda de la verdad a través de crisis evolutivas espirituales.", group: 7 },
  17: { desc: "Claridad mental, ambición y confianza en tu buena estrella.", group: 8 },
  18: { desc: "Intuición profunda, sensibilidad al entorno e imaginación artística.", group: 9 },
  19: { desc: "Independencia férrea, individualismo luminoso y éxito autoconstruido.", group: 1 },
  20: { desc: "Receptividad espiritual, empatía y gran sentido de la cooperación.", group: 2 },
  21: { desc: "Facilidad de expresión, sociabilidad y logro de metas personales.", group: 3 },
  22: { desc: "Gran organizador práctico, capacidad constructiva y alta visión.", group: 4 },
  23: { desc: "Espíritu libre, versatilidad intelectual y comunicación ágil.", group: 5 },
  24: { desc: "Dedicación familiar, amor por la belleza y gran sentido de protección.", group: 6 },
  25: { desc: "Introspección analítica, interés en ciencias o ciencias ocultas.", group: 7 },
  26: { desc: "Voluntad férrea para materializar metas y capacidad ejecutiva.", group: 8 },
  27: { desc: "Mente abierta, humanitarismo amplio y desapego de lo material.", group: 9 },
  28: { desc: "Liderazgo dinámico equilibrado por la necesidad de cooperar.", group: 1 },
  29: { desc: "Espiritualidad intensa, idealismo y gran sensibilidad emocional.", group: 2 },
  30: { desc: "Autoexpresión artística libre, comunicación fluida y sociabilidad.", group: 3 },
  31: { desc: "Construcción firme, apego al orden y sentido práctico del deber.", group: 4 }
};

const NUM_REL_SOUL_DB = {
  1: "Vínculo de profunda independencia. Aunque se aman, ambos necesitan espacio personal para liderar sus propios proyectos sin asfixiarse.",
  2: "Sintonía emocional perfecta. Hay una ternura inmensa, gran empatía y una capacidad natural para consolarse y apoyarse mutuamente.",
  3: "Relación alegre y comunicativa. Disfrutan de la risa, el juego, las reuniones sociales y expresan su amor con gran entusiasmo creativo.",
  4: "Amor sólido y estructurado. Vuestra unión se basa en la lealtad, la seguridad material y el deseo de construir un hogar firme y duradero.",
  5: "Vínculo magnético, apasionado e inestable. Vivirán aventuras y cambios constantes, pero deben cuidar que la impulsividad no los distancie.",
  6: "Conexión sumamente familiar y protectora. El centro de vuestra unión es el cuidado mutuo, el calor del hogar y el bienestar comunitario.",
  7: "Unión espiritual y reflexiva. Se entienden en el silencio, disfrutan de la conversación intelectual profunda y respetan su soledad mística.",
  8: "Afinidad de poder y prosperidad. Juntos son una fuerza arrolladora capaz de generar éxito financiero, dirigir proyectos y prosperar.",
  9: "Amor universal y altruista. Comparten un gran ideal humanitario, se perdonan con facilidad y buscan sanar al mundo como un equipo.",
  11: "Conexión de almas maestras. Os inspiráis mutuamente a elevar vuestra conciencia y a actuar como un canal de luz e intuición para otros.",
  22: "Unión de constructores universales. Tenéis el potencial de materializar grandes ideales prácticos que trasciendan vuestro entorno.",
  33: "Consagración amorosa total. Es una vibración de amor incondicional absoluto y servicio desinteresado para sanar al prójimo juntos."
};

const NUM_REL_PERS_DB = {
  1: "Os mostráis ante la sociedad como una pareja fuerte, líder, segura e independiente, que abre sus propios caminos con orgullo.",
  2: "Proyectáis una imagen de pareja diplomática, amable, colaboradora y sumamente pacífica en vuestro trato social diario.",
  3: "La gente os ve como una pareja muy carismática, alegre, elocuente y sociable, llenando de vitalidad cualquier reunión.",
  4: "Transmitís la imagen de una unión seria, formal, trabajadora, estable y muy confiable en vuestros compromisos.",
  5: "Os mostráis como una pareja magnética, libre, aventurera, cambiante y juvenil, que huye de las normas rígidas.",
  6: "Proyectáis una vibración hogareña, protectora, responsable y sumamente cariñosa hacia vuestra familia y amigos.",
  7: "La sociedad os percibe como una pareja discreta, misteriosa, muy inteligente, formal y con un aura de reserva.",
  8: "Transmitís una imagen de éxito, autoridad, elegancia y solvencia material, proyectando una gran fuerza ejecutiva.",
  9: "Os mostráis como una pareja generosa, sabia, romántica y mística, con una visión humanitaria y abierta de la vida."
};

const NUM_REL_DEST_DB = {
  1: "Vuestro camino conjunto consiste en aprender a motivarse mutuamente hacia la autosuficiencia, liderando proyectos independientes.",
  2: "Vuestra misión como pareja es aprender a convivir en armonía, ejercitando la diplomacia, la empatía y la resolución pacífica de conflictos.",
  3: "Vuestra misión de pareja es comunicar, inspirar y esparcir alegría y optimismo a través de la creatividad o el arte compartido.",
  4: "Vuestro sendero os pide trabajar de forma constante y ordenada, echando bases materiales y emocionales sólidas para vuestra seguridad.",
  5: "Vuestra misión es experimentar la libertad en pareja, adaptándose con valentía a las mudanzas y viajando por el mundo.",
  6: "Vuestra unión tiene como misión asumir responsabilidades afectivas, proteger el núcleo familiar y sanar heridas del entorno.",
  7: "Vuestro propósito es profundizar en el conocimiento intelectual, la investigación o el esoterismo, creciendo en sabiduría interior.",
  8: "Vuestro sendero conjunto os reta a dominar las finanzas y el plano material con absoluta justicia y honestidad espiritual.",
  9: "Vuestra misión evolutiva es vivir con desapego, dedicándose a obras benéficas o humanitarias con amor incondicional universal.",
  11: "Vuestro camino maestro es servir como faro de inspiración espiritual y elevación de conciencia para vuestra comunidad.",
  22: "Vuestro propósito es construir sistemas u obras a gran escala que dejen una huella práctica de bienestar para la sociedad.",
  33: "Vuestra misión de luz es guiar con el ejemplo del amor compasivo incondicional, brindando consuelo espiritual a gran escala."
};

// Benages Couples of Tarot (Francisco Benages)
const TAROT_COUPLES = [
  { c1: 1, c2: 11, name: "El Mago + La Fuerza", desc: "Personas activas, impulso juvenil y gran magnetismo/vitalidad sexual." },
  { c1: 2, c2: 5, name: "La Sacerdotisa + El Sumo Sacerdote", desc: "Pareja espiritual, sentimientos sumamente profundos y una comunicación con raíces sagradas." },
  { c1: 3, c2: 4, name: "La Emperatriz + El Emperador", desc: "Pareja material de éxito, intereses comunes prósperos y concreción de metas en el plano físico." },
  { c1: 8, c2: 9, name: "La Justicia + El Ermitaño", desc: "Unión de la experiencia y la sabiduría. Madurez, introspección compartida y respeto absoluto sin apegos carnales." },
  { c1: 12, c2: 15, name: "El Colgado + El Diablo", desc: "Conjunción de dependencia. Advierte de relaciones de sometimiento, apegos tóxicos o sufrimiento que requiere liberación." },
  { c1: 13, c2: 14, name: "La Muerte + La Templanza", desc: "Relación de transmutación y curación. Período de grandes cambios emocionales y búsqueda de apoyo mutuo." },
  { c1: 18, c2: 19, name: "La Luna + El Sol", desc: "Almas gemelas. Afinidad profunda, unión de lo masculino y femenino en perfecto equilibrio cósmico." },
  { c1: 0, c2: 21, name: "El Loco + El Mundo", desc: "Unión perfecta del espíritu. Viaje culminado con éxito absoluto, libertad y realización mística." }
];


// Calculate current moon phase details dynamically
function getMoonPhaseDetails(date = new Date()) {
  // Use milliseconds-based synodic cycle calculation starting from a known New Moon reference.
  // This handles timezone and hour of day transitions, yielding much higher precision.
  const knownNewMoon = new Date('2019-12-26T05:13:00Z').getTime();
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000; // Average synodic cycle in milliseconds
  
  // Set date to noon local time to avoid boundary glitches
  const localDateNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
  const now = localDateNoon.getTime();
  const diff = now - knownNewMoon;
  const cycles = diff / synodicMonth;
  let phase = cycles - Math.floor(cycles);
  if (phase < 0) phase += 1;
  
  let phaseName = "";
  let description = "";
  let icon = "";
  
  if (phase < 0.025 || phase >= 0.975) {
    phaseName = "Luna Nueva";
    description = "Esta noche el cielo viste de oscuro. Es la fase de la <strong>introspección y la siembra</strong>. Las cartas te aconsejan iniciar caminos con mente abierta, libre de prejuicios y expectativas. Es un gran momento para formular consultas sobre nuevos comienzos o proyectos que arrancan desde cero.";
    icon = "🌑";
  } else if (phase >= 0.025 && phase < 0.225) {
    phaseName = "Luna Creciente";
    description = "La luz lunar comienza a brotar. Es la fase de la <strong>intención y la acción inicial</strong>. El influjo cósmico hoy favorece el desarrollo y la siembra activa de tus deseos. Aprovecha el consejo de las cartas para dar el primer paso con valentía.";
    icon = "🌒";
  } else if (phase >= 0.225 && phase < 0.275) {
    phaseName = "Cuarto Creciente";
    description = "La Luna se encuentra dividida a la mitad. Es la fase de la <strong>toma de decisiones y superación de obstáculos</strong>. Hoy el cosmos te reta a tomar partido y actuar. El oráculo te revelará qué fuerzas debes equilibrar para triunfar.";
    icon = "🌓";
  } else if (phase >= 0.275 && phase < 0.475) {
    phaseName = "Luna Giba Creciente";
    description = "La Luna está casi colmada. Es la fase del <strong>perfeccionamiento y la madurez intermedia</strong>. Es un período idóneo para afilar tus herramientas, analizar detalles y confiar en que la claridad final llegará a su debido tiempo.";
    icon = "🌔";
  } else if (phase >= 0.475 && phase < 0.525) {
    phaseName = "Luna Llena";
    description = "La gran linterna de plata brilla en su plenitud. Es la fase de la <strong>máxima intuición, revelación y culminación</strong>. El velo entre lo visible y lo invisible es sumamente delgado. Las respuestas que el oráculo te da son claras, maduras y cargadas de una fuerte iluminación. Confía plenamente en tu voz interior.";
    icon = "🌕";
  } else if (phase >= 0.525 && phase < 0.725) {
    phaseName = "Luna Giba Menguante";
    description = "La Luna inicia su declive luminoso. Es la fase de la <strong>gratitud y la asimilación de aprendizajes</strong>. El consejo de la lectura te invita a reflexionar sobre lo cosechado recientemente y a compartir tu sabiduría con otros.";
    icon = "🌖";
  } else if (phase >= 0.725 && phase < 0.775) {
    phaseName = "Cuarto Menguante";
    description = "La Luna reduce su mitad visible. Es la fase de la <strong>liberación, el perdón y el vaciado espiritual</strong>. El oráculo te impulsa a soltar cargas emocionales viejas, perdonar errores y dejar ir lo que obstaculiza tu libre evolución.";
    icon = "🌗";
  } else {
    phaseName = "Luna Menguante";
    description = "El último hilo de luz se despide del firmamento. Es la fase del <strong>descanso profundo, curación y cierre definitivo de ciclos</strong>. Excelente momento para consultar sobre la resolución final de conflictos, limpiezas energéticas o cómo despedir sanamente etapas de tu vida.";
    icon = "🌘";
  }
  
  return { phase, phaseName, description, icon };
}

/* ==========================================================================
   Generador de SVG de Fase Lunar Mística — Versión Premium
   ========================================================================== */
function getMoonSvg(phase, hemisphere = 'north') {
  const uid = Math.random().toString(36).slice(2, 7); // IDs únicos por instancia
  
  // Determinar si la luz está a la derecha o izquierda
  const isWaxing = phase <= 0.5;
  let lightOnRight = (hemisphere === 'north') ? isWaxing : !isWaxing;
  
  // ─── LUNA NUEVA ──────────────────────────────────────────────────
  if (phase < 0.025 || phase > 0.975) {
    return `<svg viewBox="0 0 120 120" class="mystical-moon-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nm-base-${uid}" cx="45%" cy="38%" r="55%">
          <stop offset="0%"   stop-color="#2a2550"/>
          <stop offset="60%"  stop-color="#0f0d22"/>
          <stop offset="100%" stop-color="#04030a"/>
        </radialGradient>
        <radialGradient id="nm-rim-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(160,140,255,0.18)"/>
        </radialGradient>
        <filter id="nm-glow-${uid}" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Halo mísitco exterior -->
      <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(120,90,220,0.12)" stroke-width="3"/>
      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(120,90,220,0.06)" stroke-width="6"/>
      <!-- Cuerpo lunar oscuro -->
      <circle cx="60" cy="60" r="48" fill="url(#nm-base-${uid})" stroke="rgba(200,180,255,0.07)" stroke-width="0.5"/>
      <!-- Rim glow -->
      <circle cx="60" cy="60" r="48" fill="url(#nm-rim-${uid})"/>
      <!-- Cráteres sutiles -->
      <circle cx="44" cy="48" r="6.5" fill="none" stroke="rgba(90,70,160,0.3)" stroke-width="0.8"/>
      <circle cx="44" cy="48" r="3"   fill="rgba(8,6,20,0.5)"/>
      <circle cx="58" cy="76" r="5.5" fill="none" stroke="rgba(90,70,160,0.25)" stroke-width="0.8"/>
      <circle cx="58" cy="76" r="2.5" fill="rgba(8,6,20,0.4)"/>
      <circle cx="78" cy="60" r="7.5" fill="none" stroke="rgba(90,70,160,0.2)"  stroke-width="0.8"/>
      <circle cx="78" cy="60" r="3.5" fill="rgba(8,6,20,0.35)"/>
      <circle cx="68" cy="38" r="3.5" fill="none" stroke="rgba(90,70,160,0.2)"  stroke-width="0.6"/>
      <!-- Estrellas decorativas alrededor -->
      <circle cx="18" cy="24" r="1.2" fill="rgba(255,255,255,0.7)" filter="url(#nm-glow-${uid})"/>
      <circle cx="100" cy="18" r="0.8" fill="rgba(255,255,255,0.5)"/>
      <circle cx="108" cy="80" r="1"   fill="rgba(255,255,255,0.6)"/>
      <circle cx="14" cy="90" r="0.9"  fill="rgba(255,255,255,0.5)"/>
    </svg>`;
  }

  // ─── LUNA LLENA ──────────────────────────────────────────────────
  if (phase >= 0.475 && phase <= 0.525) {
    return `<svg viewBox="0 0 120 120" class="mystical-moon-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fm-light-${uid}" cx="38%" cy="32%" r="60%">
          <stop offset="0%"   stop-color="#ffffff"/>
          <stop offset="45%"  stop-color="#fff8e8"/>
          <stop offset="80%"  stop-color="#f5d875"/>
          <stop offset="100%" stop-color="#c8951c"/>
        </radialGradient>
        <radialGradient id="fm-halo-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(229,193,88,0.3)"/>
        </radialGradient>
        <radialGradient id="fm-halo2-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(255,240,150,0.12)"/>
        </radialGradient>
        <filter id="fm-glow-${uid}" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Halos externos -->
      <circle cx="60" cy="60" r="58" fill="url(#fm-halo2-${uid})"/>
      <circle cx="60" cy="60" r="54" fill="url(#fm-halo-${uid})"/>
      <!-- Cuerpo lunar luminoso -->
      <circle cx="60" cy="60" r="48" fill="url(#fm-light-${uid})" filter="url(#fm-glow-${uid})"/>
      <!-- Cráteres visibles -->
      <circle cx="44" cy="48" r="6.5" fill="rgba(180,140,30,0.18)"/>
      <circle cx="44" cy="48" r="3"   fill="rgba(210,168,40,0.15)"/>
      <circle cx="58" cy="76" r="5.5" fill="rgba(180,140,30,0.15)"/>
      <circle cx="58" cy="76" r="2.5" fill="rgba(210,168,40,0.12)"/>
      <circle cx="78" cy="60" r="7.5" fill="rgba(180,140,30,0.14)"/>
      <circle cx="78" cy="60" r="3.5" fill="rgba(210,168,40,0.1)"/>
      <circle cx="35" cy="65" r="4"   fill="rgba(180,140,30,0.12)"/>
      <circle cx="68" cy="38" r="3"   fill="rgba(180,140,30,0.1)"/>
      <!-- Mare (mares lunares) dark patches -->
      <ellipse cx="50" cy="52" rx="11" ry="9"  fill="rgba(160,120,20,0.08)" transform="rotate(-15,50,52)"/>
      <ellipse cx="72" cy="45" rx="8"  ry="6"  fill="rgba(160,120,20,0.07)" transform="rotate(20,72,45)"/>
    </svg>`;
  }

  // ─── FASES PARCIALES ─────────────────────────────────────────────
  const sweepOuter = lightOnRight ? 1 : 0;
  const rx = 48 * Math.abs(1 - 4 * Math.abs(phase - 0.5));
  const safeRx = Math.max(0.5, rx);
  const isGibbous = phase > 0.25 && phase < 0.75;
  const sweepInner = isGibbous ? (lightOnRight ? 1 : 0) : (lightOnRight ? 0 : 1);
  
  return `<svg viewBox="0 0 120 120" class="mystical-moon-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pm-shadow-${uid}" cx="50%" cy="40%" r="55%">
        <stop offset="0%"   stop-color="#1e1b3a"/>
        <stop offset="70%"  stop-color="#0d0b1e"/>
        <stop offset="100%" stop-color="#06050b"/>
      </radialGradient>
      <radialGradient id="pm-light-${uid}" cx="38%" cy="32%" r="60%">
        <stop offset="0%"   stop-color="#ffffff"/>
        <stop offset="50%"  stop-color="#fff8e8"/>
        <stop offset="82%"  stop-color="#f0d060"/>
        <stop offset="100%" stop-color="#b8932c"/>
      </radialGradient>
      <radialGradient id="pm-rim-${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="78%" stop-color="transparent"/>
        <stop offset="100%" stop-color="rgba(229,193,88,0.15)"/>
      </radialGradient>
      <filter id="pm-glow-${uid}" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <clipPath id="pm-clip-${uid}">
        <circle cx="60" cy="60" r="48"/>
      </clipPath>
    </defs>
    <!-- Halo sutil -->
    <circle cx="60" cy="60" r="54" fill="url(#pm-rim-${uid})"/>
    <!-- Fondo oscuro lunar -->
    <circle cx="60" cy="60" r="48" fill="url(#pm-shadow-${uid})" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
    <!-- Cráteres en zona oscura -->
    <circle cx="44" cy="48" r="6.5" fill="rgba(10,8,28,0.7)"/>
    <circle cx="44" cy="48" r="3"   fill="rgba(6,5,15,0.8)"/>
    <circle cx="58" cy="76" r="5.5" fill="rgba(10,8,28,0.6)"/>
    <circle cx="58" cy="76" r="2.5" fill="rgba(6,5,15,0.7)"/>
    <circle cx="78" cy="60" r="7.5" fill="rgba(10,8,28,0.55)"/>
    <circle cx="78" cy="60" r="3.5" fill="rgba(6,5,15,0.6)"/>
    <!-- Sección iluminada con clip -->
    <g clip-path="url(#pm-clip-${uid})">
      <path d="M 60 12
               A 48 48 0 0 ${sweepOuter} 60 108
               A ${safeRx} 48 0 0 ${sweepInner} 60 12"
            fill="url(#pm-light-${uid})"
            filter="url(#pm-glow-${uid})"/>
      <!-- Cráteres en zona iluminada -->
      <circle cx="44" cy="48" r="5" fill="rgba(200,155,30,0.18)"/>
      <circle cx="58" cy="76" r="4" fill="rgba(200,155,30,0.15)"/>
      <circle cx="78" cy="60" r="6" fill="rgba(200,155,30,0.14)"/>
      <!-- Terminador glow line -->
      <line x1="60" y1="12" x2="60" y2="108"
            stroke="rgba(255,240,180,0.12)" stroke-width="2"
            transform="rotate(${lightOnRight ? 0 : 180}, 60, 60)"/>
    </g>
    <!-- Estrellas decorativas -->
    <circle cx="${lightOnRight ? 15 : 105}" cy="30"  r="1.2" fill="rgba(255,255,255,0.6)"/>
    <circle cx="${lightOnRight ? 10 : 110}" cy="80"  r="0.9" fill="rgba(255,255,255,0.5)"/>
    <circle cx="${lightOnRight ? 20 : 100}" cy="100" r="0.8" fill="rgba(255,255,255,0.4)"/>
  </svg>`;
}

// Get Sun Sign (Zodiac Season)
function getSunSign(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario";
  return "Piscis";
}

// Calculate Moon Sign (Dynamic Sidereal Lunar Position, Aries on 01/01/2026, Aquarius on 06/06/2026)
function getMoonSign(date = new Date()) {
  const refJD = 2451544.5; // Jan 1, 2000 reference
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const A = Math.floor(y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (y + 4716));
  const F = Math.floor(30.6001 * (m + 1));
  const jd = C + day + E + F - 1524.5;

  const days = jd - refJD;
  const position = (days / 27.321661) % 1;
  const deg = (position >= 0 ? position : position + 1) * 360;
  
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  // Offset of 202 degrees to calibrate moon position on Jan 1 2000
  let moonDeg = deg + 202;
  if (moonDeg >= 360) moonDeg -= 360;
  
  const idx = Math.floor(moonDeg / 30);
  return signs[idx];
}

// Card Art SVG Database (Return custom inline SVGs for the 22 Major Arcana)
function getCardSvg(id) {
  const gold = 'var(--gold-color)';
  const purple = 'var(--purple-color)';
  
  // Base SVG wrapper
  const svgStart = `<svg viewBox="0 0 100 100" class="card-art-svg" xmlns="http://www.w3.org/2000/svg">`;
  const svgEnd = `</svg>`;
  
  let content = '';
  
  switch(id) {
    case 0: // El Loco
      content = `
        <circle cx="50" cy="50" r="10" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="${gold}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <path d="M30 40 L50 20 L70 40 L50 80 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="20" r="3" fill="${gold}"/>
        <path d="M15 80 Q50 60 85 80" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 1: // El Mago
      content = `
        <path d="M30 30 Q50 15 70 30 Q50 45 30 30" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M30 70 Q50 55 70 70 Q50 85 30 70" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="30" y1="30" x2="70" y2="70" stroke="${purple}" stroke-width="1.5"/>
        <line x1="70" y1="30" x2="30" y2="70" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="12" fill="none" stroke="${gold}" stroke-width="2"/>
      `;
      break;
    case 2: // La Papisa
      content = `
        <rect x="30" y="35" width="40" height="50" rx="3" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="35" x2="50" y2="85" stroke="${gold}" stroke-width="1"/>
        <path d="M40 50 H60 M40 60 H60 M40 70 H60" stroke="${purple}" stroke-width="1.5"/>
        <path d="M25 20 Q50 40 75 20" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="20" r="6" fill="${gold}"/>
      `;
      break;
    case 3: // La Emperatriz
      content = `
        <path d="M20 70 L50 20 L80 70 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="45" r="15" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <path d="M50 20 V80 M35 70 H65" stroke="${gold}" stroke-width="1"/>
        <path d="M50 12 L55 22 L65 25 L57 32 L60 42 L50 36 L40 42 L43 32 L35 25 L45 22 Z" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 4: // El Emperador
      content = `
        <rect x="25" y="25" width="50" height="50" rx="6" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="25" y1="50" x2="75" y2="50" stroke="${gold}" stroke-width="1"/>
        <line x1="50" y1="25" x2="50" y2="75" stroke="${gold}" stroke-width="1"/>
        <circle cx="50" cy="50" r="8" fill="none" stroke="${purple}" stroke-width="2"/>
        <path d="M40 90 L50 75 L60 90" fill="none" stroke="${gold}" stroke-width="1.5"/>
      `;
      break;
    case 5: // El Papa
      content = `
        <line x1="50" y1="15" x2="50" y2="85" stroke="${gold}" stroke-width="2"/>
        <line x1="30" y1="30" x2="70" y2="30" stroke="${gold}" stroke-width="2"/>
        <line x1="35" y1="42" x2="65" y2="42" stroke="${gold}" stroke-width="1.5"/>
        <line x1="40" y1="55" x2="60" y2="55" stroke="${gold}" stroke-width="1.5"/>
        <path d="M30 80 C30 65 40 65 50 65 C60 65 70 65 70 80" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="65" r="4" fill="${gold}"/>
      `;
      break;
    case 6: // El Enamorado
      content = `
        <path d="M12 40 C12 25 31 20 50 40 C69 20 88 25 88 40 C88 65 50 85 50 85 C50 85 12 65 12 40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M50 35 L40 50 H60 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <line x1="10" y1="15" x2="90" y2="75" stroke="${gold}" stroke-width="1" stroke-dasharray="4,4"/>
        <polygon points="90,75 80,72 87,65" fill="${gold}"/>
      `;
      break;
    case 7: // El Carro
      content = `
        <rect x="25" y="45" width="50" height="35" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="35" cy="80" r="10" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="65" cy="80" r="10" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <path d="M50 15 L25 45 H75 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="35" r="5" fill="${gold}"/>
      `;
      break;
    case 8: // La Justicia
      content = `
        <line x1="20" y1="35" x2="80" y2="35" stroke="${gold}" stroke-width="2"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="${gold}" stroke-width="1.5"/>
        <line x1="30" y1="35" x2="30" y2="60" stroke="${purple}" stroke-width="1"/>
        <line x1="70" y1="35" x2="70" y2="60" stroke="${purple}" stroke-width="1"/>
        <path d="M20 60 Q30 70 40 60" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M60 60 Q70 70 80 60" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <polygon points="50,85 45,75 55,75" fill="${gold}"/>
      `;
      break;
    case 9: // El Ermitaño
      content = `
        <path d="M50 15 Q25 40 25 70 H75 Q75 40 50 15 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="45" r="8" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="53" x2="50" y2="85" stroke="${gold}" stroke-width="1.5"/>
        <path d="M40 85 H60" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="45" r="3" fill="${gold}"/>
      `;
      break;
    case 10: // La Rueda de la Fortuna
      content = `
        <circle cx="50" cy="50" r="28" fill="none" stroke="${gold}" stroke-width="2"/>
        <circle cx="50" cy="50" r="10" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="${purple}" stroke-width="1"/>
        <line x1="10" y1="50" x2="90" y2="50" stroke="${purple}" stroke-width="1"/>
        <line x1="22" y1="22" x2="78" y2="78" stroke="${purple}" stroke-width="1"/>
        <line x1="78" y1="22" x2="22" y2="78" stroke="${purple}" stroke-width="1"/>
      `;
      break;
    case 11: // La Fuerza
      content = `
        <path d="M50 20 Q70 5 85 20 Q70 35 50 20 Q30 5 15 20 Q30 35 50 20" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M25 75 C30 55 50 55 55 70 C55 55 70 55 75 75" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="35" cy="60" r="5" fill="${gold}"/>
        <circle cx="65" cy="60" r="5" fill="${gold}"/>
      `;
      break;
    case 12: // El Colgado
      content = `
        <line x1="20" y1="15" x2="80" y2="15" stroke="${gold}" stroke-width="2"/>
        <line x1="30" y1="15" x2="30" y2="85" stroke="${gold}" stroke-width="1.5"/>
        <line x1="70" y1="15" x2="70" y2="85" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="15" x2="50" y2="40" stroke="${purple}" stroke-width="1.5"/>
        <path d="M40 40 L60 40 L50 65 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="65" x2="50" y2="80" stroke="${purple}" stroke-width="1.5"/>
      `;
      break;
    case 13: // La Muerte
      content = `
        <path d="M80 20 Q40 20 30 50 L20 85" fill="none" stroke="${gold}" stroke-width="2"/>
        <path d="M30 50 L75 70" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="6" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="35" y1="41" x2="35" y2="60" stroke="${gold}" stroke-width="1"/>
        <path d="M20 85 H50" stroke="${gold}" stroke-width="1.5"/>
      `;
      break;
    case 14: // La Templanza
      content = `
        <path d="M30 25 H70 L60 55 H40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M30 80 H70 L60 55 H40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M42 38 Q50 50 58 38" fill="none" stroke="${purple}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <path d="M42 68 Q50 55 58 68" fill="none" stroke="${purple}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <circle cx="50" cy="50" r="4" fill="${gold}"/>
      `;
      break;
    case 15: // El Diablo
      content = `
        <polygon points="50,15 35,40 65,40" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M25 25 L35 40 M75 25 L65 40" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="35" cy="55" r="5" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="65" cy="55" r="5" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <path d="M35 60 L50 85 L65 60" fill="none" stroke="${gold}" stroke-width="1.5"/>
      `;
      break;
    case 16: // La Torre
      content = `
        <rect x="35" y="30" width="30" height="55" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <polygon points="30,30 50,12 70,30" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M15 25 L45 40 L40 50 L55 60 L45 75 L85 85" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="38" cy="45" r="2" fill="${gold}"/>
        <circle cx="62" cy="65" r="2" fill="${gold}"/>
      `;
      break;
    case 17: // La Estrella
      content = `
        <polygon points="50,12 53,28 68,20 57,32 72,38 56,43 62,58 50,47 38,58 44,43 28,38 43,32 32,20 47,28" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="3" fill="${purple}"/>
        <circle cx="80" cy="20" r="3" fill="${purple}"/>
        <circle cx="20" cy="70" r="3" fill="${purple}"/>
        <circle cx="80" cy="70" r="3" fill="${purple}"/>
        <path d="M35 85 Q50 65 65 85" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 18: // La Luna
      content = `
        <circle cx="50" cy="50" r="25" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M50 25 A25 25 0 0 0 25 50 A20 20 0 0 1 50 27" fill="${gold}"/>
        <polygon points="20,75 35,60 30,85" fill="none" stroke="${purple}" stroke-width="1"/>
        <polygon points="80,75 65,60 70,85" fill="none" stroke="${purple}" stroke-width="1"/>
        <path d="M40 90 Q50 78 60 90" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 19: // El Sol
      content = `
        <circle cx="50" cy="50" r="20" fill="none" stroke="${gold}" stroke-width="2"/>
        <circle cx="50" cy="50" r="14" fill="${gold}" opacity="0.3"/>
        <path d="M50 10 V25 M50 75 V90 M10 50 H25 M75 50 H90 M22 22 L32 32 M68 68 L78 78 M78 22 L68 32 M22 68 L32 58" stroke="${gold}" stroke-width="1.5"/>
        <path d="M50 18 Q55 35 62 38" fill="none" stroke="${purple}" stroke-width="1"/>
        <path d="M50 82 Q45 65 38 62" fill="none" stroke="${purple}" stroke-width="1"/>
      `;
      break;
    case 20: // El Juicio
      content = `
        <path d="M35 15 H65 L60 35 H40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="35" x2="50" y2="70" stroke="${gold}" stroke-width="1.5"/>
        <path d="M40 70 L50 85 L60 70 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="35" cy="80" r="4" fill="${gold}"/>
        <circle cx="65" cy="80" r="4" fill="${gold}"/>
        <path d="M20 50 Q50 35 80 50" fill="none" stroke="${gold}" stroke-width="1" stroke-dasharray="3,3"/>
      `;
      break;
    case 21: // El Mundo
      content = `
        <ellipse cx="50" cy="50" rx="24" ry="36" fill="none" stroke="${gold}" stroke-width="2"/>
        <path d="M50 25 L40 55 H60 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="4" fill="${gold}"/>
        <circle cx="80" cy="20" r="4" fill="${gold}"/>
        <circle cx="20" cy="80" r="4" fill="${gold}"/>
        <circle cx="80" cy="80" r="4" fill="${gold}"/>
      `;
      break;
  }
  
  return svgStart + content + svgEnd;
}

// Convert numbers to Roman numerals
function getRomanNumeral(id) {
  const roman = ["0", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "VIIII", "X", "XI", "XII", "XIII", "XIIII", "XV", "XVI", "XVII", "XVIII", "XVIIII", "XX", "XXI"];
  return roman[id] || id.toString();
}

// Numerological teosophical reduction to 0-21 range
function reduceTarotNumber(num) {
  while (num > 21) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

// Reduction to 1-9 (reserving master numbers 11, 22, 33)
function reduceNumerology(num) {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
}

// Analizar vocales y consonantes de un nombre para obtener el Perfil y estudio kármico
function analyzeNameNumerology(name) {
  const cleanName = name.toLowerCase()
    .replace(/ñ/g, '__tilde_n__')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/__tilde_n__/g, 'ñ')
    .replace(/[^a-zñ]/g, "");
  const vowelsList = ['a', 'e', 'i', 'o', 'u'];
  
  let soulSum = 0;
  let personalitySum = 0;
  let letterCounts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
  let totalLetters = 0;
  
  for (let char of cleanName) {
    const val = GEMATRIA_MAP[char];
    if (val) {
      letterCounts[val]++;
      totalLetters++;
      if (vowelsList.includes(char)) {
        soulSum += val;
      } else {
        personalitySum += val;
      }
    }
  }
  
  return {
    soulSum,
    personalitySum,
    letterCounts,
    totalLetters
  };
}

// Fisher-Yates Shuffling Algorithm
function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

// Initialize interface DOM elements
const questionInput = document.getElementById('question-input');
const categorySelect = document.getElementById('category-select');
const spreadSelect = document.getElementById('spread-select');
const consultBtn = document.getElementById('consult-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const cardsBoard = document.getElementById('cards-board');
const deckContainer = document.getElementById('deck-container');
const resultsPanel = document.getElementById('results-panel');
const resetBtn = document.getElementById('reset-btn');
const readingStatusTitle = document.getElementById('reading-status-title');
const readingStatusDesc = document.getElementById('reading-status-desc');
const reversalsToggle = document.getElementById('reversals-toggle');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const historyList = document.getElementById('history-list');

// Horoscope Tab DOM Elements
const zodiacSelect = document.getElementById('zodiac-select');
const astroSpreadSelect = document.getElementById('astro-spread-select');
const astroConsultBtn = document.getElementById('astro-consult-btn');
const astroShuffleBtn = document.getElementById('astro-shuffle-btn');
const astroCardsBoard = document.getElementById('astro-cards-board');
const astroDeckContainer = document.getElementById('astro-deck-container');
const astroResultsPanel = document.getElementById('astro-results-panel');
const astroResetBtn = document.getElementById('astro-reset-btn');
const astroReadingStatusTitle = document.getElementById('astro-reading-status-title');
const astroReadingStatusDesc = document.getElementById('astro-reading-status-desc');
const astroBreakdownGrid = document.getElementById('astro-breakdown-grid');
const astroForecastText = document.getElementById('astro-forecast-text');
const astroSummaryTitle = document.getElementById('astro-summary-title');
const astroSummaryForecastText = document.getElementById('astro-summary-forecast-text');
const astroSpecialSection = document.getElementById('astro-special-section');
const astroSpecialBox = document.getElementById('astro-special-box');
const astroUserSignText = document.getElementById('astro-user-sign-text');
const astroResultTitle = document.getElementById('astro-result-title');

// Transits elements
const astroTransitsConsultBtn = document.getElementById('astro-transits-consult-btn');
const astroTransitsPeriodSelect = document.getElementById('astro-transits-period-select');
const astroTarotFormGroup = document.getElementById('astro-tarot-form-group');
const astroTransitsFormGroup = document.getElementById('astro-transits-form-group');
const astroTarotResultsGroup = document.getElementById('astro-tarot-results-group');
const astroTransitsResultsGroup = document.getElementById('astro-transits-results-group');
const transitsPlanetsGrid = document.getElementById('transits-planets-grid');
const aspectsWheelDial = document.getElementById('aspects-wheel-dial');
const transitsGeneralBox = document.getElementById('transits-general-box');
const transitsLoveBox = document.getElementById('transits-love-box');
const transitsCareerBox = document.getElementById('transits-career-box');
const transitsMindBox = document.getElementById('transits-mind-box');

// Draw N unique cards from the shuffled deck, optionally applying reversed states
function drawCards(count) {
  const shuffled = shuffleDeck(window.tarotDb);
  const allowReversals = reversalsToggle ? reversalsToggle.checked : false;
  return shuffled.slice(0, count).map(card => {
    return {
      ...card,
      isReversed: allowReversals ? (Math.random() < 0.3) : false
    };
  });
}

// Setup Category Selector
if (categorySelect) {
  categorySelect.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
  });
}

// Shuffling Animation Trigger
shuffleBtn.addEventListener('click', () => {
  if (isShuffling) return;
  isShuffling = true;
  const deck = document.getElementById('mystical-deck');
  deck.classList.add('shuffling');
  shuffleBtn.textContent = 'Mezclando astros...';
  shuffleBtn.disabled = true;
  
  setTimeout(() => {
    deck.classList.remove('shuffling');
    shuffleBtn.textContent = 'Barajar Mazo';
    shuffleBtn.disabled = false;
    isShuffling = false;
  }, 1800);
});

// Consult Oracle Button click handler
consultBtn.addEventListener('click', () => {
  const question = questionInput.value.trim();
  const selectedSpreadVal = spreadSelect ? spreadSelect.value : 'yesno1';
  
  if (!question) {
    alert("Por favor, escribe tu pregunta antes de consultar al oráculo para que las cartas sintonicen con tu energía.");
    questionInput.focus();
    return;
  }

  // Set spread counts and card drawing logic
  cardsBoard.className = 'cards-board';
  if (selectedSpreadVal === 'yesno1') {
    totalCardsInSpread = 1;
    currentSpread = drawCards(1);
  } else if (selectedSpreadVal === 'yesno3' || selectedSpreadVal === 'destiny') {
    totalCardsInSpread = 3;
    currentSpread = drawCards(3);
  } else if (selectedSpreadVal === 'cross5') {
    totalCardsInSpread = 5;
    // Draw 4 unique cards first
    const drawn4 = drawCards(4);
    // Sum their IDs
    const sum = drawn4.reduce((acc, card) => acc + card.id, 0);
    // Reduce teosophically to 0-21 range
    const reducedId = reduceTarotNumber(sum);
    // Retrieve the calculated card from database and determine if reversed
    const rawSynthesisCard = window.tarotDb.find(c => c.id === reducedId);
    const allowReversals = reversalsToggle ? reversalsToggle.checked : false;
    const synthesisCard = {
      ...rawSynthesisCard,
      isReversed: allowReversals ? (Math.random() < 0.3) : false
    };
    // Create the final 5-card spread
    currentSpread = [...drawn4, synthesisCard];
    cardsBoard.classList.add('layout-cross');
  } else if (selectedSpreadVal === 'pyramid6') {
    totalCardsInSpread = 6;
    currentSpread = drawCards(6);
    cardsBoard.classList.add('layout-pyramid');
  } else if (selectedSpreadVal === 'celtic10') {
    totalCardsInSpread = 10;
    currentSpread = drawCards(10);
    cardsBoard.classList.add('layout-celtic');
  } else if (selectedSpreadVal === 'mirror4') {
    totalCardsInSpread = 4;
    currentSpread = drawCards(4);
    cardsBoard.classList.add('layout-mirror');
  } else if (selectedSpreadVal === 'clarity4') {
    totalCardsInSpread = 4;
    currentSpread = drawCards(4);
    cardsBoard.classList.add('layout-clarity');
  }
  flippedCount = 0;

  // Clear previous and deal placeholders
  cardsBoard.innerHTML = '';
  deckContainer.style.display = 'none';
  resultsPanel.classList.add('hidden');

  // Update tapete headers
  readingStatusTitle.textContent = "El Oráculo ha dispuesto tus cartas";
  readingStatusDesc.textContent = "Haz clic en cada carta para revelarla y leer su mensaje.";

  // Generate placeholders or card back wrappers
  currentSpread.forEach((card, index) => {
    let positionName = "Carta " + (index + 1);
    if (selectedSpreadVal === 'destiny') {
      const positions = ["Pasado / Origen", "Presente / Situación", "Futuro / Destino"];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'cross5') {
      const positions = ["A favor (Pro)", "En contra (Contra)", "Consejo / Juez", "Solución / Fallo", "Síntesis Central"];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'pyramid6') {
      const positions = [
        "Plano Mental (Mente)", 
        "Plano Sentimental (Corazón)", 
        "Plano Material (Acción)", 
        "El Obstáculo (Desafío)", 
        "El Apoyo (Recurso)", 
        "Desenlace (Consejo Final)"
      ];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'celtic10') {
      const positions = [
        "Tú (Actual)",
        "El Cruce (Obstáculo)",
        "La Corona (Metas)",
        "La Base (Raíces)",
        "El Pasado (Reciente)",
        "El Futuro (Inmediato)",
        "Tu Actitud",
        "Tu Entorno",
        "Esperanzas/Miedos",
        "El Resultado"
      ];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'mirror4') {
      const positions = [
        "Tu Estado Actual",
        "Su Estado Actual",
        "Tu Proyección sobre Ella/Él",
        "Su Proyección sobre Ti"
      ];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'clarity4') {
      const positions = [
        "El Bloqueo (Duda)",
        "La Fuerza Mágica (Recurso)",
        "La Acción (Conjuro)",
        "La Revelación"
      ];
      positionName = positions[index];
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.className = `card-wrapper dealt${card.isReversed ? ' reversed' : ''}`;
    cardWrapper.style.animationDelay = `${index * 0.25}s`;
    cardWrapper.setAttribute('data-index', index);

    // Remove dealt class after deal animation finishes to allow custom layout transforms (like rotation in Celtic Cross)
    setTimeout(() => {
      cardWrapper.classList.remove('dealt');
      cardWrapper.style.animationDelay = '';
    }, (index * 0.25 + 0.8) * 1000);

    // Create front/back card element structure
    cardWrapper.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      </div>
      <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
        ${positionName}
      </div>
    `;

    // Click handler for card flipping
    cardWrapper.addEventListener('click', function flipHandler() {
      if (cardWrapper.classList.contains('flipped')) return;
      cardWrapper.classList.add('flipped');
      flippedCount++;

      // Once all cards are flipped, show the interpretation
      if (flippedCount === totalCardsInSpread) {
        setTimeout(showInterpretation, 800);
      }
    });

    cardsBoard.appendChild(cardWrapper);
    apply3DTilt(cardWrapper);
  });

  // Smooth scroll to card board
  document.querySelector('.reading-table').scrollIntoView({ behavior: 'smooth' });
});

// Generate dynamic interpretations and display results
function showInterpretation() {
  const selectedSpreadVal = spreadSelect ? spreadSelect.value : 'yesno1';
  const question = questionInput.value.trim();

  // Populate basic header
  document.getElementById('result-question-text').textContent = `"${question}"`;
  
  // Set category badge
  const categoryNames = {
    general: 'General',
    love: 'Amor y Sentimientos',
    work: 'Trabajo y Finanzas',
    health: 'Bienestar y Salud'
  };
  const badge = document.getElementById('result-category-badge');
  badge.textContent = categoryNames[selectedCategory];

  // Setup Panels visibility
  const yesNoPanel = document.getElementById('yesno-verdict-section');
  const destinyPanel = document.getElementById('destiny-synthesis-section');
  const lunarInfluenceSection = document.getElementById('lunar-influence-section');
  
  yesNoPanel.classList.add('hidden');
  destinyPanel.classList.add('hidden');
  if (lunarInfluenceSection) lunarInfluenceSection.classList.add('hidden');

  if (selectedSpreadVal === 'yesno1' || selectedSpreadVal === 'yesno3') {
    yesNoPanel.classList.remove('hidden');
    calculateYesNo(selectedSpreadVal);
  } else {
    // MEJORA 9: Show mystical loader first, then reveal synthesis after 1.5s
    const loaderSection = document.getElementById('oracle-loader-section');
    if (loaderSection) loaderSection.classList.remove('hidden');

    const synthesisRevealFn = () => {
      if (loaderSection) loaderSection.classList.add('hidden');
      destinyPanel.classList.remove('hidden');

      if (selectedSpreadVal === 'destiny') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis Narrativa del Destino";
        generateDestinySynthesis(question);
      } else if (selectedSpreadVal === 'cross5') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis de la Tirada en Cruz";
        generateCrossSynthesis(question);
      } else if (selectedSpreadVal === 'pyramid6') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis de la Pirámide Invertida";
        generatePyramidSynthesis(question);
      } else if (selectedSpreadVal === 'celtic10') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis Evolutiva de la Cruz Celta";
        generateCelticSynthesis(question);
      } else if (selectedSpreadVal === 'mirror4') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis del Espejo Relacional";
        generateMirrorSynthesis(question);
      } else if (selectedSpreadVal === 'clarity4') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Hechizo de Claridad y Solución";
        generateClaritySynthesis(question);
      }
    };

    setTimeout(synthesisRevealFn, 1600);
  }

  // Populate Lunar Influence
  const lunarInfluenceSymbol = document.getElementById('lunar-influence-symbol');
  const lunarInfluenceText = document.getElementById('lunar-influence-text');
  
  if (lunarInfluenceSection && lunarInfluenceSymbol && lunarInfluenceText) {
    const lunarDetails = getMoonPhaseDetails();
    lunarInfluenceSymbol.textContent = lunarDetails.icon;
    
    let categoryNote = "";
    switch(selectedCategory) {
      case 'love':
        categoryNote = ` En la esfera sentimental, esta fase lunar aconseja enfocar tus intenciones hacia la curación emocional, la receptividad y la escucha mutua.`;
        break;
      case 'work':
        categoryNote = ` Respecto a tus finanzas y profesión, esta energía te sugiere actuar con prudencia, planificar tus pasos con estrategia y no apresurar inversiones.`;
        break;
      case 'health':
        categoryNote = ` En lo que respecta a tu bienestar, aprovecha este influjo cósmico para descansar, depurar tensiones y nutrir tu cuerpo físico.`;
        break;
      default:
        categoryNote = ` A nivel general, esta alineación celeste te invita a sintonizar tu voluntad personal con las leyes naturales del cambio y fluir con el ritmo universal.`;
    }
    
    lunarInfluenceText.innerHTML = `Bajo la influencia de la <strong>${lunarDetails.phaseName}</strong> (${lunarDetails.icon}): ${lunarDetails.description}${categoryNote}`;
    lunarInfluenceSection.classList.remove('hidden');
  }

  // Populate individual card breakdown details
  const breakdownGrid = document.getElementById('breakdown-grid');
  breakdownGrid.innerHTML = '';

  currentSpread.forEach((card, index) => {
    let posLabel = "Carta " + (index + 1);
    if (selectedSpreadVal === 'destiny') {
      const positions = ["Pasado / Origen", "Presente / Situación", "Futuro / Destino"];
      posLabel = positions[index];
    } else if (selectedSpreadVal === 'cross5') {
      const positions = ["A favor (Pro)", "En contra (Contra)", "Consejo / Juez", "Solución / Fallo", "Síntesis Central"];
      posLabel = positions[index];
    } else if (selectedSpreadVal === 'pyramid6') {
      const positions = [
        "Plano Mental (Mente)", 
        "Plano Sentimental (Corazón)", 
        "Plano Material (Acción)", 
        "El Obstáculo (Desafío)", 
        "El Apoyo (Recurso)", 
        "Desenlace (Consejo Final)"
      ];
      posLabel = positions[index];
    }

    const item = document.createElement('div');
    item.className = 'card-breakdown-card';
    
    const miniViewClass = `card-mini-view${card.isReversed ? ' reversed' : ''}`;
    const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
    const meaningText = card.isReversed ? card.reversed[selectedCategory] : card.meanings[selectedCategory];
    const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦", keywords: "Fuerza universal" };

    item.innerHTML = `
      <div class="${miniViewClass}" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      <div class="card-info-content">
        <div class="card-info-header">
          <h4 class="card-info-title">${cardNameDisplay}</h4>
          <span class="position-tag">${posLabel}</span>
        </div>
        <div class="card-astro-badge" title="${astro.keywords}">
          <span class="card-astro-symbol">${astro.symbol}</span>
          <span>Regente: ${astro.ruler} (${astro.keywords})</span>
        </div>
        <p class="card-info-themes"><strong>Energía:</strong> ${card.keyThemes}</p>
        <p class="card-info-meaning">${meaningText}</p>
      </div>
    `;
    breakdownGrid.appendChild(item);
  });

  // Reveal results
  resultsPanel.classList.remove('hidden');
  resultsPanel.scrollIntoView({ behavior: 'smooth' });

  // Update tapete subtitle
  readingStatusTitle.textContent = "Lectura Completada";
  readingStatusDesc.textContent = "Desplázate hacia abajo para leer la síntesis detallada del oráculo.";

  // Save to history (if it's not a reloaded reading)
  if (!isFromHistory) {
    saveReading(question, selectedSpreadVal);
  }
  isFromHistory = false; // Reset flag
}

// Calculate Yes/No answers and sum score weights
function calculateYesNo(type) {
  const badge = document.getElementById('verdict-badge');
  const explanation = document.getElementById('verdict-explanation');

  badge.className = 'verdict-badge'; // Reset classes

  if (type === 'yesno1') {
    const card = currentSpread[0];
    const score = card.isReversed ? (card.yesNoScore * -1) : card.yesNoScore;

    if (score > 0) {
      badge.textContent = 'SÍ';
      badge.classList.add('si');
    } else if (score < 0) {
      badge.textContent = 'NO';
      badge.classList.add('no');
    } else {
      badge.textContent = 'NEUTRO';
      badge.classList.add('neutro');
    }
    
    const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
    const meaningText = card.isReversed ? card.reversed[selectedCategory] : card.meanings[selectedCategory];
    
    let answerText = card.yesNoText;
    if (card.isReversed) {
      if (card.yesNoScore > 0) {
        answerText = "Su energía positiva se encuentra bloqueada u obstaculizada, sugiriendo retrasos u oposiciones a tu consulta.";
      } else if (card.yesNoScore < 0) {
        answerText = "Los aspectos difíciles o negativos de esta carta se muestran atenuados o en vías de resolución, abriendo una ventana de oportunidad o liberación lenta.";
      } else {
        answerText = "Las dudas e incertidumbres se profundizan o se vuelven más complejas, recomendando no actuar precipitadamente.";
      }
    }

    explanation.innerHTML = `<strong>${cardNameDisplay}</strong> responde: ${answerText}<br><br><span style="font-size:0.9rem; color:var(--text-muted);">${meaningText}</span>`;
  } else {
    // 3 Cards spread logic
    let totalScore = 0;
    currentSpread.forEach(card => {
      const score = card.isReversed ? (card.yesNoScore * -1) : card.yesNoScore;
      totalScore += score;
    });

    let verdict = 'NEUTRO';
    if (totalScore > 0) {
      verdict = 'SÍ';
      badge.classList.add('si');
    } else if (totalScore < 0) {
      verdict = 'NO';
      badge.classList.add('no');
    } else {
      verdict = 'NEUTRO / DUDOSO';
      badge.classList.add('neutro');
    }

    badge.textContent = verdict;

    // Build explanatory composite answer
    let listHTML = `<span style="display:block; margin-bottom:1rem; font-weight:500;">La suma de fuerzas del oráculo dictamina un <strong>${verdict}</strong> con balance numerológico (${totalScore > 0 ? '+' : ''}${totalScore}). Aquí está el desglose del consejo:</span><ul style="list-style:none; padding-left:0; display:flex; flex-direction:column; gap:0.75rem;">`;
    
    currentSpread.forEach((card, index) => {
      const score = card.isReversed ? (card.yesNoScore * -1) : card.yesNoScore;
      const bulletColor = score > 0 ? 'var(--success-color)' : (score < 0 ? 'var(--error-color)' : 'var(--neutral-color)');
      const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
      
      let answerText = card.yesNoText;
      if (card.isReversed) {
        if (card.yesNoScore > 0) {
          answerText = "Su energía positiva se encuentra bloqueada u obstaculizada, sugiriendo retrasos u oposiciones.";
        } else if (card.yesNoScore < 0) {
          answerText = "Los aspectos difíciles se muestran atenuados o en vías de resolución, indicando una liberación lenta.";
        } else {
          answerText = "Las dudas se profundizan, indicando confusión o secreto.";
        }
      }

      listHTML += `
        <li style="border-left: 3px solid ${bulletColor}; padding-left: 0.75rem;">
          <strong>${cardNameDisplay}</strong>: ${answerText}
        </li>
      `;
    });
    
    listHTML += `</ul>`;
    explanation.innerHTML = listHTML;
  }
}

// Helper to get adapted narrative details for a card (taking into account reversal state)
function getCardNarrativeDetails(card) {
  const name = card.isReversed ? `${card.name} (Invertida)` : card.name;
  const themes = card.isReversed 
    ? `bloqueos o aspectos desafiantes de ${card.keyThemes.toLowerCase().replace('.', '')}` 
    : card.keyThemes.toLowerCase().replace('.', '');
  const meaning = card.isReversed ? card.reversed[selectedCategory] : card.meanings[selectedCategory];
  return { name, themes, meaning };
}

// Generate the narrative synthesis for past-present-future predictions
function generateDestinySynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Past
  const c2 = currentSpread[1]; // Present
  const c3 = currentSpread[2]; // Future

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);

  // Connective structures to weave a continuous narrative
  let categoryIntro = '';
  switch(selectedCategory) {
    case 'love':
      categoryIntro = 'la esfera sentimental y afectiva';
      break;
    case 'work':
      categoryIntro = 'tu panorama laboral, profesional o económico';
      break;
    case 'health':
      categoryIntro = 'tu bienestar físico, mental y energético';
      break;
    default:
      categoryIntro = 'los senderos generales de tu destino';
  }

  // Síntesis narrativa mística cálida y cercana, con párrafos bien separados
  textContainer.innerHTML = `
    <p>Siento en tus palabras la inquietud sincera que traes al oráculo sobre <strong>${categoryIntro}</strong> y tu pregunta: <em>"${question}"</em>. Deja que estas tres cartas susurren a tu oído la sabiduría de su viaje.</p>
    <p>Mirando hacia atrás, veo que en tu <strong>pasado</strong> se alza la figura de <strong>${d1.name}</strong>. ${d1.meaning} Todo lo que viviste fue necesario para traerte hasta este portal.</p>
    <p>Hoy, en tu <strong>presente</strong>, te acompaña la presencia de <strong>${d2.name}</strong>. ${d2.meaning} Escucha con atención este mensaje, porque es el latido del ahora que te pide ser integrado.</p>
    <p>Y al dar el siguiente paso, hacia el <strong>futuro</strong> que ya se está dibujando, se enciende la luz de <strong>${d3.name}</strong>. ${d3.meaning}</p>
    <p>Como una vieja amistad que te conoce en profundidad, el oráculo te recuerda que el puente entre lo que fuiste con <em>${d1.name}</em> y lo que vas a ser con <em>${d3.name}</em> se construye con la decisión y la entrega que tomes hoy bajo la guía de <em>${d2.name}</em>. Confía en tu propio caminar.</p>
  `;
}

// Generate narrative synthesis for 5-card cross spread
function generateCrossSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Pro
  const c2 = currentSpread[1]; // Contra
  const c3 = currentSpread[2]; // Consejo
  const c4 = currentSpread[3]; // Solución
  const c5 = currentSpread[4]; // Synthesis

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);
  const d5 = getCardNarrativeDetails(c5);

  let categoryIntro = '';
  switch(selectedCategory) {
    case 'love':
      categoryIntro = 'tu situación sentimental';
      break;
    case 'work':
      categoryIntro = 'tu dilema laboral o económico';
      break;
    case 'health':
      categoryIntro = 'tu bienestar y equilibrio físico';
      break;
    default:
      categoryIntro = 'las fuerzas activas en tu vida';
  }

  textContainer.innerHTML = `
    <p>Para dar respuesta a tu inquietud sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>, hemos abierto los senderos del oráculo. Una cruz de luz se dibuja en tu lectura para guiar tus pasos con claridad y cercanía.</p>
    <p>Tienes de tu lado una gran bendición: a tu <strong>favor</strong> cuentas con la fuerza de <strong>${d1.name}</strong>. ${d1.meaning} Confía en este aliado interno.</p>
    <p>Al mismo tiempo, la vida te invita a crecer a través de un <strong>desafío</strong> encarnado por <strong>${d2.name}</strong>. ${d2.meaning} No lo mires como una piedra en el camino, sino como un aprendizaje que te fortalecerá.</p>
    <p>Como una guía cariñosa, el <strong>consejo</strong> del cosmos llega hoy con <strong>${d3.name}</strong>. ${d3.meaning}</p>
    <p>Si acoges esta sabiduría, el <strong>desenlace</strong> que se abre ante ti estará guiado por la maravillosa vibración de <strong>${d4.name}</strong>. ${d4.meaning}</p>
    <p>En el centro de todo este viaje, como el latido esencial de la lectura, la vibración profunda de <strong>${d5.name}</strong> nos recuerda el sentido último de lo que estás viviendo. Esta carta sintetiza tu camino y te susurra: ${d5.meaning}</p>
  `;
}

// Generate narrative synthesis for Inverted Pyramid spread
function generatePyramidSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Mental
  const c2 = currentSpread[1]; // Sentimental
  const c3 = currentSpread[2]; // Material
  const c4 = currentSpread[3]; // Obstáculo
  const c5 = currentSpread[4]; // Apoyo
  const c6 = currentSpread[5]; // Desenlace

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);
  const d5 = getCardNarrativeDetails(c5);
  const d6 = getCardNarrativeDetails(c6);

  let categoryIntro = '';
  switch(selectedCategory) {
    case 'love':
      categoryIntro = 'la esfera sentimental';
      break;
    case 'work':
      categoryIntro = 'tus proyectos y economía';
      break;
    case 'health':
      categoryIntro = 'tu salud y vitalidad';
      break;
    default:
      categoryIntro = 'tu camino de vida';
  }

  textContainer.innerHTML = `
    <p>Al mirar tu pregunta sobre <strong>${categoryIntro}</strong> —<em>"${question}"</em>—, el oráculo traza una pirámide de estrellas que desciende hacia tu interior. Son seis fuerzas que hablan con cariño y claridad sobre tu realidad presente.</p>
    <p>En tu plano <strong>mental</strong>, la energía de <strong>${d1.name}</strong> reina con claridad. ${d1.meaning}</p>
    <p>Tu <strong>corazón</strong> late hoy al compás de <strong>${d2.name}</strong>. ${d2.meaning}</p>
    <p>En tu vida <strong>material y cotidiana</strong>, la influencia de <strong>${d3.name}</strong> marca el camino. ${d3.meaning}</p>
    <p>El <strong>obstáculo</strong> que el cosmos te invita a integrar y superar es <strong>${d4.name}</strong>. ${d4.meaning}</p>
    <p>Pero no estás en soledad frente a este reto. Tu fortaleza aliada, tu <strong>apoyo</strong> más auténtico, es <strong>${d5.name}</strong>. ${d5.meaning}</p>
    <p>Finalmente, todo este fluir de energías confluye en el <strong>desenlace</strong> marcado por <strong>${d6.name}</strong>. Su mensaje de cierre es una verdad luminosa: ${d6.meaning} Sigue ese sendero con confianza.</p>
  `;
}

// Reset / Perform another consultation
resetBtn.addEventListener('click', () => {
  // Clear inputs and state
  questionInput.value = '';
  resultsPanel.classList.add('hidden');
  deckContainer.style.display = 'flex';
  cardsBoard.innerHTML = '';
  
  // Reset tapete text
  readingStatusTitle.textContent = "Prepara tu mente y formula tu pregunta...";
  readingStatusDesc.textContent = "Selecciona tus opciones en el panel lateral y pulsa el botón dorado.";
  
  // Smooth scroll back to settings
  document.querySelector('.config-panel').scrollIntoView({ behavior: 'smooth' });
});

// Save reading to localStorage
function saveReading(question, spreadType) {
  const history = JSON.parse(localStorage.getItem('tarot_reading_history') || '[]');
  const isAstro = spreadType === 'astro_daily' || spreadType === 'astro_weekly';
  
  const newReading = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    date: new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    question: question,
    category: isAstro ? selectedZodiac : selectedCategory,
    spreadType: spreadType,
    cards: (isAstro ? currentAstroSpread : currentSpread).map(card => {
      return {
        id: card.id,
        name: card.name,
        isReversed: card.isReversed
      };
    })
  };
  
  history.push(newReading);
  localStorage.setItem('tarot_reading_history', JSON.stringify(history));
  loadHistory();
}

// Load and render history items
function loadHistory() {
  if (!historyList) return;
  const history = JSON.parse(localStorage.getItem('tarot_reading_history') || '[]');
  
  if (history.length === 0) {
    historyList.innerHTML = `
      <p class="no-history-text" style="color: var(--text-muted); text-align: center; font-style: italic; padding: 2rem 0;">Aún no has registrado lecturas en tu diario de destino. Las consultas que realices aparecerán aquí.</p>
    `;
    return;
  }
  
  // Sort by timestamp descending
  history.sort((a, b) => b.timestamp - a.timestamp);
  
  historyList.innerHTML = '';
  history.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'history-item';
    itemEl.setAttribute('data-id', item.id);
    
    const spreadLabels = {
      yesno1: 'Sí o No (1 carta)',
      yesno3: 'Sí o No (3 cartas)',
      destiny: 'Tirada del Destino',
      cross5: 'Tirada en Cruz',
      pyramid6: 'Pirámide Invertida',
      celtic10: 'La Cruz Celta',
      mirror4: 'El Espejo Relacional',
      clarity4: 'Hechizo de Claridad',
      astro_daily: 'Horóscopo Diario',
      astro_weekly: 'Horóscopo Semanal'
    };
    
    const categoryLabels = {
      general: 'General',
      love: 'Amor',
      work: 'Trabajo',
      health: 'Salud',
      aries: 'Aries ♈',
      tauro: 'Tauro ♉',
      geminis: 'Géminis ♊',
      cancer: 'Cáncer ♋',
      leo: 'Leo ♌',
      virgo: 'Virgo ♍',
      libra: 'Libra ♎',
      escorpio: 'Escorpio ♏',
      sagitario: 'Sagitario ♐',
      capricornio: 'Capricornio ♑',
      acuario: 'Acuario ♒',
      piscis: 'Piscis ♓'
    };
    
    // Generate mini card views
    let miniCardsHTML = '';
    item.cards.forEach(c => {
      miniCardsHTML += `
        <div class="history-item-mini-card${c.isReversed ? ' reversed' : ''}" style="background-image: url('assets/card_${c.id}.jpg');" title="${c.name}${c.isReversed ? ' (Invertida)' : ''}"></div>
      `;
    });
    
    const cardsSummary = item.cards.map(c => `${c.name}${c.isReversed ? ' (Inv.)' : ''}`).join(', ');
    
    // MEJORA 3: Load saved note for this reading
    const notes = JSON.parse(localStorage.getItem('tarot_reading_notes') || '{}');
    const existingNote = notes[item.id] || '';
    
    itemEl.innerHTML = `
      <div class="history-item-meta">
        <span class="history-item-date">${item.date}</span>
        <div class="history-item-badge-row">
          <span class="history-item-badge category">${categoryLabels[item.category] || item.category}</span>
          <span class="history-item-badge spread">${spreadLabels[item.spreadType] || item.spreadType}</span>
        </div>
      </div>
      <div class="history-item-content">
        <span class="history-item-question">"${item.question}"</span>
        <span class="history-item-summary"><strong>Cartas:</strong> ${cardsSummary}</span>
      </div>
      <div class="history-item-cards">
        ${miniCardsHTML}
      </div>
      <div class="history-note-area ${existingNote ? 'visible' : ''}" data-note-id="${item.id}" style="display: ${existingNote ? 'block' : 'none'}">
        ${existingNote
          ? `<div class="history-note-text-display">💭 ${existingNote}</div>
             <button class="history-note-btn" data-note-action="edit">✏️ Editar nota</button>`
          : `<textarea class="history-note-input" placeholder="Escribe tu reflexión personal sobre esta lectura..." rows="2"></textarea>
             <span class="history-note-saved">✔ Nota guardada</span>`
        }
      </div>
      <button class="history-note-btn" data-note-action="toggle" style="margin-top: 0.4rem;">${existingNote ? '💬 Ver nota' : '➕ Añadir reflexión'}</button>
    `;
    
    // Click on item to restore (but not on note controls)
    itemEl.addEventListener('click', (e) => {
      if (e.target.closest('.history-note-area') || e.target.classList.contains('history-note-btn')) return;
      restoreReading(item.id);
    });
    
    // Note toggle button
    const noteToggleBtn = itemEl.querySelector('[data-note-action="toggle"]');
    const noteArea = itemEl.querySelector('.history-note-area');
    if (noteToggleBtn) {
      noteToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = noteArea.style.display !== 'none';
        noteArea.style.display = isVisible ? 'none' : 'block';
        noteToggleBtn.textContent = isVisible ? (existingNote ? '💬 Ver nota' : '➕ Añadir reflexión') : '✕ Cerrar';
      });
    }
    
    // Auto-save note on blur/change
    const noteTextarea = itemEl.querySelector('.history-note-input');
    if (noteTextarea) {
      noteTextarea.addEventListener('change', (e) => {
        e.stopPropagation();
        const savedNotes = JSON.parse(localStorage.getItem('tarot_reading_notes') || '{}');
        savedNotes[item.id] = noteTextarea.value.trim();
        localStorage.setItem('tarot_reading_notes', JSON.stringify(savedNotes));
        const savedMsg = itemEl.querySelector('.history-note-saved');
        if (savedMsg) { savedMsg.style.display = 'block'; setTimeout(() => { savedMsg.style.display = 'none'; }, 2000); }
      });
      noteTextarea.addEventListener('click', e => e.stopPropagation());
    }
    
    // Edit note button
    const editNoteBtn = itemEl.querySelector('[data-note-action="edit"]');
    if (editNoteBtn) {
      editNoteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const display = noteArea.querySelector('.history-note-text-display');
        const savedNote = notes[item.id] || '';
        if (display) {
          display.outerHTML = `<textarea class="history-note-input" rows="2">${savedNote}</textarea><span class="history-note-saved">✔ Nota guardada</span>`;
          editNoteBtn.style.display = 'none';
          const newTextarea = noteArea.querySelector('.history-note-input');
          if (newTextarea) {
            newTextarea.focus();
            newTextarea.addEventListener('change', (ev) => {
              ev.stopPropagation();
              const savedNotes = JSON.parse(localStorage.getItem('tarot_reading_notes') || '{}');
              savedNotes[item.id] = newTextarea.value.trim();
              localStorage.setItem('tarot_reading_notes', JSON.stringify(savedNotes));
              const savedMsg = noteArea.querySelector('.history-note-saved');
              if (savedMsg) { savedMsg.style.display = 'block'; setTimeout(() => { savedMsg.style.display = 'none'; }, 2000); }
            });
            newTextarea.addEventListener('click', ev => ev.stopPropagation());
          }
        }
      });
    }
    
    historyList.appendChild(itemEl);
  });
}

// Restore a past reading
function restoreReading(id) {
  const history = JSON.parse(localStorage.getItem('tarot_reading_history') || '[]');
  const reading = history.find(item => item.id === id);
  if (!reading) return;
  
  const isAstro = reading.spreadType === 'astro_daily' || reading.spreadType === 'astro_weekly';
  
  if (isAstro) {
    isAstroFromHistory = true;
    selectedZodiac = reading.category;
    selectedAstroSpread = reading.spreadType;
    if (zodiacSelect) zodiacSelect.value = selectedZodiac;
    if (astroSpreadSelect) astroSpreadSelect.value = selectedAstroSpread;
    
    // Switch active tab styling
    document.querySelectorAll('.nav-tab').forEach(t => {
      if (t.getAttribute('data-tab') === 'horoscope') {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    document.getElementById('oracle-tab-content').classList.add('hidden');
    document.getElementById('book-tab-content').classList.add('hidden');
    document.getElementById('horoscope-tab-content').classList.remove('hidden');
    const numTab = document.getElementById('numerology-tab-content');
    if (numTab) numTab.classList.add('hidden');
    const dailyTab = document.getElementById('daily-tab-content');
    if (dailyTab) dailyTab.classList.add('hidden');
    
    currentAstroSpread = reading.cards.map(savedCard => {
      const dbCard = window.tarotDb.find(c => c.id === savedCard.id);
      return {
        ...dbCard,
        isReversed: savedCard.isReversed
      };
    });
    
    astroFlippedCount = currentAstroSpread.length;
    astroTotalCards = currentAstroSpread.length;
    
    astroCardsBoard.className = 'cards-board' + (selectedAstroSpread === 'astro_houses' ? ' layout-houses' : '');
    astroCardsBoard.innerHTML = '';
    if (astroDeckContainer) astroDeckContainer.style.display = 'none';
    if (astroResultsPanel) astroResultsPanel.classList.add('hidden');
    
    currentAstroSpread.forEach((card, index) => {
      let posLabel = "Carta " + (index + 1);
      if (selectedAstroSpread === 'astro_weekly') {
        const positions = ["Energía Regente de la Semana", "El Desafío Semanal / Obstáculo", "El Consejo Astral / Solución"];
        posLabel = positions[index];
      } else if (selectedAstroSpread === 'astro_houses') {
        const positions = [
          "Casa I: Personalidad",
          "Casa II: Recursos",
          "Casa III: Entorno",
          "Casa IV: Hogar",
          "Casa V: Creatividad",
          "Casa VI: Trabajo/Salud",
          "Casa VII: Pareja",
          "Casa VIII: Transformación",
          "Casa IX: Filosofía",
          "Casa X: Profesión",
          "Casa XI: Amistad",
          "Casa XII: Subconsciente"
        ];
        posLabel = positions[index];
      } else {
        posLabel = "Tu Consejo Diario";
      }
      
      const cardWrapper = document.createElement('div');
      cardWrapper.className = `card-wrapper dealt flipped${card.isReversed ? ' reversed' : ''}`;
      cardWrapper.setAttribute('data-index', index);
      
      setTimeout(() => {
        cardWrapper.classList.remove('dealt');
      }, 800);
      
      if (selectedAstroSpread === 'astro_houses') {
        const angle = Math.PI - (index * Math.PI / 6);
        const R = 210;
        const centerX = 310;
        const centerY = 310;
        const left = Math.round(centerX + R * Math.cos(angle) - 55);
        const top = Math.round(centerY + R * Math.sin(angle) - 90);
        cardWrapper.style.left = `${left}px`;
        cardWrapper.style.top = `${top}px`;
      }
      
      cardWrapper.innerHTML = `
        <div class="card-inner">
          <div class="card-back"></div>
          <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
        </div>
        <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
          ${posLabel}
        </div>
      `;
      astroCardsBoard.appendChild(cardWrapper);
      apply3DTilt(cardWrapper);
    });
    
    if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "Lectura del Diario Cargada";
    if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = `Mostrando tu horóscopo del ${reading.date}`;
    
    showAstroInterpretation();
    document.querySelector('#horoscope-tab-content .reading-table').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  
  isFromHistory = true;
  selectedCategory = reading.category;
  
  questionInput.value = reading.question;
  
  if (categorySelect) categorySelect.value = selectedCategory;
  if (spreadSelect) spreadSelect.value = reading.spreadType;
  
  // Switch active tab styling to oracle
  document.querySelectorAll('.nav-tab').forEach(t => {
    if (t.getAttribute('data-tab') === 'oracle') {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  document.getElementById('oracle-tab-content').classList.remove('hidden');
  document.getElementById('book-tab-content').classList.add('hidden');
  if (document.getElementById('horoscope-tab-content')) document.getElementById('horoscope-tab-content').classList.add('hidden');
  if (document.getElementById('numerology-tab-content')) document.getElementById('numerology-tab-content').classList.add('hidden');
  if (document.getElementById('daily-tab-content')) document.getElementById('daily-tab-content').classList.add('hidden');
  
  currentSpread = reading.cards.map(savedCard => {
    const dbCard = window.tarotDb.find(c => c.id === savedCard.id);
    return {
      ...dbCard,
      isReversed: savedCard.isReversed
    };
  });
  
  flippedCount = currentSpread.length;
  totalCardsInSpread = currentSpread.length;
  
  cardsBoard.innerHTML = '';
  deckContainer.style.display = 'none';
  resultsPanel.classList.add('hidden');
  
  cardsBoard.className = 'cards-board';
  if (reading.spreadType === 'cross5') {
    cardsBoard.classList.add('layout-cross');
  } else if (reading.spreadType === 'pyramid6') {
    cardsBoard.classList.add('layout-pyramid');
  } else if (reading.spreadType === 'celtic10') {
    cardsBoard.classList.add('layout-celtic');
  } else if (reading.spreadType === 'mirror4') {
    cardsBoard.classList.add('layout-mirror');
  } else if (reading.spreadType === 'clarity4') {
    cardsBoard.classList.add('layout-clarity');
  }
  
  currentSpread.forEach((card, index) => {
    let positionName = "Carta " + (index + 1);
    if (reading.spreadType === 'destiny') {
      const positions = ["Pasado / Origen", "Presente / Situación", "Futuro / Destino"];
      positionName = positions[index];
    } else if (reading.spreadType === 'cross5') {
      const positions = ["A favor (Pro)", "En contra (Contra)", "Consejo / Juez", "Solución / Fallo", "Síntesis Central"];
      positionName = positions[index];
    } else if (reading.spreadType === 'pyramid6') {
      const positions = [
        "Plano Mental (Mente)", 
        "Plano Sentimental (Corazón)", 
        "Plano Material (Acción)", 
        "El Obstáculo (Desafío)", 
        "El Apoyo (Recurso)", 
        "Desenlace (Consejo Final)"
      ];
      positionName = positions[index];
    } else if (reading.spreadType === 'celtic10') {
      const positions = [
        "Tú (Actual)",
        "El Cruce (Obstáculo)",
        "La Corona (Metas)",
        "La Base (Raíces)",
        "El Pasado (Reciente)",
        "El Futuro (Inmediato)",
        "Tu Actitud",
        "Tu Entorno",
        "Esperanzas/Miedos",
        "El Resultado"
      ];
      positionName = positions[index];
    } else if (reading.spreadType === 'mirror4') {
      const positions = [
        "Tu Estado Actual",
        "Su Estado Actual",
        "Tu Proyección sobre Ella/Él",
        "Su Proyección sobre Ti"
      ];
      positionName = positions[index];
    } else if (reading.spreadType === 'clarity4') {
      const positions = [
        "El Bloqueo (Duda)",
        "La Fuerza Mágica (Recurso)",
        "La Acción (Conjuro)",
        "La Revelación"
      ];
      positionName = positions[index];
    }
    
    const cardWrapper = document.createElement('div');
    cardWrapper.className = `card-wrapper dealt flipped${card.isReversed ? ' reversed' : ''}`;
    cardWrapper.setAttribute('data-index', index);
    
    setTimeout(() => {
      cardWrapper.classList.remove('dealt');
    }, 800);
    
    cardWrapper.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      </div>
      <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
        ${positionName}
      </div>
    `;
    cardsBoard.appendChild(cardWrapper);
    apply3DTilt(cardWrapper);
  });
  
  readingStatusTitle.textContent = "Lectura del Diario Cargada";
  readingStatusDesc.textContent = `Mostrando la consulta del ${reading.date}`;
  
  showInterpretation();
  
  document.querySelector('.reading-table').scrollIntoView({ behavior: 'smooth' });
}

// Clear all history
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas vaciar tu Diario de Destino? Esta acción eliminará permanentemente todas tus tiradas guardadas.')) {
      localStorage.removeItem('tarot_reading_history');
      loadHistory();
    }
  });
}

// Initialize history on startup
loadHistory();

// Initialize moon phase widget in header
function initMoonPhaseHeader() {
  const moonIcon = document.getElementById('moon-icon');
  const moonName = document.getElementById('moon-name');
  const moonDesc = document.getElementById('moon-phase-description');
  if (moonIcon && moonName) {
    const details = getMoonPhaseDetails();
    moonIcon.innerHTML = getMoonSvg(details.phase, localStorage.getItem('lunar_hemisphere') || 'north');
    moonName.textContent = details.phaseName;
    if (moonDesc) {
      moonDesc.innerHTML = details.description;
    }
  }
}
initMoonPhaseHeader();

// Interactive Constellations Background (Canvas HTML5)
function initConstellations() {
  const canvas = document.getElementById('constellations-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const particles = [];
  const particleCount = Math.min(120, Math.max(40, Math.floor((width * height) / 16000)));
  const mouse = { x: 0, y: 0, active: false };

  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = (Math.random() - 0.5) * 0.15;
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random();
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleDir = Math.random() < 0.5 ? 1 : -1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      this.alpha += this.twinkleSpeed * this.twinkleDir;
      if (this.alpha <= 0.2) {
        this.alpha = 0.2;
        this.twinkleDir = 1;
      } else if (this.alpha >= 1) {
        this.alpha = 1;
        this.twinkleDir = -1;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 193, 88, ${this.alpha * 0.75})`;
      ctx.shadowBlur = this.radius * 2;
      ctx.shadowColor = 'rgba(229, 193, 88, 0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Star());
  }

  // Capture mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const targetCount = Math.min(120, Math.max(40, Math.floor((width * height) / 16000)));
    if (particles.length < targetCount) {
      const diff = targetCount - particles.length;
      for (let i = 0; i < diff; i++) particles.push(new Star());
    } else if (particles.length > targetCount) {
      particles.splice(targetCount);
    }
  });

  // Main animation frame loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    const maxDist = 95;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.14;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(229, 193, 88, ${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      const mouseMaxDist = 135;
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseMaxDist) {
          const alpha = (1 - dist / mouseMaxDist) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize constellations background
initConstellations();

// Navigation & Tarot Book Encyclopedia Logic
function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const oracleContent = document.getElementById('oracle-tab-content');
  const bookContent = document.getElementById('book-tab-content');
  const horoscopeContent = document.getElementById('horoscope-tab-content');
  const numerologyContent = document.getElementById('numerology-tab-content');
  const lunarContent = document.getElementById('lunar-tab-content');
  const dailyContent = document.getElementById('daily-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Activate clicked tab
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');
      
      // Hide all first
      oracleContent.classList.add('hidden');
      bookContent.classList.add('hidden');
      if (horoscopeContent) horoscopeContent.classList.add('hidden');
      if (numerologyContent) numerologyContent.classList.add('hidden');
      if (lunarContent) lunarContent.classList.add('hidden');
      if (dailyContent) dailyContent.classList.add('hidden');

      if (target === 'oracle') {
        oracleContent.classList.remove('hidden');
      } else if (target === 'daily') {
        if (dailyContent) {
          dailyContent.classList.remove('hidden');
        }
      } else if (target === 'horoscope') {
        if (horoscopeContent) {
          horoscopeContent.classList.remove('hidden');
          // Load saved zodiac sign if available
          const savedZodiac = localStorage.getItem('user_zodiac_sign');
          if (savedZodiac && zodiacSelect) {
            zodiacSelect.value = savedZodiac;
            selectedZodiac = savedZodiac;
          }
        }
      } else if (target === 'book') {
        bookContent.classList.remove('hidden');
        // Lazy initialize the book grid if it hasn't been done
        initTarotBook();
      } else if (target === 'numerology') {
        if (numerologyContent) {
          numerologyContent.classList.remove('hidden');
        }
      } else if (target === 'lunar') {
        if (lunarContent) {
          lunarContent.classList.remove('hidden');
          renderLunarTabDetails();
        }
      }
    });
  });
}

function getMinorArcanaSuitInfo(cardId) {
  if (cardId < 22) return null;
  if (cardId >= 22 && cardId <= 35) {
    return { symbol: "🔥", suit: "Bastos", rank: getMinorArcanaRankName(cardId - 22) };
  } else if (cardId >= 36 && cardId <= 49) {
    return { symbol: "💧", suit: "Copas", rank: getMinorArcanaRankName(cardId - 36) };
  } else if (cardId >= 50 && cardId <= 63) {
    return { symbol: "⚔️", suit: "Espadas", rank: getMinorArcanaRankName(cardId - 50) };
  } else if (cardId >= 64 && cardId <= 77) {
    return { symbol: "🌿", suit: "Oros", rank: getMinorArcanaRankName(cardId - 64) };
  }
  return null;
}

function getMinorArcanaRankName(offset) {
  const ranks = ["As", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Sota", "Caballero", "Reina", "Rey"];
  return ranks[offset] || "";
}

let isBookInitialized = false;
function initTarotBook() {
  if (isBookInitialized) return;
  
  const bookGrid = document.getElementById('book-grid');
  const bookSearch = document.getElementById('book-search');
  if (!bookGrid) return;

  bookGrid.innerHTML = '';
  
  // Render cards sorted by ID
  const sortedCards = [...window.tarotDb].sort((a, b) => a.id - b.id);
  
  sortedCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'book-card-item';
    cardEl.setAttribute('data-id', card.id);
    cardEl.setAttribute('data-name', card.name.toLowerCase());
    
    cardEl.innerHTML = `
      <div class="book-card-art" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      <span class="book-card-name">${card.name}</span>
    `;
    
    cardEl.addEventListener('click', () => {
      openCardDetailModal(card.id);
    });
    
    bookGrid.appendChild(cardEl);
  });

  // Search filter keyup event
  if (bookSearch) {
    bookSearch.addEventListener('input', () => {
      if (typeof window.applyBookFilter === 'function') {
        window.applyBookFilter();
      } else {
        const term = bookSearch.value.toLowerCase().trim();
        const cardItems = bookGrid.querySelectorAll('.book-card-item');
        
        cardItems.forEach(item => {
          const name = item.getAttribute('data-name');
          item.style.display = name.includes(term) ? 'flex' : 'none';
        });
      }
    });
  }

  isBookInitialized = true;
}

// Modal Details Grimorio Lógica
window.currentModalCardId = 0;

function navigateBookCard(targetId, direction) {
  const bookEl = document.getElementById('grimorio-book-el');
  if (!bookEl) {
    openCardDetailModal(targetId);
    return;
  }
  
  bookEl.classList.add(direction === 'next' ? 'page-turning-next' : 'page-turning-prev');
  
  setTimeout(() => {
    openCardDetailModal(targetId);
  }, 300);
}

function openCardDetailModal(cardId) {
  window.currentModalCardId = cardId;
  const modal = document.getElementById('card-detail-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  const card = window.tarotDb.find(c => c.id === cardId);
  if (!card) return;

  const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦", keywords: "Fuerza universal" };
  const romanId = card.id < 22 ? getRomanNumeral(card.id) : "";
  const subTitle = card.id < 22 ? `Arcano ${romanId}` : "Arcano Menor";
  
  const totalCards = window.tarotDb.length;
  const prevId = cardId === 0 ? totalCards - 1 : cardId - 1;
  const nextId = cardId === totalCards - 1 ? 0 : cardId + 1;

  modalBody.innerHTML = `
    <div class="grimorio-book-container">
      <button type="button" class="book-nav-btn prev-btn" id="book-prev-btn" aria-label="Arcano anterior">&lsaquo;</button>
      
      <div class="grimorio-book" id="grimorio-book-el">
        <div class="book-spine"></div>
        
        <!-- PAGINA IZQUIERDA: Arte de la Carta -->
        <div class="book-page left-page">
          <div class="page-ornament"></div>
          <div class="grimorio-header">
            <span class="grimorio-number">${subTitle}</span>
            <h3 class="grimorio-title">${card.name}</h3>
          </div>
          <div class="grimorio-card-art-wrapper">
            <div class="grimorio-card-art" style="background-image: url('assets/card_${card.id}.jpg');"></div>
          </div>
          <div class="grimorio-astro-details">
            <div class="card-astro-badge">
              <span class="card-astro-symbol">${astro.symbol}</span>
              <span>Regencia: <strong>${astro.ruler}</strong></span>
            </div>
            <p class="grimorio-themes"><strong>Fuerzas Clave:</strong> ${card.keyThemes}</p>
          </div>
        </div>
        
        <!-- PAGINA DERECHA: Significados del Arcano -->
        <div class="book-page right-page">
          <div class="page-ornament"></div>
          
          <div class="grimorio-tabs">
            <button type="button" class="grimorio-tab active" id="tab-upright-btn">✦ Derecho</button>
            <button type="button" class="grimorio-tab" id="tab-reversed-btn">✦ Invertido</button>
          </div>
          
          <div class="grimorio-meanings-scroll">
            <div class="grimorio-content-section" id="meaning-upright-content">
              <h4 class="grimorio-section-title upright">✦ Senda Luminosa</h4>
              <p style="margin-bottom: 0.5rem;"><strong>General:</strong> ${card.meanings.general}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Amor:</strong> ${card.meanings.love}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Trabajo:</strong> ${card.meanings.work}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Salud:</strong> ${card.meanings.health}</p>
            </div>
            
            <div class="grimorio-content-section hidden" id="meaning-reversed-content">
              <h4 class="grimorio-section-title reversed">✦ Senda Sombra</h4>
              <p style="margin-bottom: 0.5rem;"><strong>General:</strong> ${card.reversed.general}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Amor:</strong> ${card.reversed.love}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Trabajo:</strong> ${card.reversed.work}</p>
              <p style="margin-bottom: 0.5rem;"><strong>Salud:</strong> ${card.reversed.health}</p>
            </div>
            
            <div class="grimorio-footer-sigil">
              <span>🜁 🜂 🜃 🜄</span>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" class="book-nav-btn next-btn" id="book-next-btn" aria-label="Arcano siguiente">&rsaquo;</button>
    </div>
  `;

  // Bind tabs
  const tabUpright = document.getElementById('tab-upright-btn');
  const tabReversed = document.getElementById('tab-reversed-btn');
  const uprightContent = document.getElementById('meaning-upright-content');
  const reversedContent = document.getElementById('meaning-reversed-content');
  
  if (tabUpright && tabReversed && uprightContent && reversedContent) {
    tabUpright.addEventListener('click', () => {
      tabUpright.classList.add('active');
      tabReversed.classList.remove('active');
      uprightContent.classList.remove('hidden');
      reversedContent.classList.add('hidden');
    });
    
    tabReversed.addEventListener('click', () => {
      tabReversed.classList.add('active');
      tabUpright.classList.remove('active');
      reversedContent.classList.remove('hidden');
      uprightContent.classList.add('hidden');
    });
  }
  
  // Bind navigation buttons
  const prevBtn = document.getElementById('book-prev-btn');
  const nextBtn = document.getElementById('book-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateBookCard(prevId, 'prev'));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateBookCard(nextId, 'next'));
  }

  // Display modal and set book-mode class
  modal.classList.add('book-mode');
  modal.classList.remove('hidden');
}

function closeCardDetailModal() {
  const modal = document.getElementById('card-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('book-mode');
  }
}

// Bind modal closing events
function setupModalEvents() {
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCardDetailModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeCardDetailModal);
  }
  
  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCardDetailModal();
    }
  });
}

// Apply 3D Tilt and custom shine sheen reflections on hover
function apply3DTilt(cardWrapper) {
  if (!cardWrapper) return;
  const inner = cardWrapper.querySelector('.card-inner');
  if (!inner) return;

  let ticking = false;

  cardWrapper.addEventListener('mousemove', (e) => {
    if (cardWrapper.classList.contains('flipping')) return;

    if (!ticking) {
      requestAnimationFrame(() => {
        if (cardWrapper.classList.contains('flipping')) {
          ticking = false;
          return;
        }

        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const angleX = (yc - y) / 10; // Suavizado del ángulo a max ~9 grados
        const angleY = (x - xc) / 10;

        cardWrapper.classList.add('tilting');

        const isFlipped = cardWrapper.classList.contains('flipped');
        const rotationY = isFlipped ? angleY + 180 : angleY;
        
        inner.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)';
        inner.style.transform = `rotateY(${rotationY}deg) rotateX(${angleX}deg) scale(1.04)`;

        // Update CSS variables for shine positioning
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        cardWrapper.style.setProperty('--shine-x', `${px}%`);
        cardWrapper.style.setProperty('--shine-y', `${py}%`);
        
        ticking = false;
      });
      ticking = true;
    }
  });

  cardWrapper.addEventListener('mouseleave', () => {
    cardWrapper.classList.remove('tilting');
    if (cardWrapper.classList.contains('flipping')) return;
    
    const isFlipped = cardWrapper.classList.contains('flipped');
    inner.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    inner.style.transform = isFlipped ? 'rotateY(180deg) rotateX(0deg) scale(1)' : 'rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

// Astrological Transit Engine Metadata & Data Structures
const PLANET_METADATA = {
  sun: { name: "Sol", symbol: "☀️", keyword: "Esencia e Identidad" },
  moon: { name: "Luna", symbol: "🌙", keyword: "Emociones y Subconsciente" },
  mercury: { name: "Mercurio", symbol: "☿", keyword: "Mente y Comunicación" },
  venus: { name: "Venus", symbol: "♀", keyword: "Amor y Armonía" },
  mars: { name: "Marte", symbol: "♂", keyword: "Acción y Fuerza" },
  jupiter: { name: "Júpiter", symbol: "♃", keyword: "Expansión y Suerte" },
  saturn: { name: "Saturno", symbol: "♄", keyword: "Estructura y Lección" }
};

const ASPECT_TEXTS = {
  general: {
    conjunction: "El Sol y Saturno convergen con tu energía, marcando un período de profunda redefinición personal. Sientes el peso de tus decisiones, pero también la autoridad para cambiar tu rumbo.",
    trine: "El flujo de Saturno y el Sol es excepcionalmente suave hoy. Tus planes estructurados avanzan sin esfuerzo, dándote estabilidad y el respeto de quienes te rodean.",
    sextile: "Se abren oportunidades sólidas para consolidar proyectos a largo plazo. La disciplina te resulta natural y encuentras apoyo en figuras de autoridad.",
    square: "Sientes fricción entre tus deseos inmediatos y tus responsabilidades. Saturno te exige paciencia; no fuerces los resultados hoy, es momento de planificar.",
    opposition: "Pueden surgir tensiones o límites impuestos por otros. Es un llamado a equilibrar tus necesidades individuales con tus compromisos.",
    none: "El clima general es de estabilidad y calma. Un buen momento para centrarte en tu rutina diaria y en construir cimientos firmes sin prisa."
  },
  love: {
    conjunction: "Venus se funde con tu signo, potenciando al máximo tu magnetismo personal. Es un momento idóneo para expresar lo que sientes y abrir tu corazón.",
    trine: "El amor fluye de manera natural y espontánea. Si estás en pareja, la armonía y la complicidad se renuevan. Si estás soltero, atraes conexiones afines.",
    sextile: "Las conversaciones afectivas son fluidas y sanadoras. Excelente momento para citas, reconciliaciones o para fortalecer lazos de amistad.",
    square: "Tensiones en el ámbito afectivo por diferencias de criterio o expectativas. Evita discusiones acaloradas y busca comprender el punto de vista del otro.",
    opposition: "Una polaridad en tus relaciones te invita a negociar. Lo que te molesta del otro puede ser un espejo de lo que necesitas trabajar en ti mismo.",
    none: "Las energías afectivas están estables. Es un día favorable para el amor propio, el autocuidado y disfrutar de pequeños placeres sin presiones."
  },
  career: {
    conjunction: "Júpiter y Marte inyectan una dosis de vitalidad extrema a tu sector profesional. Estás listo para liderar, iniciar proyectos y expandir tus fronteras.",
    trine: "El viento sopla a tu favor en el trabajo y los negocios. Tus esfuerzos se traducen en oportunidades de expansión y reconocimiento financiero.",
    sextile: "Tu productividad es alta y tus ideas de negocio son bien recibidas. Es un buen momento para negociar contratos o planificar inversiones.",
    square: "Sensación de impaciencia o sobrecarga en tus tareas. Evita el conflicto con colegas y canaliza el exceso de energía en actividades físicas.",
    opposition: "Debes balancear tu ambición profesional con el descanso. Cuidado con promesas excesivas de socios o superiores que no se puedan cumplir.",
    none: "Tu panorama laboral se mantiene en orden. Buen momento para organizar tu agenda, finalizar pendientes y avanzar paso a paso."
  },
  mind: {
    conjunction: "Mercurio activa tu mente a niveles muy altos. Tu capacidad de aprendizaje y comunicación está en su punto álgido; escribe y comparte tus ideas.",
    trine: "Tu pensamiento es claro y tu intuición espiritual está agudizada. Buen momento para la meditación, la lectura o estudios filosóficos.",
    sextile: "Tu comunicación es asertiva y persuasiva. Es un día ideal para exámenes, entrevistas, o para resolver malentendidos pendientes.",
    square: "Ruido mental o dispersión en tus ideas. Te cuesta concentrarte; tómate pausas para calmar la mente y evita tomar decisiones apresuradas.",
    opposition: "Fricción en las comunicaciones. Esfuérzate por ser muy claro al expresarte para evitar malentendidos con quienes te rodean.",
    none: "Estabilidad mental y serenidad. Tu subconsciente procesa las lecciones recientes de manera pacífica. Buen día para la introspección."
  }
};

const ZODIAC_ORDER = ["aries", "tauro", "geminis", "cancer", "leo", "virgo", "libra", "escorpio", "sagitario", "capricornio", "acuario", "piscis"];

function getSignIndex(signName) {
  return ZODIAC_ORDER.indexOf(getSanitizedSignKey(signName));
}

function getAstroDateString(period, date = new Date()) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  
  if (period === 'daily' || period === 'astro_daily' || period === 'astro_houses') {
    return date.toLocaleDateString('es-ES', options);
  } else if (period === 'weekly' || period === 'astro_weekly') {
    const nextWeek = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
    const dayStart = date.getDate();
    const monthStart = date.toLocaleDateString('es-ES', { month: 'long' });
    const dayEnd = nextWeek.getDate();
    const monthEnd = nextWeek.toLocaleDateString('es-ES', { month: 'long' });
    const yearEnd = nextWeek.getFullYear();
    
    if (monthStart === monthEnd) {
      return `semana del ${dayStart} al ${dayEnd} de ${monthStart} de ${yearEnd}`;
    } else {
      return `semana del ${dayStart} de ${monthStart} al ${dayEnd} de ${monthEnd} de ${yearEnd}`;
    }
  } else {
    const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return `${capitalizedMonth} de ${date.getFullYear()}`;
  }
}

// Calculate celestial planetary longitudes (0 to 360 degrees) from Jan 1, 2026 epoch
function calculatePlanetaryLongitudes(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (y + 4716));
  const F = Math.floor(30.6001 * (m + 1));
  const jd = C + day + E + F - 1524.5;

  const msPerDay = 86400000;
  const epoch = new Date('2026-01-01T00:00:00Z');
  const days = (date - epoch) / msPerDay;
  
  // 1. Sun Apparent Orbit (365.25 days cycle, base 280 deg on Jan 1)
  const sunLong = (280.0 + days * (360.0 / 365.25)) % 360;
  
  // 2. Moon Sidereal Orbit (27.321661 days cycle, base 202 deg on Jan 1 2000)
  const daysSince2000 = jd - 2451544.5;
  const moonPos = (daysSince2000 / 27.321661) % 1;
  let moonLong = (moonPos >= 0 ? moonPos : moonPos + 1) * 360 + 202;
  moonLong = moonLong % 360;
  
  // 3. Mercury Orbit (87.97 days cycle, max 28 degrees elongation from Sun)
  const mercuryLong = (sunLong + 24.0 * Math.sin(days * (2 * Math.PI / 87.97) + 1.2) + 360) % 360;
  
  // 4. Venus Orbit (224.7 days cycle, max 48 degrees elongation from Sun)
  const venusLong = (sunLong + 44.0 * Math.sin(days * (2 * Math.PI / 224.7) + 0.5) + 360) % 360;
  
  // 5. Mars Orbit (686.98 days cycle, base 240 deg on Jan 1, 2026)
  const marsLong = (240.0 + days * (360.0 / 686.98) + 360) % 360;
  
  // 6. Jupiter Orbit (4332.59 days cycle, base 80 deg on Jan 1, 2026)
  const jupiterLong = (80.0 + days * (360.0 / 4332.59) + 360) % 360;
  
  // 7. Saturn Orbit (10759.22 days cycle, base 340 deg on Jan 1, 2026)
  const saturnLong = (340.0 + days * (360.0 / 10759.22) + 360) % 360;
  
  return {
    sun: sunLong,
    moon: moonLong,
    mercury: mercuryLong,
    venus: venusLong,
    mars: marsLong,
    jupiter: jupiterLong,
    saturn: saturnLong
  };
}

// Check aspect between user sign and planet sign
function getAstrologicalAspect(userSign, planetSign) {
  const userIdx = getSignIndex(userSign);
  const planetIdx = getSignIndex(planetSign);
  if (userIdx === -1 || planetIdx === -1) return { type: "none", name: "Neutro", symbol: "•", description: "Tránsito neutral con influencia moderada." };
  
  const diff = Math.abs(userIdx - planetIdx);
  const dist = Math.min(diff, 12 - diff);
  
  switch(dist) {
    case 0:
      return { type: "conjunction", name: "Conjunción", symbol: "☌", description: "Fusión de energías y autoexpresión intensa." };
    case 2:
      return { type: "sextile", name: "Sextil", symbol: "✶", description: "Oportunidades armónicas y fluidez mental." };
    case 3:
      return { type: "square", name: "Cuadratura", symbol: "□", description: "Tensión interna, desafíos y llamado a la acción." };
    case 4:
      return { type: "trine", name: "Trígono", symbol: "△", description: "Gran fluidez, suerte natural y armonía celestial." };
    case 6:
      return { type: "opposition", name: "Oposición", symbol: "☍", description: "Reto relacional, polaridad y necesidad de equilibrio." };
    default:
      return { type: "none", name: "Neutro", symbol: "•", description: "Tránsito neutral con influencia moderada." };
  }
}

// Render aspects SVG wheel
function renderAspectsWheel(userSign, planetLongitudes) {
  const container = document.getElementById('aspects-wheel-dial');
  if (!container) return;

  const width = 320;
  const height = 320;
  const cx = width / 2;
  const cy = height / 2;
  
  const userSignIdx = getSignIndex(userSign);
  const userAngleDeg = userSignIdx * 30 + 15;
  
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width:100%; display:block; margin:0 auto;">`;
  
  svg += `
    <defs>
      <radialGradient id="wheel-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(13, 11, 26, 0.95)" />
        <stop offset="100%" stop-color="rgba(8, 7, 17, 0.95)" />
      </radialGradient>
      <filter id="gold-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="aspect-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;
  
  svg += `<circle cx="${cx}" cy="${cy}" r="150" fill="url(#wheel-bg)" stroke="var(--border-color)" stroke-width="1.5" />`;
  svg += `<circle cx="${cx}" cy="${cy}" r="115" fill="none" stroke="rgba(212, 175, 55, 0.08)" stroke-width="1" />`;
  svg += `<circle cx="${cx}" cy="${cy}" r="85" fill="none" stroke="rgba(212, 175, 55, 0.05)" stroke-width="1" />`;
  
  const signs = [
    { symbol: "♈", name: "Aries" },
    { symbol: "♉", name: "Tauro" },
    { symbol: "♊", name: "Géminis" },
    { symbol: "♋", name: "Cáncer" },
    { symbol: "♌", name: "Leo" },
    { symbol: "♍", name: "Virgo" },
    { symbol: "♎", name: "Libra" },
    { symbol: "♏", name: "Escorpio" },
    { symbol: "♐", name: "Sagitario" },
    { symbol: "♑", name: "Capricornio" },
    { symbol: "♒", name: "Acuario" },
    { symbol: "♓", name: "Piscis" }
  ];
  
  signs.forEach((s, idx) => {
    const angleStart = (idx * 30 - 90) * Math.PI / 180;
    const angleEnd = ((idx + 1) * 30 - 90) * Math.PI / 180;
    const angleMid = (idx * 30 + 15 - 90) * Math.PI / 180;
    
    const x1 = cx + 115 * Math.cos(angleStart);
    const y1 = cy + 115 * Math.sin(angleStart);
    const x2 = cx + 150 * Math.cos(angleStart);
    const y2 = cy + 150 * Math.sin(angleStart);
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(212, 175, 55, 0.15)" stroke-width="0.75" />`;
    
    const tx = cx + 132 * Math.cos(angleMid);
    const ty = cy + 132 * Math.sin(angleMid) + 4.5;
    
    const isUserSign = (idx === userSignIdx);
    const signColor = isUserSign ? 'var(--gold-color)' : 'var(--text-muted)';
    const fontWeight = isUserSign ? 'bold' : 'normal';
    const fontSize = isUserSign ? '14px' : '11px';
    
    svg += `<text x="${tx}" y="${ty}" fill="${signColor}" font-size="${fontSize}" font-weight="${fontWeight}" text-anchor="middle" class="zodiac-symbol-text">${s.symbol}</text>`;
    
    if (isUserSign) {
      const xStart = cx + 148 * Math.cos(angleStart);
      const yStart = cy + 148 * Math.sin(angleStart);
      const xEnd = cx + 148 * Math.cos(angleEnd);
      const yEnd = cy + 148 * Math.sin(angleEnd);
      svg += `<path d="M ${xStart} ${yStart} A 148 148 0 0 1 ${xEnd} ${yEnd}" fill="none" stroke="var(--gold-color)" stroke-width="3.5" filter="url(#gold-glow-filter)" />`;
    }
  });
  
  const userRad = (userAngleDeg - 90) * Math.PI / 180;
  const userX = cx + 100 * Math.cos(userRad);
  const userY = cy + 100 * Math.sin(userRad);
  
  const planets = Object.keys(planetLongitudes);
  planets.forEach(p => {
    const long = planetLongitudes[p];
    const planetSignIdx = Math.floor(long / 30);
    const planetSign = signs[planetSignIdx].name;
    const aspect = getAstrologicalAspect(userSign, planetSign);
    
    const planetRad = (long - 90) * Math.PI / 180;
    const planetX = cx + 100 * Math.cos(planetRad);
    const planetY = cy + 100 * Math.sin(planetRad);
    
    if (aspect.type !== 'none' && aspect.type !== 'conjunction') {
      let strokeColor = '';
      if (aspect.type === 'trine') { strokeColor = '#06b6d4'; }
      else if (aspect.type === 'sextile') { strokeColor = '#10b981'; }
      else if (aspect.type === 'square') { strokeColor = '#ef4444'; }
      else if (aspect.type === 'opposition') { strokeColor = '#8b5cf6'; }
      
      svg += `<line x1="${userX}" y1="${userY}" x2="${planetX}" y2="${planetY}" stroke="${strokeColor}" stroke-width="1.75" filter="url(#aspect-glow)" opacity="0.85" />`;
    }
    
    const meta = PLANET_METADATA[p];
    const px = cx + 100 * Math.cos(planetRad);
    const py = cy + 100 * Math.sin(planetRad);
    
    if (aspect.type === 'conjunction') {
      svg += `<circle cx="${px}" cy="${py}" r="12" fill="none" stroke="var(--gold-color)" stroke-width="1" opacity="0.6" stroke-dasharray="2 2" />`;
    }
    
    svg += `
      <g class="planet-node-group" cursor="pointer">
        <circle cx="${px}" cy="${py}" r="9" fill="rgba(8, 7, 17, 0.9)" stroke="var(--border-color)" stroke-width="1" />
        <text x="${px}" y="${py + 3}" fill="var(--text-main)" font-size="8px" text-anchor="middle">${meta.symbol}</text>
        <title>${meta.name} en ${planetSign} (${Math.floor(long % 30)}°) - Aspecto: ${aspect.name}</title>
      </g>
    `;
  });
  
  svg += `
    <g transform="translate(${cx}, ${cy}) scale(0.6)">
      <circle cx="0" cy="0" r="16" fill="rgba(212, 175, 55, 0.05)" stroke="var(--gold-color)" stroke-width="0.75" />
      <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="var(--gold-color)" />
    </g>
  `;
  
  svg += `</svg>`;
  container.innerHTML = svg;
}

// Render planetary grid cards
function renderPlanetaryGrid(longitudes, userSign) {
  const grid = document.getElementById('transits-planets-grid');
  if (!grid) return;
  
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  let html = "";
  
  const planets = Object.keys(longitudes);
  planets.forEach(p => {
    const long = longitudes[p];
    const signIdx = Math.floor(long / 30);
    const signName = signs[signIdx];
    const signDeg = Math.floor(long % 30);
    
    const signKey = getSanitizedSignKey(signName);
    const signData = ZODIAC_INFO[signKey] || { symbol: "✦", element: "Éter", ruler: "Cosmos" };
    const aspect = getAstrologicalAspect(userSign, signName);
    const meta = PLANET_METADATA[p];
    
    const elementClass = "element-" + getSanitizedSignKey(signData.element);
    
    let aspectClass = "aspect-" + aspect.type;
    let aspectDisplay = aspect.type !== 'none' ? `<span class="aspect-badge ${aspectClass}">${aspect.symbol} ${aspect.name}</span>` : '<span class="aspect-badge aspect-none">Neutro</span>';
    
    let description = "";
    if (p === 'sun') {
      description = `Vitalidad en ${signName}. Afecta a tu expresión y foco.`;
    } else if (p === 'moon') {
      description = `Emociones en ${signName}. Rige tu intuición y subconsciente.`;
    } else if (p === 'mercury') {
      description = `Intelecto en ${signName}. Rige tu comunicación e ideas.`;
    } else if (p === 'venus') {
      description = `Afecto en ${signName}. Rige tus relaciones y goce.`;
    } else if (p === 'mars') {
      description = `Fuerza en ${signName}. Rige tu iniciativa y empuje físico.`;
    } else if (p === 'jupiter') {
      description = `Expansión en ${signName}. Trae crecimiento y oportunidades.`;
    } else if (p === 'saturn') {
      description = `Madurez en ${signName}. Aporta disciplina y estructura.`;
    }
    
    html += `
      <div class="planet-transit-card ${elementClass}">
        <div class="planet-card-header">
          <span class="planet-symbol">${meta.symbol}</span>
          <div class="planet-name-wrap">
            <h4 class="planet-name">${meta.name}</h4>
            <span class="planet-keyword">${meta.keyword}</span>
          </div>
        </div>
        <div class="planet-card-body">
          <div class="planet-position">
            <strong>${signDeg}° ${signName}</strong> 
            <span class="element-badge">${signData.symbol} ${signData.element}</span>
          </div>
          <div class="planet-aspect-line">
            Relación: ${aspectDisplay}
          </div>
          <p class="planet-influence-desc">${description}</p>
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = html;
}

// Generate the transit narrative horoscopes
function generateRealtimeTransitHoroscope(userSign, period) {
  const date = new Date();
  const longitudes = calculatePlanetaryLongitudes(date);
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  // Render sub-visuals
  renderAspectsWheel(userSign, longitudes);
  renderPlanetaryGrid(longitudes, userSign);
  
  const userSignData = ZODIAC_INFO[getSanitizedSignKey(userSign)];
  const sunSign = signs[Math.floor(longitudes.sun / 30)];
  const moonSign = signs[Math.floor(longitudes.moon / 30)];
  const mercurySign = signs[Math.floor(longitudes.mercury / 30)];
  const venusSign = signs[Math.floor(longitudes.venus / 30)];
  const marsSign = signs[Math.floor(longitudes.mars / 30)];
  const jupiterSign = signs[Math.floor(longitudes.jupiter / 30)];
  const saturnSign = signs[Math.floor(longitudes.saturn / 30)];
  
  const sunAspect = getAstrologicalAspect(userSign, sunSign);
  const moonAspect = getAstrologicalAspect(userSign, moonSign);
  const mercuryAspect = getAstrologicalAspect(userSign, mercurySign);
  const venusAspect = getAstrologicalAspect(userSign, venusSign);
  const marsAspect = getAstrologicalAspect(userSign, marsSign);
  const jupiterAspect = getAstrologicalAspect(userSign, jupiterSign);
  const saturnAspect = getAstrologicalAspect(userSign, saturnSign);
  
  let generalText = "";
  if (period === 'daily') {
    generalText = `Hoy, con el Sol transitando por ${sunSign} (${sunAspect.name} a tu signo) y la Luna en ${moonSign}, el clima celeste te invita a un ritmo introspectivo. Como nativo de ${userSignData.name}, tu energía se acopla a la cualidad ${userSignData.diastesis} de tu elemento ${userSignData.element}. ${ASPECT_TEXTS.general[sunAspect.type]}`;
  } else if (period === 'weekly') {
    generalText = `Esta semana, la influencia de Saturno en ${saturnSign} (${saturnAspect.name}) y el Sol en ${sunSign} marcan una pauta de estructuración. Es tiempo de mirar a largo plazo y dejar ir lo superfluo. ${ASPECT_TEXTS.general[saturnAspect.type]} Para tu signo ${userSignData.name}, esto requiere disciplina física, afectando especialmente a ${userSignData.body}.`;
  } else {
    generalText = `El panorama mensual está dominado por el tránsito de Saturno por ${saturnSign} y tu regencia tradicional de ${userSignData.ruler}. Te encuentras en un cruce kármico de consolidación. ${ASPECT_TEXTS.general[saturnAspect.type]} Las lecciones de límites y madurez se reflejan en tu entorno; confía en el tiempo.`;
  }
  
  let loveText = "";
  if (period === 'daily') {
    loveText = `En el terreno amoroso, el influjo de Venus en ${venusSign} (${venusAspect.name}) se combina con la Luna en ${moonSign}. ${ASPECT_TEXTS.love[venusAspect.type]} Escucha tu intuición corporal, pues tu sensibilidad física en ${userSignData.body} está activa hoy.`;
  } else if (period === 'weekly') {
    loveText = `Durante los próximos siete días, las relaciones sentimentales exigen honestidad y equilibrio. La tensión o fluidez de Venus en ${venusSign} (${venusAspect.name}) marca el tono de tus vínculos. ${ASPECT_TEXTS.love[venusAspect.type]} Dedica tiempo a escuchar y a cultivar tu paz interior.`;
  } else {
    loveText = `Este mes, tu vida afectiva experimenta un ciclo de replanteamientos profundos. Con Venus transitando por ${venusSign}, tu sector de relaciones se ilumina. ${ASPECT_TEXTS.love[venusAspect.type]} Se aclaran dudas y se fortalecen compromisos basados en el crecimiento mutuo.`;
  }
  
  let careerText = "";
  if (period === 'daily') {
    careerText = `Tu energía física de hoy está guiada por Marte en ${marsSign} y la expansión de Júpiter en ${jupiterSign} (${jupiterAspect.name}). ${ASPECT_TEXTS.career[jupiterAspect.type]} Evita la dispersión de fuerzas y céntrate en un objetivo material claro a la vez.`;
  } else if (period === 'weekly') {
    careerText = `El clima laboral de la semana demanda estrategia. Con Júpiter en ${jupiterSign} y Marte en ${marsSign} (${marsAspect.name}), dispones del empuje necesario para superar cualquier reto profesional. ${ASPECT_TEXTS.career[marsAspect.type]} Planifica tus movimientos financieros con cautela y orden.`;
  } else {
    careerText = `A nivel mensual, las metas profesionales y el éxito material están en primer plano. El tránsito de Júpiter por ${jupiterSign} abre portales de expansión. ${ASPECT_TEXTS.career[jupiterAspect.type]} Es el momento de presentar propuestas, pedir aumentos o dar saltos importantes de carrera.`;
  }
  
  let mindText = "";
  if (period === 'daily') {
    mindText = `Mentalmente, Mercurio en ${mercurySign} (${mercuryAspect.name}) aporta un ritmo específico a tus pensamientos hoy. ${ASPECT_TEXTS.mind[mercuryAspect.type]} Rige tu mente de aire o tierra, conectándote con la expresión del Verbo y tu chakra regente.`;
  } else if (period === 'weekly') {
    mindText = `Esta semana, las comunicaciones y estudios se ven favorecidos por Mercurio en ${mercurySign}. ${ASPECT_TEXTS.mind[mercuryAspect.type]} Tu agudeza mental te ayudará a cerrar acuerdos importantes, siempre que evites el cansancio psicológico.`;
  } else {
    mindText = `A lo largo de este mes, tu enfoque mental y espiritual entra en una fase de purificación. Con Mercurio transitando por ${mercurySign}, tu forma de ver el mundo madura. ${ASPECT_TEXTS.mind[mercuryAspect.type]} Dedica tiempo a la contemplación y a nutrir tu alma de sabiduría hermética.`;
  }
  
  if (transitsGeneralBox) transitsGeneralBox.innerHTML = `<p>${generalText}</p>`;
  if (transitsLoveBox) transitsLoveBox.innerHTML = `<p>${loveText}</p>`;
  if (transitsCareerBox) transitsCareerBox.innerHTML = `<p>${careerText}</p>`;
  if (transitsMindBox) transitsMindBox.innerHTML = `<p>${mindText}</p>`;
}

// Initialize everything
initTabNavigation();
setupModalEvents();

// Initialize Horoscope interactions and bindings
function initHoroscope() {
  if (astroShuffleBtn) {
    astroShuffleBtn.addEventListener('click', () => {
      if (isAstroShuffling) return;
      isAstroShuffling = true;
      const deck = document.getElementById('astro-mystical-deck');
      if (deck) deck.classList.add('shuffling');
      astroShuffleBtn.textContent = 'Barajando astros...';
      astroShuffleBtn.disabled = true;
      
      setTimeout(() => {
        if (deck) deck.classList.remove('shuffling');
        astroShuffleBtn.textContent = 'Barajar Astros';
        astroShuffleBtn.disabled = false;
        isAstroShuffling = false;
      }, 1800);
    });
  }

  if (astroConsultBtn) {
    astroConsultBtn.addEventListener('click', () => {
      selectedZodiac = zodiacSelect.value;
      selectedAstroSpread = astroSpreadSelect.value;
      
      // Persist user sign
      localStorage.setItem('user_zodiac_sign', selectedZodiac);
      
      if (selectedAstroSpread === 'astro_daily') {
        astroTotalCards = 1;
        currentAstroSpread = drawCards(1);
      } else if (selectedAstroSpread === 'astro_houses') {
        astroTotalCards = 12;
        currentAstroSpread = drawCards(12);
      } else {
        astroTotalCards = 3;
        currentAstroSpread = drawCards(3);
      }
      astroFlippedCount = 0;
      
      astroCardsBoard.className = 'cards-board' + (selectedAstroSpread === 'astro_houses' ? ' layout-houses' : '');
      astroCardsBoard.innerHTML = '';
      if (astroDeckContainer) astroDeckContainer.style.display = 'none';
      if (astroResultsPanel) astroResultsPanel.classList.add('hidden');
      
      if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "El cosmos ha alineado tu tirada";
      if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = "Haz clic en cada carta para revelar su mensaje y descubrir tu horóscopo.";
      
      currentAstroSpread.forEach((card, index) => {
        let posLabel = "Carta " + (index + 1);
        if (selectedAstroSpread === 'astro_weekly') {
          const positions = ["Energía Regente de la Semana", "El Desafío Semanal / Obstáculo", "El Consejo Astral / Solución"];
          posLabel = positions[index];
        } else if (selectedAstroSpread === 'astro_houses') {
          const positions = [
            "Casa I: Personalidad",
            "Casa II: Recursos",
            "Casa III: Entorno",
            "Casa IV: Hogar",
            "Casa V: Creatividad",
            "Casa VI: Trabajo/Salud",
            "Casa VII: Pareja",
            "Casa VIII: Transformación",
            "Casa IX: Filosofía",
            "Casa X: Profesión",
            "Casa XI: Amistad",
            "Casa XII: Subconsciente"
          ];
          posLabel = positions[index];
        } else {
          posLabel = "Tu Consejo Diario";
        }
        
        const cardWrapper = document.createElement('div');
        cardWrapper.className = `card-wrapper dealt${card.isReversed ? ' reversed' : ''}`;
        cardWrapper.style.animationDelay = `${index * 0.15}s`;
        cardWrapper.setAttribute('data-index', index);
        
        // Remove dealt class after deal animation finishes to allow custom layout transforms
        setTimeout(() => {
          cardWrapper.classList.remove('dealt');
          cardWrapper.style.animationDelay = '';
        }, (index * 0.15 + 0.8) * 1000);
        
        if (selectedAstroSpread === 'astro_houses') {
          const angle = Math.PI - (index * Math.PI / 6);
          const R = 210;
          const centerX = 310;
          const centerY = 310;
          const left = Math.round(centerX + R * Math.cos(angle) - 55);
          const top = Math.round(centerY + R * Math.sin(angle) - 90);
          cardWrapper.style.left = `${left}px`;
          cardWrapper.style.top = `${top}px`;
        }
        
        cardWrapper.innerHTML = `
          <div class="card-inner">
            <div class="card-back"></div>
            <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
          </div>
          <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
            ${posLabel}
          </div>
        `;
        
        cardWrapper.addEventListener('click', () => {
          if (cardWrapper.classList.contains('flipped')) return;
          cardWrapper.classList.add('flipped');
          astroFlippedCount++;
          
          if (astroFlippedCount === astroTotalCards) {
            setTimeout(showAstroInterpretation, 800);
          }
        });
        
        astroCardsBoard.appendChild(cardWrapper);
        apply3DTilt(cardWrapper);
      });
      
      document.querySelector('#horoscope-tab-content .reading-table').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (astroResetBtn) {
    astroResetBtn.addEventListener('click', () => {
      if (astroResultsPanel) astroResultsPanel.classList.add('hidden');
      if (astroDeckContainer) astroDeckContainer.style.display = 'flex';
      astroCardsBoard.innerHTML = '';
      
      if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "Alinea tu energía con el Zodíaco...";
      if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = "Elige tu signo y realiza la tirada para consultar el clima astral.";
      
      document.querySelector('#horoscope-tab-content .config-panel').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Astro Mode Toggles
  const astroModeBtns = document.querySelectorAll('#astro-mode-toggle .mode-btn');
  astroModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-astro-mode');
      
      // Update active class on buttons
      astroModeBtns.forEach(b => {
        if (b.getAttribute('data-astro-mode') === mode) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      
      // Toggle form visibility
      if (mode === 'tarot') {
        if (astroTarotFormGroup) astroTarotFormGroup.classList.remove('hidden');
        if (astroTransitsFormGroup) astroTransitsFormGroup.classList.add('hidden');
        
        const readingTable = document.querySelector('#horoscope-tab-content .reading-table');
        if (readingTable) readingTable.classList.remove('hidden');
        
        if (astroResultsPanel && !astroResultsPanel.classList.contains('hidden')) {
          if (astroTarotResultsGroup) astroTarotResultsGroup.classList.remove('hidden');
          if (astroTransitsResultsGroup) astroTransitsResultsGroup.classList.add('hidden');
          if (astroResetBtn) astroResetBtn.textContent = 'REALIZAR OTRA TIRADA ASTRO';
        }
      } else if (mode === 'transits') {
        if (astroTarotFormGroup) astroTarotFormGroup.classList.add('hidden');
        if (astroTransitsFormGroup) astroTransitsFormGroup.classList.remove('hidden');
        
        const readingTable = document.querySelector('#horoscope-tab-content .reading-table');
        if (readingTable) readingTable.classList.add('hidden');
        
        if (astroResultsPanel && !astroResultsPanel.classList.contains('hidden')) {
          if (astroTarotResultsGroup) astroTarotResultsGroup.classList.add('hidden');
          if (astroTransitsResultsGroup) astroTransitsResultsGroup.classList.remove('hidden');
          if (astroResetBtn) astroResetBtn.textContent = 'CONSULTAR OTROS TRÁNSITOS';
        }
      }
    });
  });

  // Transit Consulting Action
  if (astroTransitsConsultBtn) {
    astroTransitsConsultBtn.addEventListener('click', () => {
      selectedZodiac = zodiacSelect.value;
      const period = astroTransitsPeriodSelect.value;
      
      // Persist user sign
      localStorage.setItem('user_zodiac_sign', selectedZodiac);
      
      if (astroResultsPanel) {
        astroResultsPanel.classList.remove('hidden');
        if (astroTarotResultsGroup) astroTarotResultsGroup.classList.add('hidden');
        if (astroTransitsResultsGroup) astroTransitsResultsGroup.classList.remove('hidden');
        
        if (astroResultTitle) {
          const dateStr = getAstroDateString(period);
          if (period === 'daily') {
            astroResultTitle.textContent = `Tu Clima Celeste Diario (${dateStr})`;
          } else if (period === 'weekly') {
            astroResultTitle.textContent = `Tu Clima Celeste Semanal (${dateStr})`;
          } else {
            astroResultTitle.textContent = `Tu Clima Celeste Mensual (${dateStr})`;
          }
        }
        
        const userSignData = ZODIAC_INFO[selectedZodiac];
        if (astroUserSignText) {
          astroUserSignText.innerHTML = `Zodiaco: <strong>${userSignData.symbol} ${userSignData.name}</strong> (${userSignData.element}) | Tránsitos en Tiempo Real`;
        }
        
        if (astroResetBtn) astroResetBtn.textContent = 'CONSULTAR OTROS TRÁNSITOS';
      }
      
      generateRealtimeTransitHoroscope(selectedZodiac, period);
      astroResultsPanel.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Generate the narrative forecast and show astro interpretation
function showAstroInterpretation() {
  const date = new Date();
  const sunSign = getSunSign(date);
  const moonSign = getMoonSign(date);
  const moonPhase = getMoonPhaseDetails(date);
  const userSignData = ZODIAC_INFO[selectedZodiac];
  
  if (astroResultTitle) {
    const dateStr = getAstroDateString(selectedAstroSpread);
    if (selectedAstroSpread === 'astro_daily') {
      astroResultTitle.textContent = `Tu Horóscopo Diario (${dateStr})`;
    } else if (selectedAstroSpread === 'astro_houses') {
      astroResultTitle.textContent = `Tu Rueda de las 12 Casas Astrológicas (${dateStr})`;
    } else {
      astroResultTitle.textContent = `Tu Horóscopo Semanal (${dateStr})`;
    }
  }
  if (astroUserSignText) {
    astroUserSignText.innerHTML = `Zodiaco: <strong>${userSignData.symbol} ${userSignData.name}</strong> (${userSignData.element}) | Tránsito de Hoy`;
  }
  
  // Populate climate cols
  const userCol = document.querySelector('.user-sign-info');
  if (userCol) {
    document.getElementById('climate-user-icon').textContent = userSignData.symbol;
    document.getElementById('climate-user-name').textContent = userSignData.name;
    document.getElementById('climate-user-desc').innerHTML = `Signo de <strong>${userSignData.element}</strong>, regido por <strong>${userSignData.ruler}</strong>.<br>Rige físicamente: <strong>${userSignData.body}</strong>.<br>Cualidad astral: <strong>${userSignData.diastesis}</strong>.`;
  }
  
  const sunCol = document.querySelector('.sun-transit-info');
  if (sunCol) {
    const sunRuler = ZODIAC_INFO[getSanitizedSignKey(sunSign)].ruler;
    const primarySunRuler = sunRuler.split(' y ')[0];
    const sunAngel = PLANETARY_ANGELS[primarySunRuler] ? PLANETARY_ANGELS[primarySunRuler].angel : "Gabriel";
    const sunChakra = getAstroChakra(sunSign);
    document.getElementById('climate-sun-name').textContent = `Temporada de ${sunSign}`;
    document.getElementById('climate-sun-desc').innerHTML = `Sol en ${sunSign}, regido por <strong>${sunRuler}</strong>.<br>Ángel guía: <strong>${sunAngel}</strong>.<br>Chakra activo: <strong>${sunChakra.name.split(' ')[0]}</strong> (${sunChakra.loc}).`;
  }
  
  const moonCol = document.querySelector('.moon-transit-info');
  if (moonCol) {
    const moonRuler = ZODIAC_INFO[getSanitizedSignKey(moonSign)].ruler;
    const primaryMoonRuler = moonRuler.split(' y ')[0];
    const moonAngel = PLANETARY_ANGELS[primaryMoonRuler] ? PLANETARY_ANGELS[primaryMoonRuler].angel : "Gabriel";
    document.getElementById('climate-moon-icon').innerHTML = getMoonSvg(moonPhase.phase, localStorage.getItem('lunar_hemisphere') || 'north');
    document.getElementById('climate-moon-name').textContent = `${moonPhase.phaseName} en ${moonSign}`;
    document.getElementById('climate-moon-desc').innerHTML = `Luna en ${moonSign}, regido por <strong>${moonRuler}</strong>.<br>Ángel guía: <strong>${moonAngel}</strong>.<br>Influencia: <em>${moonPhase.description.split('.')[0]}</em>.`;
  }
  
  // Create forecast text
  let forecastText = "";
  if (selectedAstroSpread === 'astro_daily') {
    forecastText = generateDailyAstroForecast(sunSign, moonSign, moonPhase, userSignData);
  } else if (selectedAstroSpread === 'astro_houses') {
    forecastText = generateHousesAstroForecast(sunSign, moonSign, moonPhase, userSignData);
  } else {
    forecastText = generateWeeklyAstroForecast(sunSign, moonSign, moonPhase, userSignData);
  }
  if (astroForecastText) astroForecastText.innerHTML = forecastText;
  
  // Set quick summary forecast paragraph
  if (astroSummaryTitle) {
    if (selectedAstroSpread === 'astro_daily') {
      astroSummaryTitle.textContent = "Tu Clave del Día";
    } else if (selectedAstroSpread === 'astro_houses') {
      astroSummaryTitle.textContent = "Tu Eje Ascendente - Medio Cielo";
    } else {
      astroSummaryTitle.textContent = "Tu Clave de la Semana";
    }
  }
  if (astroSummaryForecastText) {
    let summaryText = "";
    if (selectedAstroSpread === 'astro_daily') {
      const card = currentAstroSpread[0];
      const cardName = card.isReversed ? `${card.name} (Invertida)` : card.name;
      const themes = card.isReversed ? "los bloqueos y aprendizajes" : card.keyThemes.toLowerCase().replace('.', '');
      summaryText = `Hoy es un día para <strong>enfocar tu fuerza interior</strong>. La influencia de <strong>${cardName}</strong> te invita a conectar con <em>${themes}</em>. En tu signo <strong>${userSignData.name}</strong>, esta energía kármica se manifiesta como un llamado a la acción consciente, recordándote cuidar tu bienestar físico e interior.`;
    } else if (selectedAstroSpread === 'astro_houses' && currentAstroSpread.length === 12) {
      const c1 = currentAstroSpread[0];
      const c10 = currentAstroSpread[9];
      const name1 = c1.isReversed ? `${c1.name} (Invertida)` : c1.name;
      const name10 = c10.isReversed ? `${c10.name} (Invertida)` : c10.name;
      summaryText = `Tu ciclo astrológico sitúa a <strong>${name1}</strong> en tu Casa I (Personalidad y Autoexpresión) y a <strong>${name10}</strong> en tu Casa X (Carrera y Destino Profesional). Esto señala que tu camino de madurez esta temporada requiere alinear tu verdad interior con tus aspiraciones de éxito en el mundo externo.`;
    } else if (selectedAstroSpread === 'astro_weekly' && currentAstroSpread.length === 3) {
      const c1 = currentAstroSpread[0];
      const c2 = currentAstroSpread[1];
      const c3 = currentAstroSpread[2];
      const name1 = c1.isReversed ? `${c1.name} (Invertida)` : c1.name;
      const name2 = c2.isReversed ? `${c2.name} (Invertida)` : c2.name;
      const name3 = c3.isReversed ? `${c3.name} (Invertida)` : c3.name;
      summaryText = `Esta semana se presenta como un <strong>período de crecimiento y equilibrio</strong> para <strong>${userSignData.name}</strong>. Tu camino estará guiado por la energía de <strong>${name1}</strong>, teniendo como gran reto a superar a <strong>${name2}</strong>. La clave del éxito para estos 7 días consistirá en aplicar el sabio consejo de <strong>${name3}</strong>.`;
    }
    astroSummaryForecastText.innerHTML = summaryText;
  }
  
  // Check for synergies and couples
  let matches = [];
  
  currentAstroSpread.forEach(card => {
    const cardAstro = ASTRO_MAP[card.id];
    if (cardAstro) {
      if (cardAstro.sign && getSanitizedSignKey(cardAstro.sign) === selectedZodiac) {
        matches.push(`
          <div class="astro-synergy-badge">
            <span class="synergy-icon">✨</span>
            <div class="synergy-text-content">
              <h4>Sinergia de Identidad Astral Máxima</h4>
              <p>Has extraído <strong>${card.name}</strong>, el arcano regente directo de tu signo <strong>${userSignData.name}</strong>. Esta alineación amplifica tu poder personal, indicando que el mensaje del oráculo describe tu yo más íntimo y tus decisiones de forma crucial hoy.</p>
            </div>
          </div>
        `);
      }
      if (cardAstro.sign && getSanitizedSignKey(cardAstro.sign) === getSanitizedSignKey(sunSign)) {
        matches.push(`
          <div class="astro-synergy-badge">
            <span class="synergy-icon">☀️</span>
            <div class="synergy-text-content">
              <h4>Sinergia de Tránsito Solar</h4>
              <p>La carta <strong>${card.name}</strong> representa la temporada actual de <strong>${sunSign}</strong>. Esto señala que las circunstancias externas de la sociedad y el clima colectivo del momento facilitan la manifestación de este arcano en tu vida.</p>
            </div>
          </div>
        `);
      }
    }
  });
  
  if (selectedAstroSpread === 'astro_weekly' && currentAstroSpread.length === 3) {
    const ids = currentAstroSpread.map(c => c.id);
    TAROT_COUPLES.forEach(couple => {
      if (ids.includes(couple.c1) && ids.includes(couple.c2)) {
        matches.push(`
          <div class="tarot-couple-card">
            <span class="couple-icon">🔮</span>
            <div class="couple-text-content">
              <h4>Conjunción Arquetípica: ${couple.name}</h4>
              <p>${couple.desc} La aparición conjunta de estos arcanos esta semana indica un entrelazamiento de fuerzas kármicas destinadas al aprendizaje en tus relaciones o tu equilibrio interno.</p>
            </div>
          </div>
        `);
      }
    });
  }
  
  if (matches.length > 0) {
    if (astroSpecialSection && astroSpecialBox) {
      astroSpecialBox.innerHTML = matches.join("");
      astroSpecialSection.classList.remove('hidden');
    }
  } else {
    if (astroSpecialSection) astroSpecialSection.classList.add('hidden');
  }
  
  // Populate individual card breakdowns
  if (astroBreakdownGrid) {
    astroBreakdownGrid.innerHTML = "";
    currentAstroSpread.forEach((card, index) => {
      let posLabel = "Tránsito Diario";
      if (selectedAstroSpread === 'astro_weekly') {
        const positions = ["Energía Regente de la Semana", "El Desafío Semanal / Obstáculo", "El Consejo Astral / Solución"];
        posLabel = positions[index];
      } else if (selectedAstroSpread === 'astro_houses') {
        const positions = [
          "Casa I: Personalidad",
          "Casa II: Recursos",
          "Casa III: Entorno",
          "Casa IV: Hogar",
          "Casa V: Creatividad",
          "Casa VI: Trabajo/Salud",
          "Casa VII: Pareja",
          "Casa VIII: Transformación",
          "Casa IX: Filosofía",
          "Casa X: Profesión",
          "Casa XI: Amistad",
          "Casa XII: Subconsciente"
        ];
        posLabel = positions[index];
      }
      
      const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
      const meaningText = card.isReversed ? card.reversed.general : card.meanings.general;
      const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦", keywords: "Fuerza universal" };
      
      let cardRuler = astro.ruler;
      const primaryCardRuler = cardRuler.split(' y ')[0];
      let cardAngel = PLANETARY_ANGELS[primaryCardRuler] ? PLANETARY_ANGELS[primaryCardRuler].angel : "Gabriel";
      
      const item = document.createElement('div');
      item.className = 'card-breakdown-card';
      const miniViewClass = `card-mini-view${card.isReversed ? ' reversed' : ''}`;
      
      item.innerHTML = `
        <div class="${miniViewClass}" style="background-image: url('assets/card_${card.id}.jpg');"></div>
        <div class="card-info-content">
          <div class="card-info-header">
            <h4 class="card-info-title">${cardNameDisplay}</h4>
            <span class="position-tag">${posLabel}</span>
          </div>
          <div class="card-astro-badge" title="${astro.keywords}">
            <span class="card-astro-symbol">${astro.symbol}</span>
            <span>Regencia: ${astro.ruler} (Ángel: <strong>${cardAngel}</strong>)</span>
          </div>
          <p class="card-info-themes"><strong>Fuerza Astral:</strong> ${astro.keywords}</p>
          <p class="card-info-meaning">${meaningText}</p>
        </div>
      `;
      astroBreakdownGrid.appendChild(item);
    });
  }
  
  if (astroResultsPanel) {
    astroResultsPanel.classList.remove('hidden');
    astroResultsPanel.scrollIntoView({ behavior: 'smooth' });
  }
  
  if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "Predicción Completada";
  if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = "Desplázate hacia abajo para ver el oráculo y el clima astral.";
  
  if (!isAstroFromHistory) {
    saveReading(`Consulta del Horóscopo (${selectedZodiac})`, selectedAstroSpread);
  }
  isAstroFromHistory = false;
}

function generateDailyAstroForecast(sunSign, moonSign, moonPhase, userSignData) {
  const card = currentAstroSpread[0];
  const cardName = card.isReversed ? `${card.name} (Invertida)` : card.name;
  const meaning = card.isReversed ? card.reversed.general : card.meanings.general;
  const astro = ASTRO_MAP[card.id];
  
  const isWaning = moonPhase.phaseName.toLowerCase().includes('menguante') || moonPhase.phaseName === 'Luna Nueva';
  const clothTip = `<br><br><span style="display:block; margin-top:1.5rem; font-size:0.85rem; color:var(--text-muted); border-top: 1px dashed var(--border-color); padding-top:1rem;">💡 <strong>Consejo de tu Grimorio</strong>: Hoy te sugerimos envolver tu baraja en un paño de <strong>seda violeta</strong> y guardarla en una <strong>cajita de madera</strong> para proteger su vibración espiritual. ${!isWaning ? 'Aprovecha que la Luna está en fase creciente o llena (acumulando luz) para sintonizar y magnetizar mejor tu mazo.' : 'Hoy es un excelente momento de fase menguante o luna nueva para limpiar y purificar tu mazo y el espacio donde haces tus lecturas.'}</span>`;
  
  const sunChakra = getAstroChakra(sunSign);
  const transitRuler = ZODIAC_INFO[getSanitizedSignKey(moonSign)].ruler;
  const lunarAngel = PLANETARY_ANGELS[transitRuler.split(' y ')[0]] ? PLANETARY_ANGELS[transitRuler.split(' y ')[0]].angel : "Gabriel";

  let forecast = `<p style="margin-bottom:1rem;">El universo te saluda hoy, <strong>${userSignData.name}</strong>. El Sol ilumina el signo de <strong>${sunSign}</strong> mientras la Luna teje sus hilos de plata por <strong>${moonSign}</strong>, transitando su fase de <strong>${moonPhase.phaseName}</strong>. Este es el mosaico celeste que colorea tu día.</p>
  
  <p style="margin-bottom:1rem;"><strong>✦ El Cuerpo como Templo:</strong> La Luna en <strong>${moonSign}</strong> dirige su atención hacia <strong>${ZODIAC_INFO[getSanitizedSignKey(moonSign)].body}</strong>. Tu naturaleza de <strong>${userSignData.name}</strong> también te invita a cuidar especialmente <strong>${userSignData.body}</strong> hoy. Respira, muévete con conciencia, y escucha lo que el cuerpo te murmura en silencio.</p>
  
  <p style="margin-bottom:1rem;"><strong>✦ La Voz del Tarot:</strong> El arcano que guía tu jornada es <strong>${cardName}</strong>, vibración de <em>${astro ? astro.keywords.toLowerCase() : 'fuerzas universales'}</em>. El oráculo te susurra: <br><span style="display:block; margin: 0.5rem 0 0.5rem 1rem; border-left: 2px solid var(--gold-color); padding-left: 0.75rem; font-style: italic; color: var(--text-muted);">${meaning}</span></p>
  
  <p style="margin-bottom:0;"><strong>✦ Tu Guardián de Hoy:</strong> El ángel <strong>${lunarAngel}</strong> tiende su manto protector sobre este día. Para sintonizar con él, dedica unos instantes a respirar con atención plena, llevando tu presencia a la zona de <strong>${sunChakra.loc}</strong> —tu chakra <strong>${sunChakra.name.split(' ')[0]}</strong>— y dejando que la calma se expanda desde ahí hacia cada parte de tu ser.</p>${clothTip}`;
  
  return forecast;
}

function generateWeeklyAstroForecast(sunSign, moonSign, moonPhase, userSignData) {
  const c1 = currentAstroSpread[0]; // Energía Regente
  const c2 = currentAstroSpread[1]; // Desafío
  const c3 = currentAstroSpread[2]; // Consejo
  
  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  
  const sunRuler = ZODIAC_INFO[getSanitizedSignKey(sunSign)].ruler;
  const primarySunRuler = sunRuler.split(' y ')[0];
  const sunAngel = PLANETARY_ANGELS[primarySunRuler] ? PLANETARY_ANGELS[primarySunRuler].angel : "Gabriel";
  const sunChakra = getAstroChakra(sunSign);
  
  let forecast = `<p style="margin-bottom:1.25rem;">Los astros han tejido para ti, <strong>${userSignData.name}</strong>, una semana con su propio ritmo y su propia música. El Sol recorre <strong>${sunSign}</strong> bajo la tutela del ángel <strong>${sunAngel}</strong>, mientras la Luna respira en <strong>${moonSign}</strong>, en su etapa de <strong>${moonPhase.phaseName}</strong>. Esta es la partitura celeste de tus próximos siete días.</p>
  
  <p style="margin-bottom:1rem; font-weight: 600; color: var(--gold-color);">✦ Los tres mensajes que el cosmos reserva para ti esta semana:</p>
  
  <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
    <li style="border-left: 3px solid var(--gold-color); padding-left: 0.75rem;">
      <strong>1. La Energía que te sostiene: ${d1.name}</strong><br>
      <span style="font-size: 0.9rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">Esta es la corriente de fondo que fluye en tu favor esta semana. Confía en su vibración: ${d1.meaning}</span>
    </li>
    <li style="border-left: 3px solid var(--purple-color); padding-left: 0.75rem;">
      <strong>2. La Enseñanza que te espera: ${d2.name}</strong><br>
      <span style="font-size: 0.9rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">El cosmos siempre incluye una prueba en el mapa. Esta semana, la tuya viene envuelta en la energía de este arcano. Ábrela con curiosidad, no con resistencia: ${d2.meaning}</span>
    </li>
    <li style="border-left: 3px solid var(--success-color); padding-left: 0.75rem;">
      <strong>3. El Camino que te libera: ${d3.name}</strong><br>
      <span style="font-size: 0.9rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">Aquí está la clave que transforma el desafío en aprendizaje. El oráculo te dice: ${d3.meaning}</span>
    </li>
  </ul>
  
  <p style="margin-bottom: 0; border-top: 1px dashed var(--border-color); padding-top: 1rem;">🌸 <strong>Sintonía de la Semana</strong>: Tu chakra de <strong>${sunChakra.loc}</strong> merece atención especial estos días. Cada mañana, antes de que el mundo reclame tu energía, dedica unos instantes a respirar con intención hacia esa zona. El ángel <strong>${sunAngel}</strong> acompaña ese espacio sagrado contigo.</p>`;
  
  return forecast;
}

function generateHousesAstroForecast(sunSign, moonSign, moonPhase, userSignData) {
  const housesInfo = [
    { name: "Casa I: Identidad y Personalidad", desc: "El yo exterior, tu temperamento y cómo te presentas al mundo." },
    { name: "Casa II: Recursos y Valores", desc: "Tus finanzas, bienes materiales, seguridad y autoestima." },
    { name: "Casa III: Comunicación y Entorno", desc: "Tus pensamientos, estudios, hermanos y cómo te comunicas." },
    { name: "Casa IV: Hogar y Raíces", desc: "Tu familia, tu infancia, tus bases emocionales y tu intimidad." },
    { name: "Casa V: Creatividad y Romance", desc: "Tus pasiones, amores, hijos, ocio y autoexpresión." },
    { name: "Casa VI: Rutina y Salud", desc: "Tu trabajo diario, hábitos, bienestar físico y espíritu de servicio." },
    { name: "Casa VII: Relaciones y Pareja", desc: "Tus contratos, matrimonio, socios y el espejo de tu alma." },
    { name: "Casa VIII: Transformación y Karma", desc: "La regeneración, crisis, recursos compartidos, herencias y sexualidad." },
    { name: "Casa IX: Sabiduría y Expansión", desc: "Tus estudios superiores, viajes largos, espiritualidad y filosofía de vida." },
    { name: "Casa X: Destino y Profesión", desc: "Tu carrera, estatus social, metas mundanas y éxito profesional." },
    { name: "Casa XI: Ideales y Amigos", desc: "Tus grupos sociales, amigos, esperanzas y proyectos colectivos." },
    { name: "Casa XII: Subconsciente y Trascendencia", desc: "El karma, el subconsciente, tus miedos ocultos y la espiritualidad secreta." }
  ];

  let forecast = `<p style="margin-bottom:1.5rem;">La Rueda de las 12 Casas Astrológicas revela un mapa completo de tu energía celeste para <strong>${userSignData.name}</strong>, estructurado bajo el influjo del Sol en <strong>${sunSign}</strong> y la Luna en <strong>${moonSign}</strong>.</p>`;

  const quadrants = [
    { title: "Primer Cuadrante: Desarrollo Personal (Casas I a III)", startIndex: 0 },
    { title: "Segundo Cuadrante: Integración Personal (Casas IV a VI)", startIndex: 3 },
    { title: "Tercer Cuadrante: Relación con el Entorno (Casas VII a IX)", startIndex: 6 },
    { title: "Cuarto Cuadrante: Trascendencia y Destino (Casas X a XII)", startIndex: 9 }
  ];

  quadrants.forEach((q, qIndex) => {
    forecast += `
      <div class="quadrant-block" style="margin-bottom: 2rem; border: 1.5px solid rgba(229, 193, 88, 0.15); border-radius: 12px; padding: 1.5rem; background: rgba(8, 7, 17, 0.45);">
        <h4 style="color: var(--gold-color); margin-top: 0; margin-bottom: 1.25rem; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px dashed rgba(229, 193, 88, 0.2); padding-bottom: 0.5rem;">${q.title}</h4>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
    `;

    for (let i = 0; i < 3; i++) {
      const idx = q.startIndex + i;
      const card = currentAstroSpread[idx];
      const house = housesInfo[idx];
      const cardName = card.isReversed ? `${card.name} (Invertida)` : card.name;
      const meaning = card.isReversed ? card.reversed.general : card.meanings.general;
      const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦" };

      forecast += `
        <div class="house-item" style="border-left: 2px solid ${card.isReversed ? 'var(--purple-color)' : 'var(--gold-color)'}; padding-left: 0.75rem;">
          <h5 style="color: var(--text-main); font-size: 0.95rem; margin: 0 0 0.25rem 0; font-weight: 600;">
            ${house.name} &mdash; <span style="color: var(--gold-color);">${cardName}</span> 
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal; margin-left: 0.5rem;">(Ref: ${astro.symbol} ${astro.ruler})</span>
          </h5>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0 0 0.4rem 0; font-style: italic;">${house.desc}</p>
          <p style="font-size: 0.88rem; color: var(--text-main); margin: 0; line-height: 1.5;">${meaning}</p>
        </div>
      `;
    }

    forecast += `
        </div>
      </div>
    `;
  });

  const sunChakra = getAstroChakra(sunSign);
  const sunRuler = ZODIAC_INFO[getSanitizedSignKey(sunSign)].ruler;
  const primarySunRuler = sunRuler.split(' y ')[0];
  const sunAngel = PLANETARY_ANGELS[primarySunRuler] ? PLANETARY_ANGELS[primarySunRuler].angel : "Gabriel";
  
  forecast += `
    <p style="margin-top: 1.5rem; border-top: 1px dashed var(--border-color); padding-top: 1rem; line-height: 1.6;">
      🔮 <strong>Síntesis Cósmica</strong>: La Rueda de las Casas te muestra el mapa completo de tu energía en este instante. El cosmos señala tu chakra de <strong>${sunChakra.loc}</strong> como el centro de mayor resonancia en esta temporada. Invoca la guía del arcángel <strong>${sunAngel}</strong> para transmutar los bloqueos y expandir los dones que cada casa ha revelado.
    </p>
  `;

  return forecast;
}

function getBirthdayElement(day) {
  const agua = [1, 5, 7, 10, 14, 16, 19, 23, 25, 28];
  const fuego = [2, 4, 8, 11, 13, 17, 20, 22, 26, 29, 31];
  const aire = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
  
  if (agua.includes(day)) return { name: "Agua", focus: "Ciencia e Intelecto", color: "var(--gold-color)" };
  if (fuego.includes(day)) return { name: "Fuego", focus: "Negocios y Finanzas", color: "var(--purple-color)" };
  if (aire.includes(day)) return { name: "Aire", focus: "Arte y Creatividad", color: "var(--success-color)" };
  return { name: "Éter", focus: "Espiritualidad", color: "var(--neutral-color)" };
}

function generateKarmicStudyHTML(letterCounts, totalLetters) {
  const KARMIC_LESSONS_MAP = {
    1: "El alma trae consigo el desafío de la autoconfianza. Tu senda en esta vida te invita a encontrar el centro de tu propia voluntad, a tomar decisiones desde la soberanía interior y a confiar en tu criterio sin buscar validación externa.",
    2: "La cooperación y la diplomacia son las lecciones que el karma ha reservado para ti. Aprender a escuchar, a ceder con elegancia y a tejer alianzas auténticas es el camino de crecimiento que tu alma ha elegido transitar.",
    3: "La autoexpresión cróe te pide salir de la sombra y compartir tu mundo interior. Tu mayor regalo es la creatividad: cuando te permites ser visto, enciendes una luz que otros necesitan.",
    4: "La constancia y la estructura son las maestras de tu camino. El alma aprende en esta vida a construir con paciencia, a honrar los compromisos y a encontrar libertad dentro del orden, no huyendo de él.",
    5: "El cambio y la flexibilidad son los maestros que tu karma te envía. Abrirte a lo inesperado, viajar —física o metafóricamente— y recibir la novedad sin resistencia es el aprendizaje central de tu alma.",
    6: "La responsabilidad amorosa es la lección que tu karma propone. Aprender a comprometerte, a cuidar sin perder tu centro y a dar amor sin condiciones —empezando por ti mismo— son los pilares de tu crecimiento.",
    7: "La fe y la profundidad espiritual son los regalos que tu alma aún tiene que descubrir. Cultivar la meditación, la introspectoín honesta y la conexión con algo más grande que el ego te abre puertas que ningún cálculo puede abrir.",
    8: "La madurez en el mundo material es tu aprendizaje profundo. Comprender el verdadero valor de los recursos —no sólo económicos sino también energéticos— y administrarlos con integridad y visión es el terreno donde tu alma crece.",
    9: "La generosidad y el perdón universal son las lecciones que tu karma ha trazado para este ciclo. Aprender a entregarte a los demás sin expectativas de retorno, y a soltar el apego a los resultados, es la forma más elevada que tu alma puede alcanzar."
  };

  const KARMIC_EXCESSES_MAP = {
    1: "La energía del 1 fluye en abundancia a través de ti, y con ella viene el reto del ego. La tendencia al individualismo o la necesidad de control puede convertirse en una sombra si no se canaliza hacia el liderazgo consciente y la humildad genuina.",
    2: "La sensibilidad que te define puede convertirse en hiper-dependencia si no se equilibra. Tu alma aprende a dar desde la plenitud, no desde el miedo al abandono, y a poner límites desde el amor propio.",
    3: "Tu creatividad y elocuencia son dones inmensos, pero la dispersión puede convertirlos en promesas sin forma. La constancia será siempre tu mayor alquimia: transforma la inspiración en creación real.",
    4: "La fortaleza de la estructura puede volverse rigidez si no se airea. Tu alma aprende que las reglas son un punto de partida, no el destino. Abrirte a la imperfectión es parte del plan cósmico para ti.",
    5: "El brillo de tu libertad puede quemarse demasiado rápido si no encuentra cánce. La búsqueda de estimulación constante puede ser una huida más que una expansión. La paz que buscas afuera también vive adentro.",
    6: "El amor que das es genuino, pero a veces carga más de lo que le pertenece cargar. Soltar el control sobre los demás es un acto de amor tan profundo como cualquier cuidado. Tu deber más sagrado empieza contigo.",
    7: "Tu mente es un instrumento extraordinario, pero cuando el análisis reemplaza al corazón, el alma se enfría. El escepticismo puede ser un escudo; dejár caer esa armadura para conectar desde la vulnerabilidad real es tu mayor valentía.",
    8: "El poder y la abundancia fluyen hacia ti, pero cuando el éxito material se convierte en el único horizonte, el alma pierde su norte. El dinero es una energía; la sabiduría es saber cuándo usarla para crecer y cuándo para servir.",
    9: "Tu impulso de entregarte a los demás es uno de los más bellos que existen, pero cuando la entrega nace del miedo a no ser amado, se convierte en carga. El verdadero altruismo empieza por la autogenerosión."
  };

  let karmicHTML = '';
  
  const lessons = [];
  for (let num = 1; num <= 9; num++) {
    if (letterCounts[num] === 0) {
      lessons.push(num);
    }
  }
  
  const excesses = [];
  const expectedFractions = { 1: 0.20, 2: 0.08, 3: 0.10, 4: 0.10, 5: 0.20, 6: 0.10, 7: 0.08, 8: 0.08, 9: 0.14 };
  for (let num = 1; num <= 9; num++) {
    const count = letterCounts[num];
    const expected = Math.max(1, Math.round(totalLetters * expectedFractions[num]));
    if (count > expected + 1) {
      excesses.push(num);
    }
  }
  
  if (lessons.length > 0) {
    karmicHTML += `
      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--gold-color); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>✨</span> Lecciones del Alma en esta Encarnación
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.5;">
          Estas vibraciones numéricas no aparecen en las letras de tu nombre. El cosmos las señala como los aprendizajes que tu alma ha elegido transitar en este ciclo de vida:
        </p>
        <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.50rem;">
          ${lessons.map(num => `
            <li style="border-left: 2px solid var(--gold-color); padding-left: 0.75rem; font-size: 0.9rem; line-height: 1.5;">
              <strong>✦ Vibración ${num}:</strong> ${KARMIC_LESSONS_MAP[num]}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  } else {
    karmicHTML += `
      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--success-color); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>✅</span> El Alma Completa su Crculo
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
          Hay una belleza especial en tu nombre: cada vibración del 1 al 9 está presente en él. El cosmos te dice que traes contigo un equipaje de experiencias integradas. Tu alma conoce los sabores de cada número, y eso te da una riqueza interior poco común.
        </p>
      </div>
    `;
  }
  
  if (excesses.length > 0) {
    karmicHTML += `
      <div>
        <h4 style="color: var(--purple-color); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>⚡</span> Intensidades a Transmutar en este Ciclo
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.5;">
          Estas vibraciones aparecen con gran fuerza en las letras de tu nombre. No son defectos: son energías muy presentes que piden ser canalizadas con conciencia para convertirse en tu mayor fortaleza:
        </p>
        <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.50rem;">
          ${excesses.map(num => `
            <li style="border-left: 2px solid var(--purple-color); padding-left: 0.75rem; font-size: 0.9rem; line-height: 1.5;">
              <strong>✦ Vibración ${num}:</strong> ${KARMIC_EXCESSES_MAP[num]}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  } else {
    karmicHTML += `
      <div>
        <h4 style="color: var(--success-color); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>✅</span> Armonía de las Intensidades
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
          Qué equilibrio tan bello habita en tu nombre. Ninguna vibración desborda a las demás. El cosmos ha tejido en tus letras una orquesta donde cada instrumento suena en su justa medida, permitiéndote navegar tus talentos con fluidez y sin obsesiones que te pesen.
        </p>
      </div>
    `;
  }
  
  return karmicHTML;
}

function calculateNumerologyProfile() {
  const nameInput = document.getElementById('num-name-input');
  const birthInput = document.getElementById('num-birth-input');
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!nameInput || !birthInput) return;
  
  const name = nameInput.value.trim();
  const birthDate = birthInput.value;
  
  if (!name || !birthDate) {
    alert("Por favor, introduce tu nombre completo y tu fecha de nacimiento para que los números revelen tu vibración.");
    if (!name) nameInput.focus();
    else birthInput.focus();
    return;
  }
  
  // Analyze name
  const nameAnalysis = analyzeNameNumerology(name);
  if (nameAnalysis.totalLetters === 0) {
    alert("Por favor, introduce un nombre válido con letras del abecedario.");
    nameInput.focus();
    return;
  }
  
  const soulRaw = nameAnalysis.soulSum;
  const personalityRaw = nameAnalysis.personalitySum;
  
  const soulVal = reduceNumerology(soulRaw);
  const personalityVal = reduceNumerology(personalityRaw);
  
  // Destiny / Sendero de Vida
  const dateParts = birthDate.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const dayVal = parseInt(dateParts[2], 10);
  
  let dateDigitSum = 0;
  const birthDigitsStr = birthDate.replace(/[^0-9]/g, '');
  for (let digit of birthDigitsStr) {
    dateDigitSum += parseInt(digit, 10);
  }
  const destinyVal = reduceNumerology(dateDigitSum);
  
  // Potential
  const potentialVal = reduceNumerology(destinyVal + dayVal);
  
  // Render values
  document.getElementById('num-soul-val').textContent = soulVal;
  document.getElementById('num-soul-desc').innerHTML = NUM_SOUL_DB[soulVal] || "Deseos internos de tu alma.";
  
  document.getElementById('num-personality-val').textContent = personalityVal;
  document.getElementById('num-personality-desc').innerHTML = NUM_PERSONALITY_DB[personalityVal] || "Cómo te ven los demás.";
  
  document.getElementById('num-destiny-val').textContent = destinyVal;
  document.getElementById('num-destiny-desc').innerHTML = NUM_DESTINY_DB[destinyVal] || "Tu misión de vida y sendero natal.";
  
  document.getElementById('num-potential-val').textContent = potentialVal;
  document.getElementById('num-potential-desc').innerHTML = NUM_POTENTIAL_DB[potentialVal] || "Tus logros y virtudes en la madurez.";
  
  const bdayDbItem = NUM_BIRTHDAY_DB[dayVal] || { desc: "Tu día natal.", group: 1 };
  const elementObj = getBirthdayElement(dayVal);
  document.getElementById('num-birthday-val').textContent = dayVal;
  document.getElementById('num-birthday-desc').innerHTML = `<strong>Día natal: ${dayVal}</strong>. Elemento <span style="color: ${elementObj.color}; font-weight: 600;">${elementObj.name}</span> (${elementObj.focus}).<br>${bdayDbItem.desc}`;
  
  // Narrative Analysis
  const analysisBox = document.getElementById('num-analysis-box');
  const soulMsg = NUM_SOUL_DB[soulVal] || "";
  const personalityMsg = NUM_PERSONALITY_DB[personalityVal] || "";
  const destinyMsg = NUM_DESTINY_DB[destinyVal] || "";
  const potentialMsg = NUM_POTENTIAL_DB[potentialVal] || "";
  
  analysisBox.innerHTML = `
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>Tu Esencia Interior y Proyección Exterior:</strong><br>
      A nivel interno, tu alma resuena con la vibración <strong>${soulVal}</strong>, manifestando un <em>${soulMsg.charAt(0).toLowerCase() + soulMsg.slice(1)}</em>. 
      Sin embargo, la imagen exterior que proyectas hacia los demás está regida por la vibración <strong>${personalityVal}</strong>: <em>${personalityMsg.charAt(0).toLowerCase() + personalityMsg.slice(1)}</em>. 
      Esta combinación describe un puente dinámico entre tus motivaciones más secretas y la máscara con la que navegas la sociedad.
    </p>
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>Tu Sendero de Vida y Herramientas Natales:</strong><br>
      Tu misión evolutiva o Sendero de Vida está marcado por el número <strong>${destinyVal}</strong>. Los astros y los números indican que <em>${destinyMsg.charAt(0).toLowerCase() + destinyMsg.slice(1)}</em>. 
      Para recorrer este camino con éxito, tu día de nacimiento (<strong>${dayVal}</strong>) te otorga una serie de herramientas innatas: <em>${bdayDbItem.desc}</em>. Perteneces al elemento <strong>${elementObj.name}</strong>, lo que potencia tus inclinaciones hacia el área de <strong>${elementObj.focus}</strong>.
    </p>
    <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.95rem;">
      <strong>Tu Logro y Cosecha en la Madurez:</strong><br>
      Finalmente, tu Número Potencial de cierre es el <strong>${potentialVal}</strong>. Esta vibración guiará la segunda etapa de tu vida y tus años de plenitud, prometiendo que <em>${potentialMsg.charAt(0).toLowerCase() + potentialMsg.slice(1)}</em>.
    </p>
  `;
  
  // Karmic Study
  const karmicBox = document.getElementById('num-karmic-box');
  karmicBox.innerHTML = generateKarmicStudyHTML(nameAnalysis.letterCounts, nameAnalysis.totalLetters);
  
  // Toggle results wrappers
  document.getElementById('num-personal-results').classList.remove('hidden');
  document.getElementById('num-compat-results').classList.add('hidden');
  
  // Show Panel
  resultsPanel.classList.remove('hidden');
  
  if (readingTitle) readingTitle.textContent = "Tu Perfil Numerológico Kármico";
  if (readingDesc) readingDesc.textContent = `Análisis completado para: "${name}"`;
  
  resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function getElementalMatch(e1, e2) {
  const key = `${e1.name}-${e2.name}`;
  const reverseKey = `${e2.name}-${e1.name}`;
  
  if (e1.name === e2.name) {
    if (e1.name === "Agua") return { pct: 95, label: "Afinidad Perfecta", desc: "Vuestras emociones y sensibilidad fluyen en perfecta armonía intelectual y espiritual, compartiendo una profunda empatía." };
    if (e1.name === "Fuego") return { pct: 95, label: "Pasión Desbordante", desc: "Vuestra unión arde con intensidad creadora, ambición compartida y acción. Deben cuidar el control mutuo." };
    if (e1.name === "Aire") return { pct: 95, label: "Sintonía Intelectual", desc: "Compartís un espacio libre de comunicación, arte e ideas. Vuestro entendimiento verbal es inmediato y estimulante." };
  }
  if (key === "Fuego-Aire" || reverseKey === "Fuego-Aire") {
    return { pct: 90, label: "Inspiración Mutua", desc: "El Aire aviva y expande el Fuego de la acción, la pasión y los proyectos comunes. Es una relación sumamente dinámica y creativa." };
  }
  if (key === "Agua-Aire" || reverseKey === "Agua-Aire") {
    return { pct: 80, label: "Fluidez Armónica", desc: "El Aire mueve las Aguas de la sensibilidad profunda, impulsando vuestra intuición, arte y comprensión emocional compartida." };
  }
  if (key === "Agua-Fuego" || reverseKey === "Agua-Fuego") {
    return { pct: 50, label: "Tensión Alquímica", desc: "El Fuego puede evaporar el Agua o el Agua apagar la pasión del Fuego. Esta unión requiere paciencia, tacto y respeto consciente de vuestros ritmos." };
  }
  return { pct: 70, label: "Alquimia Templada", desc: "Vuestros elementos se complementan de manera templada, requiriendo comunicación constante para encontrar el equilibrio de fuerzas." };
}

function calculateRelationshipCompatibility() {
  const name1Input = document.getElementById('num-name-input-p1');
  const birth1Input = document.getElementById('num-birth-input-p1');
  const name2Input = document.getElementById('num-name-input-p2');
  const birth2Input = document.getElementById('num-birth-input-p2');
  
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!name1Input || !birth1Input || !name2Input || !birth2Input) return;
  
  const name1 = name1Input.value.trim();
  const birth1 = birth1Input.value;
  const name2 = name2Input.value.trim();
  const birth2 = birth2Input.value;
  
  if (!name1 || !birth1 || !name2 || !birth2) {
    alert("Por favor, introduce el nombre completo y la fecha de nacimiento de ambas personas para calcular su afinidad cósmica.");
    if (!name1) name1Input.focus();
    else if (!birth1) birth1Input.focus();
    else if (!name2) name2Input.focus();
    else birth2Input.focus();
    return;
  }
  
  // Analyze Person 1
  const na1 = analyzeNameNumerology(name1);
  if (na1.totalLetters === 0) {
    alert("Por favor, introduce un nombre válido para la Persona 1.");
    name1Input.focus();
    return;
  }
  const soul1 = reduceNumerology(na1.soulSum);
  const pers1 = reduceNumerology(na1.personalitySum);
  
  const dateParts1 = birth1.split('-');
  const day1 = parseInt(dateParts1[2], 10);
  let dsum1 = 0;
  for (let digit of birth1.replace(/[^0-9]/g, '')) {
    dsum1 += parseInt(digit, 10);
  }
  const dest1 = reduceNumerology(dsum1);
  
  // Analyze Person 2
  const na2 = analyzeNameNumerology(name2);
  if (na2.totalLetters === 0) {
    alert("Por favor, introduce un nombre válido para la Persona 2.");
    name2Input.focus();
    return;
  }
  const soul2 = reduceNumerology(na2.soulSum);
  const pers2 = reduceNumerology(na2.personalitySum);
  
  const dateParts2 = birth2.split('-');
  const day2 = parseInt(dateParts2[2], 10);
  let dsum2 = 0;
  for (let digit of birth2.replace(/[^0-9]/g, '')) {
    dsum2 += parseInt(digit, 10);
  }
  const dest2 = reduceNumerology(dsum2);
  
  // Relationship sum reductions
  const soulRelVal = reduceNumerology(soul1 + soul2);
  const persRelVal = reduceNumerology(pers1 + pers2);
  const destRelVal = reduceNumerology(dest1 + dest2);
  
  // Elemental Chemistry
  const elem1 = getBirthdayElement(day1);
  const elem2 = getBirthdayElement(day2);
  const elemMatch = getElementalMatch(elem1, elem2);
  
  // Calculate Global Compatibility Percentage
  let finalScore = elemMatch.pct;
  if (soul1 === soul2) finalScore += 10;
  if (dest1 === dest2) finalScore += 10;
  if (pers1 === pers2) finalScore += 5;
  
  const checkComplementary = (v1, v2) => {
    return (v1 === 1 && v2 === 2) || (v1 === 2 && v2 === 1) ||
           (v1 === 3 && v2 === 6) || (v1 === 6 && v2 === 3) ||
           (v1 === 4 && v2 === 8) || (v1 === 8 && v2 === 4);
  };
  if (checkComplementary(soul1, soul2)) finalScore += 5;
  if (checkComplementary(dest1, dest2)) finalScore += 5;
  
  finalScore = Math.max(40, Math.min(99, finalScore));
  
  // Render Values
  document.getElementById('num-compat-percent-val').textContent = `${finalScore}%`;
  document.getElementById('num-compat-title-val').textContent = elemMatch.label;
  document.getElementById('num-compat-summary-val').innerHTML = elemMatch.desc;
  
  document.getElementById('num-compat-soul-val').textContent = soulRelVal;
  document.getElementById('num-compat-soul-desc').innerHTML = NUM_REL_SOUL_DB[soulRelVal] || "Afinidad de sentimientos.";
  
  document.getElementById('num-compat-personality-val').textContent = persRelVal;
  document.getElementById('num-compat-personality-desc').innerHTML = NUM_REL_PERS_DB[persRelVal] || "Afinidad de comportamiento.";
  
  document.getElementById('num-compat-destiny-val').textContent = destRelVal;
  document.getElementById('num-compat-destiny-desc').innerHTML = NUM_REL_DEST_DB[destRelVal] || "Propósito y camino de vida conjunto.";
  
  document.getElementById('num-compat-alchemy-val').textContent = `${elem1.name} + ${elem2.name}`;
  document.getElementById('num-compat-alchemy-desc').innerHTML = `<strong>Alquimia elemental:</strong> Día natal ${day1} (${elem1.name}) y Día natal ${day2} (${elem2.name}).`;
  
  // Narrative Sinastría Box
  const soulRelMsg = NUM_REL_SOUL_DB[soulRelVal] || "";
  const persRelMsg = NUM_REL_PERS_DB[persRelVal] || "";
  const destRelMsg = NUM_REL_DEST_DB[destRelVal] || "";
  
  const analysisBox = document.getElementById('num-compat-analysis-box');
  analysisBox.innerHTML = `
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>El Vínculo Íntimo del Alma:</strong><br>
      Vuestra afinidad del alma suma el número de relación <strong>${soulRelVal}</strong>. Esto nos indica que en lo más profundo del corazón, vuestro vínculo emocional representa un: <em>${soulRelMsg.charAt(0).toLowerCase() + soulRelMsg.slice(1)}</em>. 
      Compartís vuestras alegrías y miedos desde una raíz íntima que define la esencia afectiva de la relación.
    </p>
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>La Interacción y Trato en el Día a Día:</strong><br>
      A nivel exterior y social, la combinación de vuestras personalidades da el número <strong>${persRelVal}</strong>: <em>${persRelMsg.charAt(0).toLowerCase() + persRelMsg.slice(1)}</em>. 
      Esta vibración rige vuestro entendimiento cotidiano, vuestras salidas sociales y la máscara colectiva que presentáis ante vuestros amigos y familiares.
    </p>
    <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.95rem;">
      <strong>El Propósito y Misión de Pareja:</strong><br>
      Vuestro Destino Compartido como pareja vibra con la cifra <strong>${destRelVal}</strong>. Esto señala la misión de aprendizaje y crecimiento evolutivo de vuestro camino juntos: <em>${destRelMsg.charAt(0).toLowerCase() + destRelMsg.slice(1)}</em>.
    </p>
  `;
  
  // Advice Box
  const adviceBox = document.getElementById('num-compat-advice-box');
  let adviceText = "";
  if (finalScore >= 90) {
    adviceText = `Vuestra afinidad cósmica es excepcionalmente elevada (<strong>${finalScore}%</strong>). Gozáis de una sintonía natural muy fluida tanto en el plano emocional como en el práctico. El consejo del oráculo para vosotros es **nutrir el vínculo mediante la gratitud diaria** y no dar por sentado el gran entendimiento que tenéis. Apoyaros mutuamente para emprender proyectos compartidos, ya que la sinergia numérica multiplica vuestro éxito personal y espiritual.`;
  } else if (finalScore >= 75) {
    adviceText = `Tenéis una compatibilidad muy saludable y equilibrada (<strong>${finalScore}%</strong>). Compartís áreas clave de afinidad que os permiten comunicaros con facilidad y resolver contratiempos sin dañar el núcleo emocional. El consejo astral es **enfocarse en lo que os une en lugar de las pequeñas diferencias**. Practicad la escucha receptiva y fomentad momentos a solas para profundizar en vuestra intimidad, fortaleciendo el puente de vuestro Destino Compartido.`;
  } else {
    adviceText = `Vuestro vínculo presenta una compatibilidad del <strong>${finalScore}%</strong>, lo que indica un sendero de **gran aprendizaje y transmutación mutua**. Encontráis tensiones debido a vuestros diferentes ritmos emocionales y elementales (<strong>${elemMatch.label}</strong>). El consejo del oráculo es **hacer de la paciencia y la diplomacia vuestro templo común**. Recordad que los opuestos se atraen para pulir sus imperfecciones; vuestras diferencias no son barreras, sino oportunidades para crecer en madurez y tolerancia, aprendiendo a amar sin imponer vuestro propio ego.`;
  }
  adviceBox.innerHTML = `<p style="line-height: 1.6; font-size: 0.95rem;">${adviceText}</p>`;
  
  // Show Panel
  document.getElementById('num-personal-results').classList.add('hidden');
  document.getElementById('num-compat-results').classList.remove('hidden');
  resultsPanel.classList.remove('hidden');
  
  if (readingTitle) readingTitle.textContent = "Sinastría de Compatibilidad";
  if (readingDesc) readingDesc.textContent = `Afinidad calculada entre "${name1}" y "${name2}"`;
  
  resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function calculatePersonalYear() {
  const birthInput = document.getElementById('num-year-birth-input');
  const targetYearInput = document.getElementById('num-year-target-input');
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!birthInput || !targetYearInput || !resultsPanel) return;
  
  const birthDateVal = birthInput.value;
  const targetYearVal = parseInt(targetYearInput.value, 10);
  
  if (!birthDateVal || isNaN(targetYearVal)) {
    alert("Por favor, introduce tu fecha de nacimiento y un año válido para consultar.");
    return;
  }
  
  const birthDate = new Date(birthDateVal + "T00:00:00");
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // 1-indexed
  
  let daySum = day.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  let monthSum = month.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  let yearSum = targetYearVal.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  
  let totalSum = daySum + monthSum + yearSum;
  
  while (totalSum > 9) {
    totalSum = totalSum.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  
  const personalYear = totalSum;
  
  const YEAR_DB = {
    1: {
      title: "Siembra e Inicios",
      subtitle: "Año 1: El Despertar del Sembrador",
      desc: "Este es un año para tomar la iniciativa, iniciar nuevos proyectos y plantar las semillas de lo que deseas construir durante los próximos 9 años. Te sentirás con gran originalidad, fuerza individual y deseos de libertad. El consejo de tu Grimorio es confiar en tu poder personal, evitar la indecisión y tomar las riendas de tu destino sin esperar la aprobación de otros."
    },
    2: {
      title: "Paciencia y Cooperación",
      subtitle: "Año 2: La Gestación en la Sombra",
      desc: "Un período para cultivar la paciencia, las alianzas y el detalle. Las semillas que plantaste el año pasado están echando raíces profundas bajo tierra. Es propicio para escuchar, colaborar, establecer relaciones afectivas o comerciales firmes y practicar la diplomacia. Tu consejo evolutivo es aprender a esperar el momento cósmico idóneo."
    },
    3: {
      title: "Autoexpresión y Florecimiento",
      subtitle: "Año 3: La Expansión Creadora",
      desc: "Año expansivo caracterizado por la alegría de vivir, la socialización, los viajes y la explosión de tu creatividad. Momento para escribir, pintar, expresarse y dejar volar tu imaginación. El consejo de tu Grimorio es cultivar tus talentos y no dispersar tu energía en múltiples focos que no puedas culminar."
    },
    4: {
      title: "Trabajo Firme y Estructura",
      subtitle: "Año 4: La Base del Templo",
      desc: "Un período de esfuerzo sostenido, disciplina, orden y consolidación profesional. Exige perseverancia y paciencia para construir cimientos sólidos. Excelente para compras inmobiliarias, firmas notariales y reorganizar tu rutina de salud física. El consejo astral es aceptar las reglas del esfuerzo concreto."
    },
    5: {
      title: "Cambio, Aventura y Libertad",
      subtitle: "Año 5: La Espiral del Viento",
      desc: "Un ciclo dinámico repleto de transformaciones repentinas, viajes imprevistos, adaptabilidad y magnetismo personal. Es ideal para liberarse de hábitos obsoletos, expandir tus horizontes y conocer personas inspiradoras. El consejo del oráculo es fluir con las sorpresas del camino sin caer en impulsos autodestructivos."
    },
    6: {
      title: "Responsabilidad y Amor familiar",
      subtitle: "Año 6: La Armonía del Hogar",
      desc: "Año consagrado a la familia, el amor, las relaciones estables y el bienestar comunitario. Tu responsabilidad se pondrá a prueba para mediar en conflictos familiares y brindar protección emocional. Buen momento para decorar tu espacio íntimo o casarse. El consejo evolutivo es actuar desde el amor incondicional."
    },
    7: {
      title: "Introspección y Sabiduría Espiritual",
      subtitle: "Año 7: El Templo Interior",
      desc: "Un año de retiro y descanso exterior para dar paso al estudio de temas profundos, la meditación y el autoanálisis. Sentirás deseos de silencio y soledad reparadora. El consejo de tu Grimorio es conectar con el espíritu, practicar meditación diaria y no forzar los negocios materiales."
    },
    8: {
      title: "Logro Material y Cosecha Kármica",
      subtitle: "Año 8: La Cosecha de la Tierra",
      desc: "El ciclo del éxito, el reconocimiento ejecutivo y la justicia material. Cosecharás lo sembrado en los años anteriores. Excelente para grandes finanzas, dirección de personal y ejercer tu autoridad. El consejo evolutivo es recordar que todo poder terrenal debe alinearse con la ética y el espíritu."
    },
    9: {
      title: "Cierre, Balance y Transmutación",
      subtitle: "Año 9: La Purificación del Alma",
      desc: "Año de culminación, balance y limpieza profunda. Es momento de dejar ir lo que no sirve (relaciones, trabajos, apegos) para preparar el terreno para un nuevo ciclo de 9 años. Se aconseja realizar obras benéficas, perdonar viejos rencores y cultivar el desapego material para transmutar tu karma."
    }
  };
  
  const yearData = YEAR_DB[personalYear];
  
  document.getElementById('num-year-title').innerHTML = `Año Personal ${personalYear} &mdash; <span class="gold">${yearData.title}</span>`;
  document.getElementById('num-year-subtitle').textContent = yearData.subtitle;
  document.getElementById('num-year-desc').innerHTML = yearData.desc;
  
  const forecastBox = document.getElementById('num-year-forecast-box');
  forecastBox.innerHTML = `
    <p style="margin-bottom: 1rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>Vibración del año ${targetYearVal}:</strong><br>
      Al combinar tu día natal (${day}) y tu mes de nacimiento (${month}) con las vibraciones del año en curso (${targetYearVal}), tu ciclo vital se sitúa en la frecuencia <strong>${personalYear}</strong>. 
      Esta frecuencia es regida de forma kármica por las lecciones de <em>${yearData.title.toLowerCase()}</em>, indicando un puente de aprendizaje crucial.
    </p>
    <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.95rem;">
      <strong>Consejo Evolutivo Específico:</strong><br>
      Durante los próximos meses, los astros te sugieren sintonizar con la vibración de <strong>${personalYear}</strong> mediante respiraciones pausadas. Evita iniciar el siguiente gran ciclo de proyectos si te encuentras en año 9, o no dudes en dar el gran salto inicial si estás en año 1. Cada ciclo cósmico tiene su tiempo de siembra, espera, florecimiento y transmutación.
    </p>
  `;
  
  renderYearTimeline(personalYear);
  
  document.getElementById('num-personal-results').classList.add('hidden');
  document.getElementById('num-compat-results').classList.add('hidden');
  document.getElementById('num-year-results').classList.remove('hidden');
  resultsPanel.classList.remove('hidden');
  
  if (readingTitle) readingTitle.textContent = "Tu Clima Numerológico del Ciclo de Vida";
  if (readingDesc) readingDesc.textContent = `Año consultado: ${targetYearVal} (Año Personal ${personalYear})`;
  
  resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function renderYearTimeline(activeYear) {
  const timeline = document.getElementById('year-timeline-display');
  if (!timeline) return;
  timeline.innerHTML = '';
  
  const track = document.createElement('div');
  track.className = 'timeline-track';
  timeline.appendChild(track);
  
  const labels = {
    1: "Siembra",
    2: "Espera",
    3: "Expansión",
    4: "Cimiento",
    5: "Cambio",
    6: "Armonía",
    7: "Sabiduría",
    8: "Poder",
    9: "Balance"
  };
  
  for (let i = 1; i <= 9; i++) {
    const node = document.createElement('div');
    node.className = `timeline-node${i === activeYear ? ' active' : ''}`;
    node.innerHTML = `
      <span class="node-number">${i}</span>
      <span class="node-label">${labels[i]}</span>
    `;
      timeline.appendChild(node);
  }
}

function toggleNumerologyMode(mode) {
  const modeBtns = document.querySelectorAll('#numerology-tab-content .numerology-mode-toggle .mode-btn');
  const personalForm = document.getElementById('num-personal-form');
  const compatForm = document.getElementById('num-compat-form');
  const yearForm = document.getElementById('num-year-form');
  
  const personalResults = document.getElementById('num-personal-results');
  const compatResults = document.getElementById('num-compat-results');
  const yearResults = document.getElementById('num-year-results');
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!personalForm || !compatForm || !yearForm) return;
  
  modeBtns.forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  personalForm.classList.add('hidden');
  compatForm.classList.add('hidden');
  yearForm.classList.add('hidden');
  
  if (mode === 'personal') {
    personalForm.classList.remove('hidden');
  } else if (mode === 'compatibility') {
    compatForm.classList.remove('hidden');
  } else if (mode === 'year') {
    yearForm.classList.remove('hidden');
  }
  
  if (resultsPanel) resultsPanel.classList.add('hidden');
  if (personalResults) personalResults.classList.add('hidden');
  if (compatResults) compatResults.classList.add('hidden');
  if (yearResults) yearResults.classList.add('hidden');
  
  if (readingTitle) readingTitle.textContent = "Descubre las vibraciones de tu destino...";
  if (readingDesc) readingDesc.textContent = "Introduce los datos en el panel lateral para iniciar el cálculo.";
}

function initNumerology() {
  const calculateBtn = document.getElementById('num-calculate-btn');
  const compatBtn = document.getElementById('num-compat-btn');
  const yearBtn = document.getElementById('num-year-btn');
  const resetBtn = document.getElementById('num-reset-btn');
  const nameInput = document.getElementById('num-name-input');
  
  // Mode toggle buttons
  const modeBtns = document.querySelectorAll('#numerology-tab-content .numerology-mode-toggle .mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleNumerologyMode(btn.getAttribute('data-mode'));
    });
  });
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateNumerologyProfile);
  }
  
  if (compatBtn) {
    compatBtn.addEventListener('click', calculateRelationshipCompatibility);
  }

  if (yearBtn) {
    yearBtn.addEventListener('click', calculatePersonalYear);
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Clear personal inputs
      if (nameInput) nameInput.value = '';
      const birthInput = document.getElementById('num-birth-input');
      if (birthInput) birthInput.value = '';
      
      // Clear compatibility inputs
      const nameP1 = document.getElementById('num-name-input-p1');
      const birthP1 = document.getElementById('num-birth-input-p1');
      const nameP2 = document.getElementById('num-name-input-p2');
      const birthP2 = document.getElementById('num-birth-input-p2');
      
      if (nameP1) nameP1.value = '';
      if (birthP1) birthP1.value = '';
      if (nameP2) nameP2.value = '';
      if (birthP2) birthP2.value = '';

      // Clear year inputs
      const birthYearInput = document.getElementById('num-year-birth-input');
      const targetYearInput = document.getElementById('num-year-target-input');
      if (birthYearInput) birthYearInput.value = '';
      if (targetYearInput) targetYearInput.value = '2026';
      
      const resultsPanel = document.getElementById('num-results-panel');
      if (resultsPanel) resultsPanel.classList.add('hidden');
      
      // Reset headers
      const activeBtn = document.querySelector('#numerology-tab-content .numerology-mode-toggle .mode-btn.active');
      const mode = activeBtn ? activeBtn.getAttribute('data-mode') : 'personal';
      toggleNumerologyMode(mode);
      
      const configPanel = document.querySelector('#numerology-tab-content .config-panel');
      if (configPanel) configPanel.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        calculateNumerologyProfile();
      }
    });
  }
}

/* ==========================================================================
   Tarot New Spreads Synthesis Logic
   ========================================================================== */

function getCategoryIntroText() {
  switch(selectedCategory) {
    case 'love': return 'la esfera sentimental y afectiva';
    case 'work': return 'tu panorama laboral, profesional o económico';
    case 'health': return 'tu bienestar físico, mental y energético';
    default: return 'los senderos generales de tu destino';
  }
}

function generateCelticSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Tú
  const c2 = currentSpread[1]; // Obstáculo
  const c3 = currentSpread[2]; // Corona
  const c4 = currentSpread[3]; // Base
  const c5 = currentSpread[4]; // Pasado
  const c6 = currentSpread[5]; // Futuro
  const c7 = currentSpread[6]; // Tu actitud
  const c8 = currentSpread[7]; // Entorno
  const c9 = currentSpread[8]; // Esperanzas/Miedos
  const c10 = currentSpread[9]; // Resultado

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);
  const d5 = getCardNarrativeDetails(c5);
  const d6 = getCardNarrativeDetails(c6);
  const d7 = getCardNarrativeDetails(c7);
  const d8 = getCardNarrativeDetails(c8);
  const d9 = getCardNarrativeDetails(c9);
  const d10 = getCardNarrativeDetails(c10);

  let categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>Nos adentramos en el mandala sagrado de la Cruz Celta para explorar lo que te inquieta en <strong>${categoryIntro}</strong> y tu pregunta: <em>"${question}"</em>. Diez arcanos se entrelazan en una conversación sincera y reveladora sobre tu alma.</p>
    <p>En el <strong>centro de todo</strong> te encuentras tú, bajo la influencia de <strong>${d1.name}</strong>. ${d1.meaning}</p>
    <p>Cruzando tu camino inmediato, la carta de <strong>${d2.name}</strong> se presenta como la prueba o el desafío que te invita a madurar y superarte. ${d2.meaning}</p>
    <p>Tu mente y tus <strong>sueños más elevados</strong> miran con anhelo hacia <strong>${d3.name}</strong>. ${d3.meaning} En las <strong>raíces</strong> más profundas de tu ser, en cambio, se asienta la sabiduría de <strong>${d4.name}</strong>, dándote una base sólida sobre la cual sostenerte. ${d4.meaning}</p>
    <p>El fluir del tiempo nos muestra que en tu <strong>pasado</strong> aún resuena la impronta de <strong>${d5.name}</strong>, que te preparó para el hoy. ${d5.meaning} Y si miramos hacia el <strong>futuro cercano</strong>, la energía que ya se avecina es la de <strong>${d6.name}</strong>. ${d6.meaning}</p>
    <p>Tu <strong>actitud interior</strong> está moldeada por <strong>${d7.name}</strong>. ${d7.meaning} Tu <strong>entorno</strong> y los que te rodean responden con la vibración de <strong>${d8.name}</strong>. ${d8.meaning} Tus <strong>esperanzas y temores</strong> más íntimos vibran con la presencia de <strong>${d9.name}</strong>. ${d9.meaning}</p>
    <p>Finalmente, todo este mar de influencias confluye en el <strong>resultado</strong> que corona tu tirada, guiado por <strong>${d10.name}</strong>. El oráculo culmina su guía revelándote con amor: ${d10.meaning} Acoge esta sabiduría y deja que guíe tu sendero.</p>
  `;
}

function generateMirrorSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Tu estado
  const c2 = currentSpread[1]; // Su estado
  const c3 = currentSpread[2]; // Tu proyección
  const c4 = currentSpread[3]; // Su proyección

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);

  let categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>El espejo del oráculo se abre ante tu pregunta sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>. Cuatro cartas actúan como portales para comprender las verdaderas corrientes invisibles que fluyen entre tú y la otra persona.</p>
    <p>Al mirarte a ti, descubrimos que tu <strong>mundo interior</strong> resuena con la energía de <strong>${d1.name}</strong>. ${d1.meaning}</p>
    <p>Al dirigir la mirada al <strong>mundo interior de la otra persona</strong>, aparece la energía de <strong>${d2.name}</strong>. ${d2.meaning}</p>
    <p>Lo que tú <strong>proyectas</strong> sobre la relación está influenciado por <strong>${d3.name}</strong>. ${d3.meaning}</p>
    <p>Por su parte, lo que la otra persona <strong>proyecta</strong> sobre ti vibra con <strong>${d4.name}</strong>. ${d4.meaning}</p>
    <p>Como una voz comprensiva que busca tu paz, el oráculo te invita a ver este reflejo mutuo sin juzgar, sino con ternura. Al integrar las enseñanzas de <em>${d1.name}</em> y <em>${d2.name}</em>, y observar de frente las proyecciones de <em>${d3.name}</em> y <em>${d4.name}</em>, encontrarás el camino de comprensión y cercanía que tu alma tanto anhela.</p>
  `;
}

function generateClaritySynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // El Bloqueo
  const c2 = currentSpread[1]; // La Fuerza Mágica
  const c3 = currentSpread[2]; // La Acción
  const c4 = currentSpread[3]; // La Revelación

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);

  let categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>El oráculo acoge tu búsqueda de respuestas sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>. Cuatro arcanos abren sus puertas para disipar la niebla y devolver el equilibrio y la luz a tu situación.</p>
    <p>Empecemos por ver aquello que hoy nubla tu mirada: el <strong>bloqueo</strong> que encarna <strong>${d1.name}</strong>. Nombrar esta sombra es el primer paso de tu liberación. ${d1.meaning}</p>
    <p>Para ayudarte, el universo despierta tu <strong>fuerza mágica interna</strong> a través de <strong>${d2.name}</strong>. Apóyate sin dudar en este recurso íntimo. ${d2.meaning}</p>
    <p>La <strong>acción</strong> concreta que el cosmos te propone dar viene marcada por <strong>${d3.name}</strong>. Un pequeño paso puede cambiarlo todo. ${d3.meaning}</p>
    <p>Y cuando integres estas energías y avances, te aguarda una hermosa <strong>revelación</strong> de la mano de <strong>${d4.name}</strong>. El oráculo te susurra con gozo: ${d4.meaning}</p>
  `;
}

// Initialize everything on page load
initTabNavigation();
setupModalEvents();
initHoroscope();
initNumerology();

/* ==========================================================================
   Pestaña Mística de La Luna (Influencia Lunar y Tránsitos)
   ========================================================================== */

const LUNAR_RITUALS = {
  "Luna Nueva": "Excelente momento para meditar en silencio y establecer propósitos. Escribe en un papel tus intenciones para este ciclo y visualízalas bajo el cielo oscuro.",
  "Luna Creciente": "Enciende una vela dorada o verde y enfócate en la atracción de abundancia y nuevos proyectos. Haz afirmaciones positivas sobre el crecimiento de tus metas.",
  "Cuarto Creciente": "Fase de acción. Realiza un ritual de empoderamiento visualizándote superando cualquier obstáculo. Enciende una vela violeta para transmutar miedos en valentía.",
  "Luna Giba Creciente": "Analiza tus planes. Es propicio realizar infusiones de hierbas (té de manzanilla o menta) para calmar la mente y afinar detalles prácticos de tu vida.",
  "Luna Llena": "Ritual de consagración. Expón tus cristales, amuletos y agua al brillo plateado de la luna llena. Medita bajo su luz enfocándote en la revelación y la gratitud.",
  "Luna Giba Menguante": "Espacio de agradecimiento. Da las gracias por los frutos recibidos y comienza a identificar de forma lógica qué hábitos o relaciones necesitas soltar.",
  "Cuarto Menguante": "Ritual de destierro y desapego. Escribe en un trozo de papel aquello que deseas soltar de tu vida (malos hábitos, miedos o ataduras) y quémalo con cuidado.",
  "Luna Menguante": "Limpieza y purificación. Sahúma tu hogar con romero o lavanda para disolver energías densas y preparar el espacio para el silencio del nuevo ciclo."
};

const LUNAR_TAROT_CARE = {
  "Luna Nueva": "Purificación absoluta. Envuelve tu mazo de tarot en un paño de seda violeta y déjalo reposar toda la noche sobre un lecho de sal marina (sin contacto directo) para limpiar su energía acumulada.",
  "Luna Creciente": "Magnetización. Pasa cada una de las cartas por el humo de un incienso de sándalo o mirra, decretando que el mazo canalice mensajes de crecimiento y claridad.",
  "Cuarto Creciente": "Fuerza activa. Mezcla bien las cartas boca abajo y ordénalas en secuencia numérica de arcanos. Expón el mazo a la luz del atardecer para reactivar su vitalidad.",
  "Luna Giba Creciente": "Afinación intuitiva. Sostén el mazo entre tus manos a la altura del corazón e insufla tu aliento sobre él tres veces mientras visualizas luz dorada limpiando las cartas.",
  "Luna Llena": "Consagración total. Coloca tu mazo en una ventana donde reciba la luz directa de la Luna Llena durante unas horas. Esto potenciará al máximo su sensibilidad predictiva.",
  "Luna Giba Menguante": "Descanso protector. Guarda tu mazo junto a un cristal de cuarzo transparente o una amatista dentro de su caja de madera para estabilizar sus vibraciones.",
  "Cuarto Menguante": "Limpieza de remanentes. Pasa el mazo de cartas por el humo de salvia blanca o romero seco para liberar cualquier energía residual que haya quedado tras lecturas intensas.",
  "Luna Menguante": "Silencio sagrado. Evita realizar lecturas complejas o predictivas de gran calado durante estos días. Deja descansar el mazo en un espacio oscuro y reservado."
};

const ZODIAC_SIGNS_LIST = [
  "aries", "tauro", "geminis", "cancer", "leo", "virgo", 
  "libra", "escorpio", "sagitario", "capricornio", "acuario", "piscis"
];

function initLunarTab() {
  const moonWidget = document.getElementById('moon-phase-widget');
  if (moonWidget) {
    moonWidget.addEventListener('click', () => {
      const lunarTabBtn = document.querySelector('.nav-tab[data-tab="lunar"]');
      if (lunarTabBtn) {
        lunarTabBtn.click();
      }
    });
  }

  // Hemisphere buttons
  const northBtn = document.getElementById('lunar-hem-north');
  const southBtn = document.getElementById('lunar-hem-south');
  if (northBtn && southBtn) {
    northBtn.addEventListener('click', () => {
      northBtn.classList.add('active');
      southBtn.classList.remove('active');
      localStorage.setItem('lunar_hemisphere', 'north');
      renderLunarTabDetails();
      renderLunarCalendar();
      initMoonPhaseHeader();
    });
    southBtn.addEventListener('click', () => {
      southBtn.classList.add('active');
      northBtn.classList.remove('active');
      localStorage.setItem('lunar_hemisphere', 'south');
      renderLunarTabDetails();
      renderLunarCalendar();
      initMoonPhaseHeader();
    });
  }

  // Set active hemisphere on start
  const savedHem = localStorage.getItem('lunar_hemisphere') || 'north';
  if (savedHem === 'south' && southBtn) {
    southBtn.classList.add('active');
    if (northBtn) northBtn.classList.remove('active');
  } else if (northBtn) {
    northBtn.classList.add('active');
    if (southBtn) southBtn.classList.remove('active');
  }

  // Zodiac sign selector
  const signSelect = document.getElementById('lunar-user-sign-select');
  if (signSelect) {
    signSelect.addEventListener('change', () => {
      updateLunarTransitPersonalAdvice();
    });

    // Load saved sign
    const savedSign = localStorage.getItem('user_zodiac_sign');
    if (savedSign) {
      signSelect.value = savedSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  }

  // Astral date query picker
  const searchDateInput = document.getElementById('lunar-search-date');
  const searchDateBtn = document.getElementById('lunar-search-date-btn');
  if (searchDateInput && searchDateBtn) {
    const todayStr = new Date().toLocaleDateString('sv'); // YYYY-MM-DD
    searchDateInput.value = todayStr;
    
    searchDateBtn.addEventListener('click', () => {
      const val = searchDateInput.value;
      if (!val) return;
      
      const [year, month, day] = val.split('-').map(Number);
      selectedLunarDate = new Date(year, month - 1, day);
      
      // Update calendar navigation to that month and year
      lunarCalendarMonth = selectedLunarDate.getMonth();
      lunarCalendarYear = selectedLunarDate.getFullYear();
      
      renderLunarCalendar();
      renderLunarTabDetails(selectedLunarDate);
      
      // Update selected date indicators
      const indicator = document.getElementById('lunar-selected-date-indicator');
      const textEl = document.getElementById('lunar-selected-date-text');
      const titleEl = document.getElementById('lunar-clima-title');
      
      const today = new Date();
      const isToday = selectedLunarDate.getDate() === today.getDate() && 
                      selectedLunarDate.getMonth() === today.getMonth() && 
                      selectedLunarDate.getFullYear() === today.getFullYear();
                      
      if (indicator && textEl && titleEl) {
        if (isToday) {
          indicator.classList.add('hidden');
          titleEl.textContent = "La Influencia Lumínica de Hoy";
        } else {
          indicator.classList.remove('hidden');
          const dayFormatted = day.toString().padStart(2, '0');
          const monthFormatted = month.toString().padStart(2, '0');
          textEl.textContent = `Viendo: ${dayFormatted}/${monthFormatted}/${year}`;
          titleEl.textContent = "La Influencia Lumínica Elegida";
        }
      }
    });
  }

  // --- Lógica del modal interactivo de detalles de fases lunares ---
  const lunarModal = document.getElementById('lunar-modal');
  const lunarModalClose = document.getElementById('lunar-modal-close');
  const lunarModalBackdrop = document.getElementById('lunar-modal-backdrop');
  const lunarCards = document.querySelectorAll('.lunar-image-card');
  
  const lunarPhasesData = {
    full: {
      title: "Luna Llena",
      subtitle: "Fase de Plenitud, Revelación e Intuición Máxima",
      image: "assets/luna_llena.png",
      influence: "La Luna Llena es el momento en que la energía cósmica alcanza su cúspide. Simboliza la culminación de proyectos, la iluminación de lo que estaba oculto en el subconsciente y el punto de mayor sensibilidad psíquica. Durante esta fase, las emociones pueden ser intensas y las percepciones extrasensoriales están muy potenciadas. Es una temporada ideal para la autoexpresión, la manifestación de deseos y la celebración de los logros.",
      ritual: "<strong>Ritual de Carga y Manifestación:</strong> Escribe en un papel las metas que has alcanzado y agradece al universo. Para manifestar, coloca tus cristales y un vaso con agua purificada bajo la luz directa de la luna llena toda la noche. Al día siguiente, bebe el agua cargada con la energía lunar para impregnar tu cuerpo físico y astral de vitalidad, claridad y protección espiritual.",
      tarot: "<strong>Consagración y Limpieza del Mazo:</strong> Es la fase perfecta para limpiar y cargar tu mazo de cartas de Tarot. Expón el mazo directamente a los rayos de la luna llena sobre el alféizar de una ventana. Su luz purificará cualquier energía residual acumulada y sintonizará tus lecturas con tu vibración espiritual más alta."
    },
    crescent: {
      title: "Luna Creciente",
      subtitle: "Fase de Intención, Siembra y Acción Inicial",
      image: "assets/luna_creciente.png",
      influence: "La Luna Creciente marca el inicio del crecimiento de la luz. Representa el impulso para actuar, la siembra de nuevas intenciones y la recolección de ideas innovadoras. La energía cósmica nos empuja hacia adelante, inspirándonos a superar la inercia y a dar los primeros pasos con valentía. Es una fase de creatividad, planificación estructurada y enfoque mental en tus deseos.",
      ritual: "<strong>Ritual de Intenciones del Sembrador:</strong> Enciende una vela verde o dorada. Escribe en tu diario de destino 3 objetivos claros que quieras hacer crecer en las próximas semanas. Visualízate lográndolos mientras sostienes un cuarzo transparente en tus manos. Conserva el papel debajo de tu almohada o en un lugar secreto.",
      tarot: "<strong>Activación del Mazo:</strong> Realiza lecturas enfocadas en proyectos que inician. Para cargar tus cartas con esta vibración, baraja el mazo con suavidad y visualiza una luz dorada que emana de tus manos, infundiendo al Tarot la energía del crecimiento y el dinamismo."
    },
    new: {
      title: "Luna Nueva",
      subtitle: "Fase de Introspección, Renacimiento y Vacío Místico",
      image: "assets/luna_nueva.png",
      influence: "La Luna Nueva es el momento de total oscuridad en el cielo. Representa el punto cero, el útero cósmico donde todo nace y donde todo descansa. Es el ciclo ideal para replegarse, mirar hacia el interior (introspección), meditar en el silencio y soltar apegos. La energía de hoy nos invita a purificar la mente y el espíritu, limpiando el terreno para el ciclo que comienza.",
      ritual: "<strong>Ritual de Vacío y Purificación:</strong> Enciende un incienso de sándalo o copal. Escribe en un papel aquello que te limita o te causa ansiedad. Quema el papel de forma segura en un cuenco resistente al fuego, entregando tus miedos al fuego sagrado para transmutarlos en sabiduría. Medita 10 minutos en silencio absoluto.",
      tarot: "<strong>Limpieza y Descanso:</strong> Se aconseja dar un respiro a tus lecturas profundas o realizar tiradas terapéuticas de autoconocimiento. Envuelve tu mazo de Tarot en un paño de seda violeta o negra y colócalo junto a una piedra de obsidiana o turmalina negra para absorber y neutralizar las vibraciones densas."
    },
    quarter: {
      title: "Cuarto Creciente",
      subtitle: "Fase de Decisión, Superación y Fuerza de Voluntad",
      image: "assets/luna_cuarto.png",
      influence: "El Cuarto Creciente representa el equilibrio perfecto de luz y sombra (media luna). En este punto, el universo te reta a superar los primeros obstáculos que surgen tras sembrar tus metas en la Luna Nueva. Es una fase que exige tomar decisiones firmes, templar el carácter y demostrar resistencia mental y disciplina. La energía cósmica es de lucha constructiva y autoafirmación.",
      ritual: "<strong>Ritual de Fuerza y Enfoque:</strong> Coloca tres velas amarillas en forma de triángulo. Escribe en una tarjeta tus mayores desafíos actuales. Sostén un cuarzo ahumado o citrino en tu mano dominante, respira hondo y repite tres veces: 'Soy fuerte, soy constante, ningún obstáculo desvía mi camino'. Guarda la tarjeta en tu billetera como recordatorio visual.",
      tarot: "<strong>Tiradas de Bloqueos:</strong> Es el momento ideal para realizar la tirada 'Hechizo de Claridad' o 'La Cruz Celta', enfocando las preguntas en destrabar dificultades. Limpia el mazo pasándolo a través del humo de un sahumerio de romero o ruda."
    },
    waning: {
      title: "Luna Menguante",
      subtitle: "Fase de Cierre, Liberación, Desapego y Destierro",
      image: "assets/luna_menguante_v2.png",
      influence: "La Luna Menguante marca el declive paulatino de la luz. Es el momento cósmico para soltar, liberar lo que ya no sirve, perdonar, sanar viejas heridas y cerrar ciclos afectivos o laborales. La energía te invita a la limpieza profunda de tu entorno físico y de tus cuerpos sutiles, eliminando la toxicidad y el cansancio acumulado para descansar de verdad.",
      ritual: "<strong>Ritual de Destierro y Despojo:</strong> Limpia tu hogar barriendo desde el interior hacia la puerta de salida mientras visualizas que expulsas las energías estancadas. Toma un baño purificador con sal marina y unas gotas de aceite de lavanda o eucalipto, decretando que el agua arrastra y disuelve todo dolor y fatiga.",
      tarot: "<strong>Purificación Profunda del Mazo:</strong> Coloca tus cartas sobre una superficie plana y pon una piedra de sal de roca o selenita encima del mazo durante 24 horas. Esto descargará por completo la energía impregnada por consultas anteriores, dejándolo neutralizado y en paz."
    }
  };

  if (lunarModal && lunarModalClose && lunarModalBackdrop) {
    // Abrir modal al hacer clic en las tarjetas de la galería
    lunarCards.forEach(card => {
      card.addEventListener('click', () => {
        const phaseKey = card.getAttribute('data-phase');
        const data = lunarPhasesData[phaseKey];
        if (data) {
          document.getElementById('lunar-modal-img').src = data.image;
          document.getElementById('lunar-modal-img').alt = data.title;
          document.getElementById('lunar-modal-title').textContent = data.title;
          document.getElementById('lunar-modal-subtitle').textContent = data.subtitle;
          document.getElementById('lunar-modal-influence').innerHTML = data.influence;
          document.getElementById('lunar-modal-ritual').innerHTML = data.ritual;
          document.getElementById('lunar-modal-tarot').innerHTML = data.tarot;
          
          lunarModal.classList.remove('hidden');
          lunarModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
        }
      });
    });

    // Cerrar modal
    const closeModal = () => {
      lunarModal.classList.add('hidden');
      lunarModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    lunarModalClose.addEventListener('click', closeModal);
    lunarModalBackdrop.addEventListener('click', closeModal);
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lunarModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // Inicializar Calendario Lunar
  initLunarCalendar();
}

function renderLunarTabDetails(date = selectedLunarDate) {
  const moonPhase = getMoonPhaseDetails(date);
  const moonSign = getMoonSign(date);
  const savedHem = localStorage.getItem('lunar_hemisphere') || 'north';

  // Calculate age and illumination percentage
  const age = (moonPhase.phase * 29.53059).toFixed(1);
  const illumination = Math.round((moonPhase.phase <= 0.5 ? moonPhase.phase * 2 : (1 - moonPhase.phase) * 2) * 100);

  // Invert icons for southern hemisphere if growing/shrinking
  let icon = moonPhase.icon;
  if (savedHem === 'south') {
    if (icon === '🌒') icon = '🌘';
    else if (icon === '🌓') icon = '🌗';
    else if (icon === '🌔') icon = '🌖';
    else if (icon === '🌖') icon = '🌔';
    else if (icon === '🌗') icon = '🌓';
    else if (icon === '🌘') icon = '🌒';
  }

  // Render text content
  const emojiEl = document.getElementById('lunar-tab-emoji');
  const phaseNameEl = document.getElementById('lunar-tab-phase-name');
  const illuminationEl = document.getElementById('lunar-tab-illumination');
  const ageEl = document.getElementById('lunar-tab-age');
  const transitEl = document.getElementById('lunar-tab-transit');
  const angelEl = document.getElementById('lunar-tab-angel');
  const descEl = document.getElementById('lunar-tab-phase-desc');
  const ritualEl = document.getElementById('lunar-tab-ritual');
  const careEl = document.getElementById('lunar-tab-tarot-care');

  if (emojiEl) emojiEl.innerHTML = getMoonSvg(moonPhase.phase, savedHem);
  if (phaseNameEl) phaseNameEl.textContent = moonPhase.phaseName;
  if (illuminationEl) illuminationEl.textContent = `${illumination}%`;
  if (ageEl) ageEl.textContent = `${age} días`;
  if (transitEl) transitEl.textContent = `Luna en ${moonSign}`;
  if (angelEl) {
    const sanitizedSign = getSanitizedSignKey(moonSign);
    angelEl.textContent = ZODIAC_INFO[sanitizedSign] ? ZODIAC_INFO[sanitizedSign].angel : "Gabriel";
  }
  
  if (descEl) {
    let rawDesc = moonPhase.description;
    if (savedHem === 'south' && moonPhase.phaseName !== 'Luna Nueva' && moonPhase.phaseName !== 'Luna Llena') {
      rawDesc += ` <br><br><em>Nota del Hemisferio Sur:</em> Al encontrarte en el hemisferio sur, la apariencia visual de la iluminación está invertida y se desplaza de izquierda a derecha.`;
    }
    descEl.innerHTML = rawDesc;
  }

  // Render rituals and care
  if (ritualEl) {
    ritualEl.innerHTML = LUNAR_RITUALS[moonPhase.phaseName] || "Fase de recarga y meditación.";
  }
  if (careEl) {
    careEl.innerHTML = LUNAR_TAROT_CARE[moonPhase.phaseName] || "Mantén tu mazo protegido.";
  }

  updateLunarTransitPersonalAdvice(date);
}

function updateLunarTransitPersonalAdvice(date = selectedLunarDate) {
  const moonSign = getMoonSign(date);
  const signSelect = document.getElementById('lunar-user-sign-select');
  const adviceBox = document.getElementById('lunar-transit-personal-box');
  
  if (!signSelect || !adviceBox) return;
  
  const userSign = signSelect.value;
  if (!userSign) {
    adviceBox.innerHTML = "Selecciona tu signo zodiacal para recibir tu consejo.";
    return;
  }

  const cleanUserSign = userSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cleanMoonSign = moonSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const userIdx = ZODIAC_SIGNS_LIST.indexOf(cleanUserSign);
  const moonIdx = ZODIAC_SIGNS_LIST.indexOf(cleanMoonSign);

  if (userIdx === -1 || moonIdx === -1) {
    adviceBox.innerHTML = "No se pudo calcular la sintonía astrológica hoy.";
    return;
  }

  const diff = (userIdx - moonIdx + 12) % 12;
  let aspectTitle = "";
  let aspectDesc = "";

  const isToday = new Date().toDateString() === date.toDateString();
  const aspectComplement = isToday ? "hoy" : "este día";

  if (diff === 0) {
    aspectTitle = "Conjunción (Mismo Signo)";
    aspectDesc = `La Luna transita ${aspectComplement} por tu propio signo natal. Es un día de alta sensibilidad emocional y gran lucidez interna. Tus deseos íntimos y tu mente consciente están en perfecta armonía. Excelente momento para escucharte a ti mismo y meditar.`;
  } else if (diff === 4 || diff === 8) {
    aspectTitle = "Trígono (Armonía Elemental)";
    aspectDesc = `La Luna transita por un signo de tu mismo elemento. Las emociones fluyen de manera natural y sin resistencia. Sentirás paz, optimismo y gran facilidad para expresarte. Es un período idóneo para la creatividad, la lectura del tarot y proyectos artísticos.`;
  } else if (diff === 2 || diff === 10) {
    aspectTitle = "Sextil (Sintonía Amigable)";
    aspectDesc = `La Luna se encuentra en un signo compatible y afín con tu elemento. Se estimula la comunicación afectiva y el entendimiento con los demás. Las oportunidades prácticas surgen ${aspectComplement} a través de conversaciones sinceras y encuentros con personas queridas.`;
  } else if (diff === 6) {
    aspectTitle = "Oposición (Tensión Polar)";
    aspectDesc = `La Luna está ${aspectComplement} en tu signo opuesto complementario. Tus sentimientos íntimos y tus deseos del ego externo pueden entrar en contradicción o verse reflejados con gran intensidad en los demás. Busca la conciliación, respira hondo y evita discusiones precipitadas.`;
  } else if (diff === 3 || diff === 9) {
    aspectTitle = "Cuadratura (Desafío Dinámico)";
    aspectDesc = `La Luna se sitúa en un signo que genera tensión con tu naturaleza cardinal. Puedes sentir impaciencia, bloqueos emocionales o incomodidad con las exigencias del entorno. El oráculo te aconseja ser flexible, descansar más y no tomarte las tensiones de forma personal ${aspectComplement}.`;
  } else {
    aspectTitle = "Ajuste y Reorganización (Inconjunción)";
    aspectDesc = `La Luna transita por un signo disonante o neutro con tu energía. Podrías percibir una ligera incomodidad emocional o cansancio físico inexplicable. Es un día ideal para ir despacio, reorganizar tus prioridades y no sobrecargarte de responsabilidades o dramas ajenos.`;
  }

  adviceBox.innerHTML = `
    <strong>Sintonía Lunar: ${aspectTitle}</strong><br>
    <p style="margin-top: 0.5rem; font-size: 0.95rem; line-height: 1.5; color: var(--text-main);">${aspectDesc}</p>
  `;
}

function initLunarCalendar() {
  const grid = document.getElementById('lunar-calendar-grid');
  const monthYearEl = document.getElementById('lunar-cal-month-year');
  const prevBtn = document.getElementById('lunar-cal-prev');
  const nextBtn = document.getElementById('lunar-cal-next');
  
  if (!grid || !monthYearEl || !prevBtn || !nextBtn) return;
  
  if (!grid.dataset.initialized) {
    grid.dataset.initialized = 'true';
    
    prevBtn.addEventListener('click', () => {
      lunarCalendarMonth--;
      if (lunarCalendarMonth < 0) {
        lunarCalendarMonth = 11;
        lunarCalendarYear--;
      }
      renderLunarCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
      lunarCalendarMonth++;
      if (lunarCalendarMonth > 11) {
        lunarCalendarMonth = 0;
        lunarCalendarYear++;
      }
      renderLunarCalendar();
    });
    
    const backToTodayBtn = document.getElementById('lunar-back-to-today-btn');
    if (backToTodayBtn) {
      backToTodayBtn.addEventListener('click', () => {
        selectedLunarDate = new Date();
        lunarCalendarMonth = selectedLunarDate.getMonth();
        lunarCalendarYear = selectedLunarDate.getFullYear();
        
        // Reset input value to today
        const searchDateInput = document.getElementById('lunar-search-date');
        if (searchDateInput) {
          searchDateInput.value = selectedLunarDate.toLocaleDateString('sv');
        }
        
        renderLunarCalendar();
        renderLunarTabDetails(selectedLunarDate);
        
        const indicator = document.getElementById('lunar-selected-date-indicator');
        if (indicator) indicator.classList.add('hidden');
        
        const titleEl = document.getElementById('lunar-clima-title');
        if (titleEl) titleEl.textContent = "La Influencia Lumínica de Hoy";
      });
    }
  }
  
  renderLunarCalendar();
}

function renderLunarCalendar() {
  const grid = document.getElementById('lunar-calendar-grid');
  const monthYearEl = document.getElementById('lunar-cal-month-year');
  if (!grid || !monthYearEl) return;
  
  grid.innerHTML = '';
  
  const MONTHS_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthYearEl.textContent = `${MONTHS_NAMES[lunarCalendarMonth]} ${lunarCalendarYear}`;
  
  const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  WEEKDAYS.forEach(day => {
    const div = document.createElement('div');
    div.className = 'lunar-cal-header';
    div.textContent = day;
    grid.appendChild(div);
  });
  
  const firstDay = new Date(lunarCalendarYear, lunarCalendarMonth, 1).getDay();
  const startOffset = (firstDay + 6) % 7; 
  
  const daysInMonth = new Date(lunarCalendarYear, lunarCalendarMonth + 1, 0).getDate();
  
  for (let i = 0; i < startOffset; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'lunar-cal-day empty';
    grid.appendChild(emptyDiv);
  }
  
  const today = new Date();
  const savedHem = localStorage.getItem('lunar_hemisphere') || 'north';
  
  for (let d = 1; d <= daysInMonth; d++) {
    const dateOfCell = new Date(lunarCalendarYear, lunarCalendarMonth, d);
    const moonPhase = getMoonPhaseDetails(dateOfCell);
    
    const div = document.createElement('div');
    div.className = 'lunar-cal-day';
    
    const isToday = dateOfCell.getDate() === today.getDate() && 
                    dateOfCell.getMonth() === today.getMonth() && 
                    dateOfCell.getFullYear() === today.getFullYear();
                    
    const isSelected = dateOfCell.getDate() === selectedLunarDate.getDate() && 
                       dateOfCell.getMonth() === selectedLunarDate.getMonth() && 
                       dateOfCell.getFullYear() === selectedLunarDate.getFullYear();
                       
    if (isToday) div.classList.add('today');
    if (isSelected) div.classList.add('selected-day');
    
    div.innerHTML = `
      <span class="lunar-cal-day-num">${d}</span>
      <div class="lunar-cal-day-moon" title="${moonPhase.phaseName}">
        ${getMoonSvg(moonPhase.phase, savedHem)}
      </div>
    `;
    
    div.addEventListener('click', () => {
      selectedLunarDate = dateOfCell;
      
      const selectedPrev = grid.querySelector('.lunar-cal-day.selected-day');
      if (selectedPrev) selectedPrev.classList.remove('selected-day');
      div.classList.add('selected-day');
      
      renderLunarTabDetails(selectedLunarDate);
      
      const indicator = document.getElementById('lunar-selected-date-indicator');
      const textEl = document.getElementById('lunar-selected-date-text');
      const titleEl = document.getElementById('lunar-clima-title');
      
      if (indicator && textEl && titleEl) {
        if (isToday) {
          indicator.classList.add('hidden');
          titleEl.textContent = "La Influencia Lumínica de Hoy";
        } else {
          indicator.classList.remove('hidden');
          const dayFormatted = d.toString().padStart(2, '0');
          const monthFormatted = (lunarCalendarMonth + 1).toString().padStart(2, '0');
          textEl.textContent = `Viendo: ${dayFormatted}/${monthFormatted}/${lunarCalendarYear}`;
          titleEl.textContent = "La Influencia Lumínica Elegida";
        }
      }
    });
    
    grid.appendChild(div);
  }
}

/* ==========================================================================
   Carta del Día Express Lógica
   ========================================================================== */
function initDailyExpressCard() {
  const expressCard = document.getElementById('daily-express-card');
  const expressCardFront = document.getElementById('daily-express-card-front');
  const expressInfo = document.getElementById('daily-express-info');
  const expressInstructions = document.getElementById('daily-express-instructions');
  const expressName = document.getElementById('daily-express-name');
  const expressAdvice = document.getElementById('daily-express-advice');
  const expressRedraw = document.getElementById('daily-express-redraw');

  if (!expressCard) return;

  const todayStr = new Date().toLocaleDateString('sv'); // Formato YYYY-MM-DD
  let state = null;

  // Cargar estado de localStorage
  try {
    const saved = localStorage.getItem('tarot_daily_express');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === todayStr) {
        state = parsed;
      }
    }
  } catch (e) {
    console.error("Error al cargar tarot_daily_express:", e);
  }

  // Si no hay estado para hoy, generar uno
  if (!state) {
    state = generateDailyExpressState(todayStr);
  }

  // Renderizar según el estado actual
  renderExpressCardState(state);
  apply3DTilt(expressCard);

  // Evento al pulsar la carta
  expressCard.addEventListener('click', () => {
    if (state.flipped) return;
    
    state.flipped = true;
    saveDailyExpressState(state);
    
    // Animación de voltear y mostrar el consejo
    expressCard.classList.add('flipped');
    
    setTimeout(() => {
      showExpressAdvice(state);
    }, 300);
  });

  // Evento para obtener otra carta
  if (expressRedraw) {
    expressRedraw.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar que el clic en el botón active el volteo de la carta
      
      // Animación de voltear al reverso primero
      expressCard.classList.remove('flipped');
      expressInfo.classList.add('hidden');
      expressInstructions.classList.remove('hidden');
      
      setTimeout(() => {
        // Generar un estado totalmente nuevo (ignora la consistencia del día al barajar a mano)
        state = generateDailyExpressState(todayStr, true);
        renderExpressCardState(state);
      }, 300);
    });
  }

  function generateDailyExpressState(dateStr, forceRandom = false) {
    let cardId;
    
    if (forceRandom) {
      cardId = Math.floor(Math.random() * 22);
    } else {
      // Usar la fecha como semilla para consistencia
      let seed = 0;
      for (let i = 0; i < dateStr.length; i++) {
        seed += dateStr.charCodeAt(i);
      }
      cardId = seed % 22;
    }
    
    const isReversed = (Math.random() < 0.2); // 20% de probabilidad de salir invertida
    
    const newState = {
      date: dateStr,
      cardId: cardId,
      isReversed: isReversed,
      flipped: false
    };
    
    saveDailyExpressState(newState);
    return newState;
  }

  function saveDailyExpressState(s) {
    try {
      localStorage.setItem('tarot_daily_express', JSON.stringify(s));
    } catch (e) {
      console.error("Error al guardar tarot_daily_express:", e);
    }
  }

  function renderExpressCardState(s) {
    // Poner el fondo correspondiente en el front de la carta
    if (expressCardFront) {
      expressCardFront.style.backgroundImage = `url('assets/card_${s.cardId}.jpg')`;
    }
    
    // Configurar si está invertida
    if (s.isReversed) {
      expressCard.classList.add('reversed');
    } else {
      expressCard.classList.remove('reversed');
    }

    if (s.flipped) {
      expressCard.classList.add('flipped');
      showExpressAdvice(s);
    } else {
      expressCard.classList.remove('flipped');
      expressInfo.classList.add('hidden');
      expressInstructions.classList.remove('hidden');
    }
  }

  function showExpressAdvice(s) {
    const card = window.tarotDb.find(c => c.id === s.cardId);
    if (!card) return;

    expressName.textContent = card.name + (s.isReversed ? " \u2014 Energía Invertida" : " \u2014 Luz al Derecho");
    
    let adviceText = "";
    if (s.isReversed) {
      adviceText = `<strong>✨ Vibraciones en Sombra hoy:</strong> <em>${card.keyThemes}</em><br><br><strong>✦ El eco del oráculo te dice:</strong> ${card.reversed.general}`;
    } else {
      adviceText = `<strong>✨ La energía que te acompaña hoy:</strong> <em>${card.keyThemes}</em><br><br><strong>✦ El eco del oráculo te dice:</strong> ${card.meanings.general}`;
    }
    
    expressAdvice.innerHTML = adviceText;
    
    expressInstructions.classList.add('hidden');
    expressInfo.classList.remove('hidden');
  }
}

// Start lunar tab initialization after all constants are declared
initLunarTab();
initDailyExpressCard();

// --- Observador de Mutaciones Global para gestionar el volteo de cartas fluidamente ---
const cardFlipObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const cardWrapper = mutation.target;
      if (cardWrapper.classList.contains('card-wrapper')) {
        const wasFlipped = mutation.oldValue && mutation.oldValue.split(' ').includes('flipped');
        const isFlipped = cardWrapper.classList.contains('flipped');

        if (wasFlipped !== isFlipped) {
          const inner = cardWrapper.querySelector('.card-inner');
          if (inner) {
            // Añadir clase temporal para bloquear los eventos de mousemove tilt
            cardWrapper.classList.add('flipping');
            
            // Limpiar estilos inline para que la transición CSS pura de .card-inner tome el control
            inner.style.transform = '';
            inner.style.transition = '';

            // Volver a permitir el tilt una vez termine la transición (850ms)
            setTimeout(() => {
              cardWrapper.classList.remove('flipping');
            }, 850);
          }
        }
      }
    }
  });
});

// Comenzar a observar los cambios de clase en todos los descendientes del body
cardFlipObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ['class'],
  subtree: true,
  attributeOldValue: true
});

/* ==========================================================================
   MEJORA 4: Pregunta Guiada — Sugerencias por categoría
   ========================================================================== */
(function initGuidedQuestions() {
  const categorySelect = document.getElementById('category-select');
  const panel = document.getElementById('guided-questions-panel');
  const questionInput = document.getElementById('question-input');
  if (!categorySelect || !panel || !questionInput) return;

  const suggestions = {
    general: [
      '¿Qué energía rige mi camino en este momento?',
      '¿Qué necesito ver con más claridad en mi vida?',
      '¿Cuál es el próximo paso que debo dar?',
      '¿Qué lección de vida estoy atravesando ahora?'
    ],
    love: [
      '¿Qué puedo hacer para mejorar mi relación de pareja?',
      '¿Qué siente esta persona por mí?',
      '¿Qué necesito soltar para atraer el amor que merezco?',
      '¿Cómo puedo conectar más profundamente con mi pareja?'
    ],
    work: [
      '¿Qué energía atrae la prosperidad a mi vida ahora?',
      '¿Cuál es el bloqueo que frena mi crecimiento profesional?',
      '¿Es este proyecto o empleo lo que mi alma necesita?',
      '¿Qué talento debo potenciar para alcanzar mis metas?'
    ],
    health: [
      '¿Qué área de mi bienestar necesita más atención?',
      '¿Qué hábito o emoción está afectando mi salud?',
      '¿Cómo puedo recuperar mi vitalidad y equilibrio?',
      '¿Qué mensaje me envía mi cuerpo en este momento?'
    ]
  };

  function renderSuggestions(cat) {
    const list = suggestions[cat] || suggestions.general;
    panel.innerHTML = `<p class="guided-q-title">✨ Sugerencias de preguntas:</p>`;
    list.forEach(q => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'guided-q-chip';
      btn.textContent = q;
      btn.addEventListener('click', () => {
        questionInput.value = q;
        questionInput.dispatchEvent(new Event('input'));
      });
      panel.appendChild(btn);
    });
    panel.classList.add('visible');
  }

  categorySelect.addEventListener('change', () => {
    renderSuggestions(categorySelect.value);
  });

  // Show on focus of question input
  questionInput.addEventListener('focus', () => {
    if (!questionInput.value.trim()) renderSuggestions(categorySelect.value);
  });

  questionInput.addEventListener('input', () => {
    if (questionInput.value.trim()) {
      panel.classList.remove('visible');
    }
  });
})();

/* ==========================================================================
   MEJORA 1: Daily Card — Lectura Completa con Afirmación + Ritual
   ========================================================================== */
(function enhanceDailyCard() {
  const affirmations = {
    0:  'Hoy me lanzo al vacío con confianza. El universo me sostiene.',
    1:  'Tengo el poder de manifestar todo lo que mi mente crea.',
    2:  'Mi intuición es mi guía más sabia. La escucho en silencio.',
    3:  'La abundancia fluye hacia mí de forma natural y amorosa.',
    4:  'Lidero mi vida desde la fuerza y la claridad interior.',
    5:  'Me abro a la sabiduría que el universo tiene para mí hoy.',
    6:  'Elijo el amor. Elijo la conexión. Elijo el corazón.',
    7:  'Avanzo con determinación hacia mis metas más elevadas.',
    8:  'Tengo fuerza para enfrentar cualquier desafío con gracia.',
    9:  'La soledad no me asusta: en ella encuentro mi verdad.',
    10: 'Los ciclos cambian y yo confío en el fluir de la rueda.',
    11: 'Actúo con integridad. El equilibrio es mi estado natural.',
    12: 'Pauso, observo y dejo que el universo revele su plan.',
    13: 'Dejo ir lo viejo sin miedo. La renovación ya está aquí.',
    14: 'La paciencia y la templanza son mis aliadas hoy.',
    15: 'Reconozco mis sombras y las transformo en sabiduría.',
    16: 'Lo que se rompe hoy abre paso a algo más verdadero.',
    17: 'La esperanza brilla en mí. El futuro es luminoso y bello.',
    18: 'Confío en mis sueños. La intuición me guía en la noche.',
    19: 'Me permito brillar. La alegría es mi verdadera naturaleza.',
    20: 'Escucho el llamado de mi alma y respondo con valentía.',
    21: 'He llegado. Celebro mis logros y me abro a lo que sigue.'
  };

  const rituals = {
    0:  'Da un pequeño paso hoy hacia algo que aún no has intentado. Anota en un papel qué te da miedo y luego quémalo simbólicamente.',
    1:  'Enciende una vela amarilla o naranja. Visualiza tu intención más poderosa y escríbela tres veces como si ya fuera realidad.',
    2:  'Dedica 10 minutos al silencio total. Pon tu mano en el corazón y pregúntate: ¿qué siento pero no me permito escuchar?',
    3:  'Lleva flores, fruta o algo hermoso a tu espacio hoy. Activa la energía de Venus agradeciendo tres cosas que tienes.',
    4:  'Organiza un espacio de tu vida que necesita estructura. Cada acción ordenada invoca la energía del Emperador.',
    5:  'Lee algo que te inspire espiritualmente o habla con alguien de mayor experiencia. Busca un mentor o maestro simbólico.',
    6:  'Escribe una carta de amor... a ti mismo. Menciona tres cosas que te gustan de quien eres hoy.',
    7:  'Establece una meta concreta para esta semana y el primer paso que darás hoy. La claridad atrae la victoria.',
    8:  'Haz ejercicio físico o una actividad que te dé sensación de fuerza. El cuerpo es el templo de tu poder interior.',
    9:  'Busca un momento de soledad consciente en la naturaleza. Camina lento, observa y agradece.',
    10: 'Escribe en papel qué ciclo sientes que está cerrando y qué deseas iniciar. Luego coloca el papel bajo una vela.',
    11: 'Examina una decisión pendiente con imparcialidad. Lista pros y contras y confía en tu criterio interno.',
    12: 'Haz una pausa voluntaria en un área donde llevas mucho tiempo esforzándote. A veces rendirse es sabiduría.',
    13: 'Libera un objeto, hábito o emoción que ya no te sirve. Regálalo, deshazte de él o simplemente di "gracias y adiós".',
    14: 'Bebe agua lentamente y con consciencia. Mezcla actividades: el arte y lo práctico. La moderación es magia.',
    15: 'Observa sin juzgar un patrón que sabes que repites. La consciencia ya es el inicio de la libertad.',
    16: 'Acepta que algo en tu vida está cambiando sin que tú lo controles. Escribe qué te liberaría si dejases de aferrarte.',
    17: 'Mira el cielo esta noche o pon fotos de estrellas cerca. Escribe tres deseos genuinos del corazón.',
    18: 'Antes de dormir, registra tus sueños en un cuaderno de luna. La luna te habla cuando te rindes.',
    19: 'Sal al sol si puedes. Ríe, canta o baila aunque sea un minuto. La alegría es la vibración más alta.',
    20: 'Escucha música que te mueva el alma. Pregúntate: ¿cuál es mi llamado más profundo? Anota lo primero que surja.',
    21: 'Celebra algo que hayas logrado. Incluso lo pequeño merece reconocimiento. Honra tu camino recorrido.'
  };

  // Override showExpressAdvice to add full reading
  const originalInit = window.initDailyExpressCardOverride;
  
  // We patch the showExpressAdvice function by watching for the info panel reveal
  const observer = new MutationObserver(() => {
    const info = document.getElementById('daily-express-info');
    const adviceEl = document.getElementById('daily-express-advice');
    const badgesEl = document.getElementById('daily-express-badges');
    const affirmEl = document.getElementById('daily-affirmation');
    const ritualEl = document.getElementById('daily-ritual-text');
    if (!info || !adviceEl || info.classList.contains('hidden')) return;
    
    // Find current card from the express state
    try {
      const saved = localStorage.getItem('tarot_daily_express');
      if (!saved) return;
      const state = JSON.parse(saved);
      const card = window.tarotDb.find(c => c.id === state.cardId);
      if (!card) return;
      
      // Populate badges
      if (badgesEl && badgesEl.children.length === 0) {
        const astro = ASTRO_MAP[card.id];
        const badges = [
          { icon: '🌟', label: 'Arcano ' + card.id },
          { icon: astro ? astro.symbol : '✦', label: astro ? astro.ruler : 'Cosmos' },
          { icon: '🔑', label: card.keyThemes }
        ];
        badges.forEach(b => {
          const span = document.createElement('span');
          span.className = 'daily-archetype-badge';
          span.textContent = `${b.icon} ${b.label}`;
          badgesEl.appendChild(span);
        });
      }
      
      // Populate affirmation
      if (affirmEl && !affirmEl.textContent.trim()) {
        affirmEl.textContent = affirmations[card.id] || affirmations[0];
      }
      
      // Populate ritual
      if (ritualEl && !ritualEl.textContent.trim()) {
        ritualEl.textContent = rituals[card.id] || rituals[0];
      }
    } catch(e) { /* silent */ }
  });
  
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

  // Also init yearly spread and natal card when daily tab opens
  const dailyTab = document.querySelector('[data-tab="daily"]');
  if (dailyTab) {
    dailyTab.addEventListener('click', () => {
      setTimeout(() => {
        initYearlySpread();
        initNatalCard();
      }, 100);
    });
  }
  // Init on load too
  setTimeout(() => {
    initYearlySpread();
    initNatalCard();
  }, 500);
})();

/* ==========================================================================
   MEJORA 5: Tirada de 12 Meses
   ========================================================================== */
function initYearlySpread(force = false) {
  const grid = document.getElementById('yearly-spread-grid');
  if (!grid) return;
  if (!force && grid.children.length > 0) return;

  grid.innerHTML = '';

  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const currentMonth = new Date().getMonth(); // 0-indexed
  const currentYear = new Date().getFullYear();

  const savedDate = localStorage.getItem('user_birthdate');
  let birthSeed = 0;
  let isPersonalized = false;

  if (savedDate) {
    const digits = savedDate.replace(/-/g, '').split('').map(Number);
    birthSeed = digits.reduce((a, b) => a + b, 0);
    isPersonalized = true;
  }

  // Set up personalization tip banner
  let tipEl = document.getElementById('yearly-spread-tip');
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.id = 'yearly-spread-tip';
    tipEl.style.cssText = 'text-align: center; margin-bottom: 1.5rem; padding: 0.85rem 1.25rem; border-radius: 12px; font-size: 0.9rem; line-height: 1.5; transition: all 0.3s ease;';
    grid.parentNode.insertBefore(tipEl, grid);
  }

  if (isPersonalized) {
    const [y, m, d] = savedDate.split('-');
    tipEl.style.background = 'rgba(229, 193, 88, 0.08)';
    tipEl.style.border = '1px solid rgba(229, 193, 88, 0.3)';
    tipEl.style.color = 'var(--gold-color)';
    tipEl.innerHTML = `✨ <strong>Sintonía Astral Activa:</strong> Tu Tirada del Año se ha personalizado con la vibración de tu nacimiento (<strong>${d}/${m}/${y}</strong>).`;
  } else {
    tipEl.style.background = 'rgba(139, 92, 246, 0.06)';
    tipEl.style.border = '1px solid rgba(139, 92, 246, 0.2)';
    tipEl.style.color = 'var(--text-muted)';
    tipEl.innerHTML = `🔮 <strong>Tirada Colectiva:</strong> Esta tirada muestra la energía general del año. Introduce tu fecha de nacimiento en el apartado de <strong>Arcano Natal</strong> para sintonizar tu vibración única.`;
  }

  // Generate cards
  const yearSeed = currentYear * 100 + birthSeed;
  
  MONTHS.forEach((monthName, idx) => {
    const seed = (yearSeed + idx * 7 + 13) % 22;
    const cardId = seed;
    const isReversed = ((yearSeed + idx * 3 + 5) % 7) === 0; // ~14% reversed
    const card = window.tarotDb.find(c => c.id === cardId);
    if (!card) return;
    
    const isCurrentMonth = idx === currentMonth;
    const meaning = isReversed ? card.reversed.general : card.meanings.general;
    const shortMeaning = meaning.length > 80 ? meaning.substring(0, 77) + '...' : meaning;
    
    const div = document.createElement('div');
    div.className = `yearly-month-card${isCurrentMonth ? ' current-month' : ''}`;
    div.innerHTML = `
      ${isCurrentMonth ? '<span class="yearly-current-badge">HOY</span>' : ''}
      <span class="yearly-month-label">${monthName} ${currentYear}</span>
      <div class="yearly-month-mini-card${isReversed ? ' reversed' : ''}" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      <div class="yearly-month-card-name">${card.name}${isReversed ? ' ↓' : ''}</div>
      <div class="yearly-month-card-msg">${shortMeaning}</div>
    `;
    
    // Click to show full reading for the month
    div.addEventListener('click', () => showMonthReading(monthName, currentYear, card, isReversed));
    grid.appendChild(div);
  });
}

function showMonthReading(monthName, year, card, isReversed) {
  const meaning = isReversed ? card.reversed.general : card.meanings.general;
  const astro = ASTRO_MAP[card.id] || { ruler: 'Cosmos', symbol: '✦', keywords: 'Fuerza universal' };
  
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(6,5,15,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);animation:tabFadeIn 0.25s ease;';
  modal.innerHTML = `
    <div style="background:rgba(13,11,26,0.98);border:1px solid rgba(229,193,88,0.3);border-radius:20px;padding:2.5rem;max-width:520px;width:90%;position:relative;box-shadow:0 0 60px rgba(139,92,246,0.2);">
      <button style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;line-height:1;" onclick="this.closest('[style]').remove()">×</button>
      <p style="font-size:0.8rem;color:var(--gold-color);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.5rem;">${monthName} ${year}</p>
      <h3 style="font-family:var(--font-serif);font-size:1.5rem;margin-bottom:1.25rem;">${card.name}${isReversed ? ' — Energía Invertida' : ''}</h3>
      <div style="display:flex;gap:1.25rem;align-items:flex-start;">
        <div style="width:90px;flex-shrink:0;aspect-ratio:2/3.3;background-image:url('assets/card_${card.id}.jpg');background-size:cover;border-radius:8px;transform:${isReversed ? 'rotate(180deg)' : 'none'};box-shadow:0 0 20px rgba(229,193,88,0.2);"></div>
        <div>
          <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.35rem;">${astro.symbol} ${astro.ruler} · ${astro.keywords}</p>
          <p style="font-size:0.92rem;line-height:1.7;color:var(--text-main);">${meaning}</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

/* ==========================================================================
   MEJORA 6: Carta Natal Personal
   ========================================================================== */
function initNatalCard() {
  const btn = document.getElementById('natal-reveal-btn');
  const result = document.getElementById('natal-card-result');
  if (!btn || result.dataset.initialized) return;
  result.dataset.initialized = 'true';

  btn.addEventListener('click', (e) => {
    const input = document.getElementById('natal-birthdate');
    if (!input || !input.value) {
      input.style.borderColor = 'var(--error-color)';
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
      return;
    }
    
    localStorage.setItem('user_birthdate', input.value);
    initYearlySpread(true);
    
    const [year, month, day] = input.value.split('-').map(Number);
    // Calculate life path number
    const digits = `${day}${month}${year}`.split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 22 || (sum > 9 && sum !== 11 && sum !== 22)) {
      sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    let arcanoNum = sum;
    if (arcanoNum === 0) arcanoNum = 22; // map to 22 = The World as 0
    if (arcanoNum > 21) arcanoNum = arcanoNum % 22;
    
    const card = window.tarotDb.find(c => c.id === arcanoNum);
    if (!card) return;
    
    const astro = ASTRO_MAP[card.id] || { ruler: 'Cosmos', symbol: '✦', keywords: 'Fuerza universal' };
    
    const natalDescs = {
      0:  'El Loco como carta natal te convierte en un alma libre, pionera e innovadora. Tu misión es explorar sin límites y enseñar a otros la belleza del salto al vacío.',
      1:  'El Mago natal habla de un poder manifestador extraordinario. Eres alguien con la capacidad de transformar ideas en realidad mediante tu voluntad y enfoque.',
      2:  'La Sacerdotisa natal indica una persona profundamente intuitiva, conectada con lo invisible. Tu sabiduría viene del silencio, la pausa y la escucha interior.',
      3:  'La Emperatriz natal te dota de creatividad, sensualidad y magnetismo natural. Eres un ser de abundancia llamado a nutrir y hacer florecer todo lo que tocas.',
      4:  'El Emperador natal te da una estructura interna poderosa. Eres alguien que necesita poner orden para crecer y tiene el don de construir imperios con paciencia.',
      5:  'El Papa natal indica un alma buscadora de sentido, tradición y guía espiritual. Tu vida se enriquece cuando compartes tu sabiduría y aprendes de grandes maestros.',
      6:  'Los Enamorados natal hablan de una persona cuya mayor misión es aprender a elegir desde el corazón. Tus relaciones son el espejo más claro de tu evolución.',
      7:  'El Carro natal te impulsa hacia adelante con una determinación innata. Eres alguien que vence obstáculos y se mueve con propósito hacia sus metas.',
      8:  'La Justicia natal indica un alma que busca el equilibrio y la verdad en todo. Tienes un sentido natural de la ética y estás llamado a restaurar la armonía.',
      9:  'El Ermitaño natal señala un alma sabia y reflexiva que necesita períodos de soledad para brillar. Tu profundidad interior es un faro para los que te rodean.',
      10: 'La Rueda natal habla de una vida dinámica y cambiante. Eres una persona destinada a vivir múltiples ciclos y extraer sabiduría de cada giro de la rueda.',
      11: 'La Fuerza natal indica una persona con un poder interior inmenso, especialmente emocional. Eres capaz de domar fieras internas con amor y paciencia.',
      12: 'El Colgado natal habla de un alma que aprende a través de la entrega y la espera. Tienes el don de ver lo que otros no ven cuando suspendes el juicio.',
      13: 'La Muerte natal no es un presagio oscuro sino una señal de profunda capacidad de transformación. Renaces una y otra vez más sabio, más auténtico.',
      14: 'La Templanza natal te dona el don de la moderación, la síntesis y la sanación. Eres un alquimista natural que armoniza opuestos con maestría.',
      15: 'El Diablo natal invita a confrontar las cadenas que tú mismo has creado. Tu misión es transformar la materia en espíritu y liberarte de patrones limitantes.',
      16: 'La Torre natal habla de una vida marcada por momentos de ruptura liberadora. Cada crisis te revela una verdad más profunda y te acerca a lo esencial.',
      17: 'La Estrella natal te dona una fe inquebrantable y un magnetismo especial. Eres una persona que inspira esperanza en los demás con solo estar presente.',
      18: 'La Luna natal indica una psique profunda y sensible, llena de sueños y simbolismo. Tu mundo interior es rico e infinito y tus sueños son mensajes del alma.',
      19: 'El Sol natal te dona vitalidad, claridad y una energía radiante que ilumina las vidas a tu alrededor. Tu camino es brillar sin disculpas.',
      20: 'El Juicio natal te llama a escuchar tu vocación más profunda. Es una vida de despertar, de responder al llamado del alma con valentía.',
      21: 'El Mundo natal indica una persona que ha alcanzado o alcanzará la maestría en esta vida. Eres un alma completa, viajera de dimensiones y reinos.'
    };
    
    document.getElementById('natal-card-img').style.backgroundImage = `url('assets/card_${card.id}.jpg')`;
    document.getElementById('natal-life-number').textContent = `Arcano ${arcanoNum}`;
    document.getElementById('natal-card-name').textContent = card.name;
    document.getElementById('natal-card-desc').textContent = natalDescs[card.id] || card.meanings.general;
    
    const pillsEl = document.getElementById('natal-pills');
    pillsEl.innerHTML = `
      <span class="natal-num-pill">${astro.symbol} ${astro.ruler}</span>
      <span class="natal-num-pill">🔑 ${card.keyThemes}</span>
      <span class="natal-num-pill">⚡ ${astro.keywords}</span>
    `;
    
    result.classList.remove('hidden');
    if (e && e.isTrusted) {
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Load saved birthdate and auto-calculate
  const savedDate = localStorage.getItem('user_birthdate');
  if (savedDate) {
    const input = document.getElementById('natal-birthdate');
    if (input) {
      input.value = savedDate;
      btn.click();
    }
  }
}

/* ==========================================================================
   MEJORA 2: Compartir Lectura
   ========================================================================== */
(function initShareReading() {
  const shareBtn = document.getElementById('share-reading-btn');
  const toast = document.getElementById('share-toast');
  if (!shareBtn || !toast) return;

  shareBtn.addEventListener('click', () => {
    // Build shareable text from current reading
    const question = document.getElementById('result-question-text')?.textContent || '';
    const category = document.getElementById('result-category-badge')?.textContent || '';
    const synthesisEl = document.getElementById('destiny-synthesis-text');
    const synthesisText = synthesisEl ? synthesisEl.innerText : '';
    
    const cardEls = document.querySelectorAll('#cards-board .card-wrapper.flipped');
    const cardNames = [...cardEls].map(el => {
      const front = el.querySelector('.card-front');
      const label = el.querySelector('.placeholder-label');
      return label ? label.textContent.trim() : '';
    }).filter(Boolean);
    
    let text = `✨ El Eco de las Estrellas — Mi lectura del ${new Date().toLocaleDateString('es-ES')}\n\n`;
    text += `📍 Categoría: ${category}\n`;
    text += `❓ Pregunta: ${question}\n\n`;
    if (synthesisText) {
      text += `🔮 Síntesis del Oráculo:\n${synthesisText.substring(0, 600)}${synthesisText.length > 600 ? '...' : ''}\n\n`;
    }
    text += `🃏 Descubre tu lectura en El Eco de las Estrellas`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showShareToast());
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showShareToast();
    }
  });

  function showShareToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
})();

/* ==========================================================================
   MEJORA 7: Grimorio — Filtros por grupo y vista lista/cuadrícula
   ========================================================================== */
(function initBookFilters() {
  // Element map by arcano id → element (Fire/Earth/Air/Water)
  const elementMap = {
    0: 'air', 1: 'air', 2: 'water', 3: 'earth', 4: 'fire',
    5: 'earth', 6: 'air', 7: 'water', 8: 'fire', 9: 'earth',
    10: 'fire', 11: 'fire', 12: 'water', 13: 'water', 14: 'fire',
    15: 'earth', 16: 'fire', 17: 'air', 18: 'water', 19: 'fire',
    20: 'fire', 21: 'earth'
  };

  // Populate ASTRO_MAP and elementMap dynamically for Minor Arcana (cards 22 to 77)
  for (let id = 22; id <= 77; id++) {
    if (id >= 22 && id <= 35) {
      ASTRO_MAP[id] = { ruler: "Elemento Fuego", symbol: "🜂", keywords: "Pasión · Acción · Voluntad", element: "fire" };
      elementMap[id] = 'fire';
    } else if (id >= 36 && id <= 49) {
      ASTRO_MAP[id] = { ruler: "Elemento Agua", symbol: "🜄", keywords: "Emoción · Intuición · Amor", element: "water" };
      elementMap[id] = 'water';
    } else if (id >= 50 && id <= 63) {
      ASTRO_MAP[id] = { ruler: "Elemento Aire", symbol: "🜁", keywords: "Mente · Conflicto · Razón", element: "air" };
      elementMap[id] = 'air';
    } else if (id >= 64 && id <= 77) {
      ASTRO_MAP[id] = { ruler: "Elemento Tierra", symbol: "🜃", keywords: "Materia · Estabilidad · Cuerpo", element: "earth" };
      elementMap[id] = 'earth';
    }
  }

  const filterChips = document.querySelectorAll('.book-filter-chip');
  const viewGridBtn = document.getElementById('book-view-grid');
  const viewListBtn = document.getElementById('book-view-list');
  
  let activeFilter = 'all';
  let activeView = 'grid';

  function applyFilter() {
    const items = document.querySelectorAll('.book-card-item');
    items.forEach(item => {
      const id = parseInt(item.getAttribute('data-id') || item.dataset.id || '0');
      let visible = true;
      
      if (activeFilter === 'mayores') {
        visible = id <= 21;
      } else if (activeFilter === 'menores') {
        visible = id >= 22;
      } else if (['fire','water','earth','air'].includes(activeFilter)) {
        visible = elementMap[id] === activeFilter;
      }
      
      // Also apply search input
      const bookSearch = document.getElementById('book-search');
      if (bookSearch && visible) {
        const term = bookSearch.value.toLowerCase().trim();
        if (term) {
          const name = item.getAttribute('data-name') || '';
          visible = name.includes(term);
        }
      }
      
      item.style.display = visible ? '' : 'none';
    });
  }

  // Expose filter application globally
  window.applyBookFilter = applyFilter;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });

  if (viewGridBtn) {
    viewGridBtn.addEventListener('click', () => {
      const grid = document.getElementById('book-grid');
      if (!grid) return;
      grid.classList.remove('list-view');
      viewGridBtn.classList.add('active');
      if (viewListBtn) viewListBtn.classList.remove('active');
    });
  }

  if (viewListBtn) {
    viewListBtn.addEventListener('click', () => {
      const grid = document.getElementById('book-grid');
      if (!grid) return;
      grid.classList.add('list-view');
      viewListBtn.classList.add('active');
      if (viewGridBtn) viewGridBtn.classList.remove('active');
    });
  }
  
  // Re-apply filter when book tab initializes (lazy)
  const bookTabBtn = document.querySelector('[data-tab="book"]');
  if (bookTabBtn) {
    bookTabBtn.addEventListener('click', () => {
      setTimeout(applyFilter, 300);
    });
  }
})();

/* ==========================================================================
   AJUSTES ASTRALES Y ACCESIBILIDAD (MEJORAS 10, 11, 12, 13)
   ========================================================================== */

// 10. Drawer de Ajustes Astrales
(function initSettingsPanel() {
  const triggerBtn = document.getElementById('astral-settings-btn');
  const panel = document.getElementById('astral-settings-panel');
  const closeBtn = document.getElementById('settings-close-btn');

  if (!triggerBtn || !panel || !closeBtn) return;

  triggerBtn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
  });  const contactBtn = document.getElementById('contact-email-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Evitar que el mailto interrumpa o falle en sistemas sin cliente
      
      const email = 'expondudas@yahoo.com';
      
      // Método de copia compatible con HTTPS (navigator.clipboard) y HTTP (execCommand)
      const executeCopy = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return Promise.resolve();
          } catch (err) {
            document.body.removeChild(textarea);
            return Promise.reject(err);
          }
        }
      };

      executeCopy(email).then(() => {
        const originalText = contactBtn.innerHTML;
        contactBtn.innerHTML = '✉️ ¡Copiado!';
        setTimeout(() => {
          contactBtn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar: ', err);
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('hidden') && 
        !panel.contains(e.target) && 
        !triggerBtn.contains(e.target)) {
      panel.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      panel.classList.add('hidden');
      const onboardingModal = document.getElementById('onboarding-modal');
      if (onboardingModal) onboardingModal.classList.add('hidden');
    }
  });
})();

// 10, 13. Temas, Contraste y Tamaño de Fuente
(function initAccessibilityAndThemes() {
  const btnDark = document.getElementById('theme-dark-btn');
  const btnLight = document.getElementById('theme-light-btn');
  const contrastToggle = document.getElementById('high-contrast-toggle');
  const fontBtns = document.querySelectorAll('.font-btn');

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (btnLight) btnLight.classList.add('active');
      if (btnDark) btnDark.classList.remove('active');
    } else {
      document.body.classList.remove('light-mode');
      if (btnDark) btnDark.classList.add('active');
      if (btnLight) btnLight.classList.remove('active');
    }
    localStorage.setItem('tarot_theme', theme);
  }

  if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
  if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));

  const savedTheme = localStorage.getItem('tarot_theme') || 'dark';
  setTheme(savedTheme);

  function setContrast(isHigh) {
    if (isHigh) {
      document.body.classList.add('high-contrast');
      if (contrastToggle) contrastToggle.checked = true;
    } else {
      document.body.classList.remove('high-contrast');
      if (contrastToggle) contrastToggle.checked = false;
    }
    localStorage.setItem('tarot_contrast', isHigh ? 'high' : 'normal');
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('change', () => {
      setContrast(contrastToggle.checked);
    });
  }

  const savedContrast = localStorage.getItem('tarot_contrast');
  setContrast(savedContrast === 'high');

  function setFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    fontBtns.forEach(btn => {
      if (btn.getAttribute('data-size') === size) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    localStorage.setItem('tarot_font_size', size);
  }

  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.getAttribute('data-size') || 'medium';
      setFontSize(size);
    });
  });

  const savedFontSize = localStorage.getItem('tarot_font_size') || 'medium';
  setFontSize(savedFontSize);
})();

// 12. Audio Ambiente Generativo (Web Audio API)
(function initAmbientAudioSystem() {
  let audio = null;
  const toggle = document.getElementById('audio-toggle');
  const slider = document.getElementById('audio-volume');

  function startAudio() {
    if (!audio) {
      audio = new Audio('assets/ambient_meditation.mp3');
      audio.loop = true;
    }
    const vol = slider ? parseFloat(slider.value) : 0.5;
    audio.volume = vol;
    audio.play().catch(err => {
      console.log("Autoplay bloqueado por políticas del navegador:", err);
      if (toggle) toggle.checked = false;
    });
  }

  function stopAudio() {
    if (audio) {
      audio.pause();
    }
  }

  function updateVolume(vol) {
    if (audio) {
      audio.volume = vol;
    }
  }

  if (toggle && slider) {
    toggle.checked = false;
    
    const savedVol = localStorage.getItem('tarot_volume');
    if (savedVol !== null) {
      slider.value = savedVol;
    }

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        startAudio();
      } else {
        stopAudio();
      }
    });

    slider.addEventListener('input', () => {
      const vol = parseFloat(slider.value);
      updateVolume(vol);
      localStorage.setItem('tarot_volume', vol);
    });
  }
})();

// 11. Modal de Onboarding / Guía
(function initOnboarding() {
  const modal = document.getElementById('onboarding-modal');
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.onboarding-dots .dot');
  const btnPrev = document.getElementById('onboarding-prev-btn');
  const btnNext = document.getElementById('onboarding-next-btn');
  const btnSkip = document.getElementById('onboarding-skip-btn');
  const btnClose = document.getElementById('onboarding-close-btn');
  const checkboxDontShow = document.getElementById('onboarding-dont-show-checkbox');
  const btnReplay = document.getElementById('replay-onboarding-btn');

  if (!modal) return;

  let currentStep = 1;
  const totalSteps = slides.length;

  const tabMapping = {
    1: 'oracle',
    2: 'daily',
    3: 'horoscope',
    4: 'lunar',
    5: 'numerology',
    6: 'book'
  };

  function showStep(step) {
    currentStep = step;
    
    slides.forEach(slide => {
      const slideStep = parseInt(slide.getAttribute('data-step') || '1');
      if (slideStep === step) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step') || '1');
      if (dotStep === step) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (btnPrev) {
      if (step === 1) {
        btnPrev.classList.add('disabled');
        btnPrev.disabled = true;
      } else {
        btnPrev.classList.remove('disabled');
        btnPrev.disabled = false;
      }
    }

    if (btnNext) {
      if (step === totalSteps) {
        btnNext.textContent = 'Comenzar';
      } else {
        btnNext.textContent = 'Siguiente';
      }
    }

    // Cambiar de pestaña programáticamente en segundo plano
    const tabName = tabMapping[step];
    if (tabName) {
      const tabBtn = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
      if (tabBtn) {
        tabBtn.click();
      }
    }
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    } else {
      closeOnboarding();
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  function closeOnboarding() {
    modal.classList.add('hidden');
    if (checkboxDontShow && checkboxDontShow.checked) {
      localStorage.setItem('tarot_onboarding_completed', 'true');
    }
  }

  function openOnboarding() {
    modal.classList.remove('hidden');
    showStep(1);
    if (checkboxDontShow) {
      checkboxDontShow.checked = false;
    }
  }

  if (btnNext) btnNext.addEventListener('click', nextStep);
  if (btnPrev) btnPrev.addEventListener('click', prevStep);
  if (btnSkip) btnSkip.addEventListener('click', closeOnboarding);
  if (btnClose) btnClose.addEventListener('click', closeOnboarding);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.getAttribute('data-step') || '1');
      showStep(step);
    });
  });

  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      const settingsPanel = document.getElementById('astral-settings-panel');
      if (settingsPanel) {
        settingsPanel.classList.add('hidden');
      }
      openOnboarding();
    });
  }

  const isCompleted = localStorage.getItem('tarot_onboarding_completed');
  if (isCompleted !== 'true') {
    setTimeout(openOnboarding, 1200);
  }
})();

/* ==========================================================================
   Sección Legal y Cookies
   ========================================================================== */

const LEGAL_TEXTS = {
  aviso: {
    title: "Aviso Legal",
    content: `
      <p><strong>1. DATOS IDENTIFICATIVOS</strong></p>
      <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), a continuación se reflejan los siguientes datos: el titular de este dominio web es Pablo, con dirección a estos efectos en Barcelona (España) y correo electrónico de contacto: expondudas@yahoo.com.</p>
      <p><strong>2. USUARIOS</strong></p>
      <p>El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
      <p><strong>3. USO DEL PORTAL</strong></p>
      <p>El Eco de las Estrellas proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Pablo o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.</p>
      <p><strong>4. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</strong></p>
      <p>Pablo no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>
      <p>El contenido astrológico y de tarot del portal tiene fines de entretenimiento y ocio. Las lecturas no deben sustituir asesoramiento profesional, médico, psicológico, legal o financiero.</p>
    `
  },
  privacidad: {
    title: "Política de Privacidad",
    content: `
      <p><strong>1. TRATAMIENTO DE DATOS PERSONALES</strong></p>
      <p>En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos que "El Eco de las Estrellas" está diseñado bajo el principio de <strong>Privacidad por Diseño</strong>. Esto significa que nuestra aplicación <strong>no requiere registro de usuario, no recopila nombres, direcciones de correo ni información de pago</strong> para funcionar.</p>
      <p><strong>2. DATOS ALMACENADOS LOCALMENTE</strong></p>
      <p>Toda la información introducida en la web (como tu signo del zodiaco, preferencias de volumen, modo oscuro o datos temporales de las lecturas de tarot) se almacena exclusivamente de forma local en tu propio dispositivo utilizando la tecnología <code>localStorage</code> de tu navegador web. <strong>Nosotros no transferimos, leemos ni almacenamos esta información en nuestros servidores.</strong> Eres dueño absoluto de tus datos y puedes eliminarlos en cualquier momento borrando el historial/datos de tu navegador.</p>
      <p><strong>3. CORREOS DE CONTACTO</strong></p>
      <p>Si decides contactarnos a través del correo electrónico expondudas@yahoo.com, los datos personales que nos facilites (tu email y nombre) serán tratados única y exclusivamente para responder a tu consulta, no siendo cedidos a terceros ni añadidos a listas de marketing sin tu consentimiento explícito.</p>
      <p><strong>4. DERECHOS DEL USUARIO</strong></p>
      <p>Puedes ejercer tus derechos de acceso, rectificación, limitación y suprimir los datos escribiendo a nuestro correo de contacto.</p>
    `
  },
  cookies: {
    title: "Política de Cookies",
    content: `
      <p><strong>¿Qué son las cookies?</strong></p>
      <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>
      <p><strong>¿Qué tipos de cookies utiliza esta página web?</strong></p>
      <ul>
        <li><strong>Cookies técnicas y de personalización (Propias):</strong> Utilizamos <code>localStorage</code> (una tecnología similar a las cookies) para recordar tus preferencias de interfaz (modo noche, tamaño de texto, volumen de la música) y el estado de la guía interactiva. Estas cookies son necesarias para el correcto funcionamiento estético y técnico de la web.</li>
        <li><strong>Cookies de análisis o publicidad (De terceros):</strong> Actualmente o en el futuro, podríamos integrar servicios de publicidad de terceros (redes publicitarias). Estos terceros podrían instalar cookies en tu dispositivo para analizar el tráfico o mostrarte anuncios personalizados basados en tu navegación. Puedes aceptar o rechazar estas cookies mediante el banner de consentimiento que aparece al entrar en la web.</li>
      </ul>
      <p><strong>Revocación y eliminación de cookies</strong></p>
      <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador (Chrome, Firefox, Safari, Edge, etc.).</p>
    `
  }
};

(function initLegalAndCookies() {
  // --- Cookies Banner Logic ---
  const banner = document.getElementById('cookies-banner');
  const btnAccept = document.getElementById('btn-accept-cookies');
  const btnReject = document.getElementById('btn-reject-cookies');
  
  // Check if consent is already given
  const consent = localStorage.getItem('tarot_cookie_consent');
  if (!consent && banner) {
    // Small delay to allow initial animations to run before showing banner
    setTimeout(() => {
      banner.classList.remove('hidden');
    }, 1500);
  }
  
  const handleConsent = (value) => {
    localStorage.setItem('tarot_cookie_consent', value);
    if (banner) {
      banner.classList.add('hidden');
    }
  };
  
  if (btnAccept) btnAccept.addEventListener('click', () => handleConsent('all'));
  if (btnReject) btnReject.addEventListener('click', () => handleConsent('technical'));

  // --- Legal Modal Logic ---
  const legalModal = document.getElementById('legal-modal');
  const legalCloseBtn = document.getElementById('legal-close-btn');
  const legalTitle = document.getElementById('legal-modal-title');
  const legalBody = document.getElementById('legal-modal-body');
  const legalLinks = document.querySelectorAll('.legal-link');
  
  if (legalModal && legalCloseBtn) {
    legalCloseBtn.addEventListener('click', () => {
      legalModal.classList.add('hidden');
    });
    
    legalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const type = link.getAttribute('data-legal');
        const data = LEGAL_TEXTS[type];
        if (data) {
          legalTitle.textContent = data.title;
          legalBody.innerHTML = data.content;
          legalModal.classList.remove('hidden');
          // Hide cookies banner temporarily if open so it doesn't overlap excessively
          if (banner && !banner.classList.contains('hidden')) {
            banner.style.zIndex = 10;
          }
        }
      });
    });
  }
})();

// Lógica de Sub-pestañas de la sección de Carta del Día
(function initDailySubTabs() {
  const tabs = document.querySelectorAll('.daily-sub-tab');
  const sections = document.querySelectorAll('.daily-section-content');

  if (tabs.length === 0 || sections.length === 0) return;

  function switchDailySub(subName) {
    tabs.forEach(tab => {
      const name = tab.getAttribute('data-daily-sub');
      if (name === subName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    sections.forEach(section => {
      const id = section.id;
      if (id === `daily-${subName}-section`) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const subName = tab.getAttribute('data-daily-sub') || 'express';
      switchDailySub(subName);
    });
  });

  // Iniciar por defecto en Consejo Diario
  switchDailySub('express');
})();
