const BASE = 'https://api.builder.io/api/v1/image/assets/TEMP'

export const PRODUCT_GROUPS_PT = [
  {
    id: 'eficiencia-hospitalar',
    badge: '+ EFICIÊNCIA HOSPITALAR',
    bg: '#E1F5EE',
    text: '#1A7A6E',
    products: [
      {
        id: 'fluxor',
        name: 'Fluxor',
        heading: 'Mais cirurgias. Sem transbordo.',
        description: 'Sistema autônomo de visão computacional que gera indicadores de fluxo e uso de materiais no centro cirúrgico a partir da captura de imagem.',
        benefits: [
          { icon: `${BASE}/f1ec2b0a1c7a13b7b09606dc053f9bdcea234e23?width=54`, text: 'Detecte gargalos operacionais escondidos no bloco cirúrgico' },
          { icon: `${BASE}/85a3f0688dea2585b3e2de2249168811985a9d54?width=54`, text: 'Reduza ociosidade e atrasos sem mais salas ou equipes' },
        ],
      },
      {
        id: 'priux',
        name: 'Priux',
        heading: 'Priorização de pacientes por risco',
        description: 'Foque no que importa. Modelo preditivo de ordenação de filas que evolui sozinho baseado em feedback, dados do paciente e regulatórios. Integrado ao HIS.',
        benefits: [
          { icon: `${BASE}/68a009c0d94b39241ae70938b6861f7dff21819a?width=54`, text: 'Otimize as filas continuamente sem intervenção manual' },
          { icon: `${BASE}/8666dc2a451e78d89f868cdc76bc2f71ce73fd0f?width=54`, text: 'Diminua cancelamentos, atrasos e riscos clínicos' },
        ],
      },
    ],
  },
  {
    id: 'apoio-diagnostico',
    badge: '+ APOIO AO DIAGNÓSTICO',
    bg: '#DFF0F7',
    text: '#1A5F7A',
    products: [
      {
        id: 'pred-endometriose',
        name: 'Pred Endometriose',
        heading: 'Apoio à detecção de Endometriose',
        description: 'Modelo de identificação precoce de sinais associados à endometriose por análise de imagens de ultrassonografia ginecológica.',
        benefits: [
          { icon: `${BASE}/158d6ad9bb7e2f4fbab4772e852b3cf2f9b114aa?width=54`, text: 'Antecipe o diagnóstico a partir da primeira ultrassonografia' },
          { icon: `${BASE}/9911a5153c182ebcf830f192ceeea2cd3ca8ddec?width=54`, text: 'Use mais uma fonte de detecção de risco para decisão' },
        ],
      },
      {
        id: 'pred-cabeca-pescoco',
        name: 'Pred Cabeça e Pescoço',
        heading: 'Triagem oncológica não invasiva',
        description: 'Sistema de categorização de risco e detecção de alterações vocais associadas ao câncer de cabeça e pescoço.',
        benefits: [
          { icon: `${BASE}/a4dae7e7ad0cfd26b3142d17a1fc96db094956e7?width=54`, text: 'Reforce a avaliação inicial para câncer de Cabeça e Pescoço' },
          { icon: `${BASE}/497c546b27f512cf9c5fe5ea5b1515d471d51547?width=54`, text: 'Otimize a triagem com um método preciso e prático' },
        ],
      },
      {
        id: 'pred-parkinson',
        name: 'Pred Parkinson',
        heading: 'Avaliação vocal para Parkinson',
        description: 'Sistema de apoio à triagem e acompanhamento clínico por meio da análise de biomarcadores vocais para Doença de Parkinson.',
        benefits: [
          { icon: `${BASE}/a4dae7e7ad0cfd26b3142d17a1fc96db094956e7?width=54`, text: 'Identifique alterações vocais precocemente' },
          { icon: `${BASE}/497c546b27f512cf9c5fe5ea5b1515d471d51547?width=54`, text: 'Acompanhe a evolução clínica sem exames invasivos' },
        ],
      },
    ],
  },
  {
    id: 'saude-mental',
    badge: '+ SAÚDE MENTAL',
    bg: '#FFF2DD',
    text: '#CA8618',
    products: [
      {
        id: 'pred-ludopatia',
        name: 'Pred Ludopatia',
        heading: 'Rastreio da dependência em jogo',
        description: 'Modelo preditivo exclusivo para predição e categorização de risco de Ludopatia com base em padrões comportamentais. Para iniciativas de saúde pública.',
        benefits: [
          { icon: `${BASE}/cd67b96b4ba73e0bd82bc630d0b6bc3d5eb8ff43?width=54`, text: 'Direcione ações preventivas contra dependência em jogo' },
          { icon: `${BASE}/4e08c85ae36ce02b06c6dd0796f5ebdd3896e987?width=54`, text: 'Identifique o risco em Ludopatia antes dela acontecer' },
        ],
      },
    ],
  },
]

