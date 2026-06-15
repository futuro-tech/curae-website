export const PRODUCTS = [
  {
    id: 'bloco',
    name: 'Eficiência do bloco cirúrgico',
    badge: '+31% Utilização',
    category: '+ GESTÃO HOSPITALAR',
    heading: 'Faça mais cirurgias com menos atrasos sem aumentar estrutura operacional',
    description:
      'Sistema autônomo de visão computacional que gera indicadores a partir da captura automática de eventos, materiais e fluxos do centro cirúrgico.',
    bullets: [
      'Detecte gargalos da operação cirúrgica.',
      'Reduza ociosidade e adiamentos.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3.75 5.625C4.786 5.625 5.625 4.786 5.625 3.75C5.625 2.714 4.786 1.875 3.75 1.875C2.714 1.875 1.875 2.714 1.875 3.75C1.875 4.786 2.714 5.625 3.75 5.625Z" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.078 5.075L7.503 7.5" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.503 2.5L5.078 9.925" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.75 13.125C4.786 13.125 5.625 12.286 5.625 11.25C5.625 10.214 4.786 9.375 3.75 9.375C2.714 9.375 1.875 10.214 1.875 11.25C1.875 12.286 2.714 13.125 3.75 13.125Z" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.25 9.25L12.5 12.5" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'risco',
    name: 'Priorização de pacientes por risco',
    badge: '94.7% Sensibilidade',
    category: '+ GESTÃO HOSPITALAR',
    heading: 'Diminua riscos clínicos com ordenação automática de filas',
    description:
      'Modelos preditivos para priorização dinâmica de pacientes baseados em dados clínicos, demográficos e registros integrados ao HIS.',
    bullets: [
      'Avalie prioridades e oriente sem intervenção manual.',
      'Reduza erros de classificação de risco.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M11.875 8.75C12.806 7.838 13.75 6.744 13.75 5.313C13.75 4.401 13.388 3.526 12.743 2.882C12.099 2.237 11.224 1.875 10.313 1.875C9.213 1.875 8.438 2.188 7.5 3.125C6.563 2.188 5.788 1.875 4.688 1.875C3.776 1.875 2.901 2.237 2.257 2.882C1.612 3.526 1.25 4.401 1.25 5.313C1.25 6.75 2.188 7.844 3.125 8.75L7.5 13.125L11.875 8.75Z" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'endometriose',
    name: 'Assistência ao diagnóstico de endometriose',
    badge: '−43% Mortalidade',
    category: '+ ASSISTÊNCIA AO DIAGNÓSTICO',
    heading: 'Reduza o tempo de diagnóstico de endometriose na primeira ultrassonografia',
    description:
      'Modelos de IA para identificação precoce de sinais associados à endometriose por análise de imagens de ultrassonografia ginecológica.',
    bullets: [
      'Antecipe o diagnóstico com mais segurança.',
      'Reduza o tempo até a identificação.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M6.25 7.5H13.125M6.25 11.25H13.125M6.25 3.75H13.125M2.5 6.25H3.75M2.5 3.75H3.125V6.25M3.75 11.25H2.5C2.5 10.625 3.75 10 3.75 9.375C3.75 8.75 3.125 8.438 2.5 8.75" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'voz',
    name: 'Triagem oncológica por voz',
    badge: '6× Mais Rápido',
    category: '+ ASSISTÊNCIA AO DIAGNÓSTICO',
    heading: 'Agilize a triagem de câncer de cabeça e pescoço pela análise de voz',
    description:
      'Sistema de categorização de risco e identificação de alterações vocais associadas ao câncer de cabeça e pescoço a partir de amostras de voz.',
    bullets: [
      'Reduza a avaliação clínica sem contato invasivo.',
      'Agilize a triagem sem contato físico invasivo.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1.875 4.375V3.125C1.875 2.793 2.007 2.476 2.241 2.241C2.476 2.007 2.793 1.875 3.125 1.875H4.375M10.625 1.875H11.875C12.207 1.875 12.525 2.007 12.759 2.241C12.993 2.476 13.125 2.793 13.125 3.125V4.375M13.125 10.625V11.875C13.125 12.207 12.993 12.525 12.759 12.759C12.525 12.993 12.207 13.125 11.875 13.125H10.625M4.375 13.125H3.125C2.793 13.125 2.476 12.993 2.241 12.759C2.007 12.525 1.875 12.207 1.875 11.875V10.625M7.5 9.375C8.536 9.375 9.375 8.536 9.375 7.5C9.375 6.464 8.536 5.625 7.5 5.625C6.464 5.625 5.625 6.464 5.625 7.5C5.625 8.536 6.464 9.375 7.5 9.375ZM10 10L8.813 8.813" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'ludopatia',
    name: 'Prevenção ao risco de Ludopatia',
    badge: '2.4× Antecipação',
    category: '+ SAÚDE MENTAL',
    heading: 'Antecipe riscos de Ludopatia e oriente iniciativas de saúde pública',
    description:
      'Modelos preditivos exclusivos para predição de risco de dependência em jogo com base em padrões comportamentais.',
    bullets: [
      'Antecipe políticas públicas com precisão.',
      'Categorize populações em risco.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 3.125C7.5 2.5 6.875 1.875 6.25 1.875C5.625 1.875 5 2.5 5 3.125V11.25C5 11.875 5.625 12.5 6.25 12.5C6.875 12.5 7.5 11.875 7.5 11.25V3.125Z" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 3.125C7.5 2.5 8.125 1.875 8.75 1.875C9.375 1.875 10 2.5 10 3.125V11.25C10 11.875 9.375 12.5 8.75 12.5C8.125 12.5 7.5 11.875 7.5 11.25V3.125Z" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]
