export const PRODUCTS = [
  {
    id: 'bloco',
    name: 'Eficiência do Bloco Cirúrgico',
    badge: '+31% Utilização',
    category: '+ GESTÃO HOSPITALAR',
    heading: 'Faça mais cirurgias por dia sem transbordo identificando gargalos operacionais',
    description:
      'Sistema autônomo de visão computacional que gera indicadores de fluxo e uso de materiais no centro cirúrgico a partir de captura de imagem.',
    bullets: [
      'Detecte oportunidades de melhoria da operação cirúrgica.',
      'Reduza ociosidade e adiamentos.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3.75 5.625C4.786 5.625 5.625 4.786 5.625 3.75C5.625 2.714 4.786 1.875 3.75 1.875C2.714 1.875 1.875 2.714 1.875 3.75C1.875 4.786 2.714 5.625 3.75 5.625Z" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.078 5.075L7.503 7.5" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.503 2.5L5.078 9.925" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.75 13.125C4.786 13.125 5.625 12.286 5.625 11.25C5.625 10.214 4.786 9.375 3.75 9.375C2.714 9.375 1.875 10.214 1.875 11.25C1.875 12.286 2.714 13.125 3.75 13.125Z" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.25 9.25L12.5 12.5" stroke="#1A7A6E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'risco',
    name: 'Priorização de Pacientes por Risco',
    badge: '94.7% Sensibilidade',
    category: '+ GESTÃO HOSPITALAR',
    heading: 'Diminua riscos clínicos com ordenação automática de filas',
    description:
      'Modelo preditivo para priorização dinâmica de pacientes baseada em dados clínicos, demográficos e regulatórios integrados ao HIS.',
    bullets: [
      'Atualize prioridades e critérios sem intervenção manual.',
      'Reduza erros de classificação de risco.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M11.875 8.75C12.806 7.838 13.75 6.744 13.75 5.313C13.75 4.401 13.388 3.526 12.743 2.882C12.099 2.237 11.224 1.875 10.313 1.875C9.213 1.875 8.438 2.188 7.5 3.125C6.563 2.188 5.788 1.875 4.688 1.875C3.776 1.875 2.901 2.237 2.257 2.882C1.612 3.526 1.25 4.401 1.25 5.313C1.25 6.75 2.188 7.844 3.125 8.75L7.5 13.125L11.875 8.75Z" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'endometriose',
    name: 'Assistência ao Diagnóstico de Endometriose',
    badge: '−43% Mortalidade',
    category: '+ ASSISTÊNCIA AO DIAGNÓSTICO',
    heading: 'Antencipe o diagnóstico de endometriose em até 2 anos',
    description:
      'Modelo de IA para identificação precoce de sinais associados à endometriose por análise de imagens de ultrassonografia ginecológica.',
    bullets: [
      'Apoie o diagnóstico com mais uma fonte de sinalização.',
      'Reduza o tempo até a identificação a partir da primeira ultrassonografia.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M6.25 7.5H13.125M6.25 11.25H13.125M6.25 3.75H13.125M2.5 6.25H3.75M2.5 3.75H3.125V6.25M3.75 11.25H2.5C2.5 10.625 3.75 10 3.75 9.375C3.75 8.75 3.125 8.438 2.5 8.75" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'voz',
    name: 'Triagem Oncológica por Voz',
    badge: '6× Mais Rápido',
    category: '+ ASSISTÊNCIA AO DIAGNÓSTICO',
    heading: 'Identifique precocemente o risco de câncer de cabeça e pescoço pela análise de voz',
    description:
      'Sistema de categorização de risco e detecção de alterações vocais associadas ao câncer de cabeça e pescoço.',
    bullets: [
      'Reduza a avaliação clínica inicial.',
      'Torne mais rápida a triagem sem métodos invasivos.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1.875 4.375V3.125C1.875 2.793 2.007 2.476 2.241 2.241C2.476 2.007 2.793 1.875 3.125 1.875H4.375M10.625 1.875H11.875C12.207 1.875 12.525 2.007 12.759 2.241C12.993 2.476 13.125 2.793 13.125 3.125V4.375M13.125 10.625V11.875C13.125 12.207 12.993 12.525 12.759 12.759C12.525 12.993 12.207 13.125 11.875 13.125H10.625M4.375 13.125H3.125C2.793 13.125 2.476 12.993 2.241 12.759C2.007 12.525 1.875 12.207 1.875 11.875V10.625M7.5 9.375C8.536 9.375 9.375 8.536 9.375 7.5C9.375 6.464 8.536 5.625 7.5 5.625C6.464 5.625 5.625 6.464 5.625 7.5C5.625 8.536 6.464 9.375 7.5 9.375ZM10 10L8.813 8.813" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'ludopatia',
    name: 'Prevenção ao Risco de Ludopatia',
    badge: '2.4× Antecipação',
    category: '+ SAÚDE MENTAL',
    heading: 'Antecipe riscos de Ludopatia e oriente iniciativas de saúde pública',
    description:
      'Modelos preditivos exclusivos para predição de risco de dependência em jogo com base em padrões comportamentais.',
    bullets: [
      'Direcione políticas públicas com precisão.',
      'Categorize populações em risco.',
    ],
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_ludopatia)">
          <path d="M7.5005 3.12467C7.50124 2.87468 7.45198 2.62708 7.35563 2.39642C7.25927 2.16575 7.11776 1.95668 6.93942 1.78151C6.76108 1.60633 6.54952 1.46859 6.31716 1.37637C6.08481 1.28416 5.83637 1.23934 5.58644 1.24455C5.33651 1.24976 5.09015 1.30489 4.86184 1.40671C4.63353 1.50852 4.42789 1.65496 4.25701 1.83742C4.08612 2.01987 3.95345 2.23466 3.86679 2.46914C3.78012 2.70362 3.74123 2.95306 3.75238 3.20279C3.385 3.29725 3.04394 3.47407 2.75502 3.71986C2.4661 3.96565 2.2369 4.27396 2.08478 4.62145C1.93266 4.96893 1.8616 5.34647 1.877 5.72549C1.89239 6.1045 1.99383 6.47504 2.17363 6.80904C1.85749 7.06587 1.6089 7.39606 1.44947 7.77087C1.29004 8.14569 1.2246 8.55379 1.25886 8.95966C1.29311 9.36553 1.42601 9.75688 1.64601 10.0997C1.866 10.4425 2.16642 10.7263 2.52113 10.9265C2.47733 11.2654 2.50347 11.6097 2.59793 11.9381C2.6924 12.2665 2.85319 12.5721 3.07037 12.8359C3.28755 13.0997 3.55651 13.3162 3.86064 13.472C4.16477 13.6278 4.49761 13.7196 4.83861 13.7417C5.17961 13.7639 5.52153 13.7159 5.84325 13.6007C6.16496 13.4855 6.45965 13.3056 6.7091 13.072C6.95856 12.8385 7.15749 12.5563 7.29361 12.2428C7.42972 11.9294 7.50014 11.5914 7.5005 11.2497V3.12467Z" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.50001 3.12467C7.49927 2.87468 7.54853 2.62708 7.64489 2.39642C7.74124 2.16575 7.88275 1.95668 8.06109 1.78151C8.23943 1.60633 8.451 1.46859 8.68335 1.37637C8.9157 1.28416 9.16415 1.23934 9.41407 1.24455C9.664 1.24976 9.91036 1.30489 10.1387 1.40671C10.367 1.50852 10.5726 1.65496 10.7435 1.83742C10.9144 2.01987 11.0471 2.23466 11.1337 2.46914C11.2204 2.70362 11.2593 2.95306 11.2481 3.20279C11.6155 3.29725 11.9566 3.47407 12.2455 3.71986C12.5344 3.96565 12.7636 4.27396 12.9157 4.62145C13.0679 4.96893 13.1389 5.34647 13.1235 5.72549C13.1081 6.1045 13.0067 6.47504 12.8269 6.80904C13.143 7.06587 13.3916 7.39606 13.551 7.77087C13.7105 8.14569 13.7759 8.55379 13.7417 8.95966C13.7074 9.36553 13.5745 9.75688 13.3545 10.0997C13.1345 10.4425 12.8341 10.7263 12.4794 10.9265C12.5232 11.2654 12.497 11.6097 12.4026 11.9381C12.3081 12.2665 12.1473 12.5721 11.9301 12.8359C11.713 13.0997 11.444 13.3162 11.1399 13.472C10.8357 13.6278 10.5029 13.7196 10.1619 13.7417C9.8209 13.7639 9.47898 13.7159 9.15727 13.6007C8.83555 13.4855 8.54086 13.3056 8.29141 13.072C8.04195 12.8385 7.84302 12.5563 7.70691 12.2428C7.57079 11.9294 7.50037 11.5914 7.50001 11.2497V3.12467Z" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.375 8.125C8.85028 7.94041 8.39207 7.60437 8.05833 7.15938C7.72458 6.71438 7.53028 6.18042 7.5 5.625C7.46972 6.18042 7.27542 6.71438 6.94167 7.15938C6.60793 7.60437 6.14972 7.94041 5.625 8.125" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 4.0625C11.1513 3.80037 11.2368 3.50551 11.2494 3.20312" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.75 3.20312C3.76236 3.50546 3.84771 3.80031 3.99875 4.0625" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.17188 6.81C2.28621 6.71688 2.40856 6.63406 2.5375 6.5625" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.4609 6.5625C12.5899 6.63406 12.7122 6.71688 12.8266 6.81" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.75281 11.2502C3.32208 11.2504 2.8986 11.1393 2.52344 10.9277" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.4794 10.9277C12.1042 11.1393 11.6807 11.2504 11.25 11.2502" stroke="#4A5568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_ludopatia">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
]