export const PRODUCT_GROUPS_EN = [
  {
    id: 'eficiencia-hospitalar',
    badge: '+ HOSPITAL EFFICIENCY',
    bg: '#E1F5EE',
    text: '#1A7A6E',
    products: [
      {
        id: 'fluxor',
        name: 'Fluxor',
        heading: 'More surgeries. No overflow.',
        description: 'Autonomous computer vision system that generates insights into surgical workflow and material utilization through image capture.',
        benefits: [
          { icon: `${BASE}/f1ec2b0a1c7a13b7b09606dc053f9bdcea234e23?width=54`, text: 'Detect hidden bottlenecks in the operating room' },
          { icon: `${BASE}/85a3f0688dea2585b3e2de2249168811985a9d54?width=54`, text: 'Reduce idle time and delays without adding rooms or staff' },
        ],
      },
      {
        id: 'priux',
        name: 'Priux',
        heading: 'Risk-based patient prioritization',
        description: 'Focus on what matters most. A self-improving predictive queue prioritization model powered by patient data, clinical feedback and regulatory criteria. Integrated with your HIS.',
        benefits: [
          { icon: `${BASE}/68a009c0d94b39241ae70938b6861f7dff21819a?width=54`, text: 'Continuously optimize patient queues with no manual intervention' },
          { icon: `${BASE}/8666dc2a451e78d89f868cdc76bc2f71ce73fd0f?width=54`, text: 'Reduce cancellations, delays and clinical risk' },
        ],
      },
    ],
  },
  {
    id: 'apoio-diagnostico',
    badge: '+ DIAGNOSTIC SUPPORT',
    bg: '#DFF0F7',
    text: '#1A5F7A',
    products: [
      {
        id: 'pred-endometriose',
        name: 'Pred Endometriosis',
        heading: 'Supporting earlier detection of Endometriosis',
        description: 'AI model that identifies early signs associated with endometriosis through the analysis of gynecological ultrasound images.',
        benefits: [
          { icon: `${BASE}/158d6ad9bb7e2f4fbab4772e852b3cf2f9b114aa?width=54`, text: 'Support earlier diagnosis from the very first ultrasound' },
          { icon: `${BASE}/9911a5153c182ebcf830f192ceeea2cd3ca8ddec?width=54`, text: 'Add another source of risk detection to clinical decision-making' },
        ],
      },
      {
        id: 'pred-cabeca-pescoco',
        name: 'Pred Head & Neck',
        heading: 'Non-invasive cancer screening',
        description: 'Risk stratification system that detects vocal alterations associated with head and neck cancer.',
        benefits: [
          { icon: `${BASE}/a4dae7e7ad0cfd26b3142d17a1fc96db094956e7?width=54`, text: 'Strengthen early assessment for head and neck cancer' },
          { icon: `${BASE}/497c546b27f512cf9c5fe5ea5b1515d471d51547?width=54`, text: 'Improve screening with a precise, practical approach' },
        ],
      },
      {
        id: 'pred-parkinson',
        name: "Pred Parkinson's",
        heading: "Voice-based Parkinson's assessment",
        description: "Clinical decision support for screening and patient follow-up through the analysis of vocal biomarkers associated with Parkinson's disease.",
        benefits: [
          { icon: `${BASE}/a4dae7e7ad0cfd26b3142d17a1fc96db094956e7?width=54`, text: 'Detect vocal changes early' },
          { icon: `${BASE}/497c546b27f512cf9c5fe5ea5b1515d471d51547?width=54`, text: 'Monitor disease progression without invasive testing' },
        ],
      },
    ],
  },
  {
    id: 'saude-mental',
    badge: '+ MENTAL HEALTH',
    bg: '#FFF2DD',
    text: '#CA8618',
    products: [
      {
        id: 'pred-ludopatia',
        name: 'Pred Gambling Disorder',
        heading: 'Screening for gambling addiction',
        description: 'Proprietary predictive model for gambling disorder risk prediction and stratification based on behavioral patterns. Designed for public health initiatives.',
        benefits: [
          { icon: `${BASE}/cd67b96b4ba73e0bd82bc630d0b6bc3d5eb8ff43?width=54`, text: 'Guide preventive action against gambling addiction' },
          { icon: `${BASE}/4e08c85ae36ce02b06c6dd0796f5ebdd3896e987?width=54`, text: 'Identify risk before gambling disorder develops' },
        ],
      },
    ],
  },
]
