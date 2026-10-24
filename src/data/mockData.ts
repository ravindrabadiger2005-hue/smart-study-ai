import { Deck, ScheduleItem, StudyModule, SmartNote, UserStats } from '../types';

export const initialUserStats: UserStats = {
  name: 'Alex',
  email: 'alex.chen@university.edu',
  streakDays: 7,
  studiedTodayHours: 2.5,
  studiedGoalHours: 3.2,
  velocityScore: 850,
  overallGoalPercent: 78,
  criticalGapMastery: 42,
  activeModulesCompleted: 14,
  totalModules: 22,
};

export const initialSchedule: ScheduleItem[] = [
  {
    id: 'sch-1',
    time: '10:30 AM',
    duration: '45 mins',
    title: 'Reaction Mechanisms review',
    subtitle: 'Nucleophilic addition & SN1 vs SN2 deep dive',
    status: 'Up Next',
    icon: 'menu_book',
    subject: 'Organic Chemistry II',
  },
  {
    id: 'sch-2',
    time: '2:00 PM',
    duration: '30 mins',
    title: 'Quiz: Molecular Orbitals',
    subtitle: 'HOMO/LUMO interactions and hybridization',
    status: 'Scheduled',
    icon: 'quiz',
    subject: 'Organic Chemistry II',
  },
  {
    id: 'sch-3',
    time: '4:15 PM',
    duration: '50 mins',
    title: 'Rotational Dynamics Problem Set',
    subtitle: 'Torque vectors, angular momentum, and gyroscopic precession',
    status: 'Scheduled',
    icon: 'fitness_center',
    subject: 'Physics & Dynamics',
  },
  {
    id: 'sch-4',
    time: '7:30 PM',
    duration: '35 mins',
    title: 'IS-LM & Monetary Policy Review',
    subtitle: 'Liquidity preference curve shifts and central bank equilibrium',
    status: 'Scheduled',
    icon: 'trending_up',
    subject: 'Macroeconomics',
  },
];

export const initialDecks: Deck[] = [
  {
    id: 'deck-phys',
    code: 'PHYS 201',
    title: 'Physics & Dynamics',
    description: 'Electromagnetism, rotational torque, wave mechanics.',
    cardsCount: 112,
    masteryPercent: 88,
    badgeBg: 'bg-secondary-fixed/50 text-on-secondary-fixed',
    badgeText: 'PHYS 201',
    cards: [
      {
        id: 'p1',
        front: "What is Faraday's Law of Electromagnetic Induction?",
        back: 'The induced electromotive force (EMF) in any closed circuit is equal to the negative rate of change of magnetic flux through the circuit: EMF = -d(Phi_B)/dt.',
        subject: 'Physics',
      },
      {
        id: 'p2',
        front: 'How is rotational torque related to angular acceleration?',
        back: 'Torque (tau) = I * alpha, where I is the moment of inertia and alpha is the angular acceleration (analogous to F = m * a in linear mechanics).',
        subject: 'Physics',
      },
      {
        id: 'p3',
        front: 'What does Lenz’s Law determine in electromagnetic induction?',
        back: 'The direction of an induced current is always such that its magnetic field opposes the original change in magnetic flux that produced it.',
        subject: 'Physics',
      },
      {
        id: 'p4',
        front: 'State the relationship between phase velocity and group velocity for non-dispersive waves.',
        back: 'In a non-dispersive medium, phase velocity (v_p = omega / k) equals group velocity (v_g = d(omega)/dk). Both are constant with frequency.',
        subject: 'Physics',
      },
    ],
  },
  {
    id: 'deck-chem',
    code: 'CHEM 240',
    title: 'Organic Chem',
    description: 'Carbon backbones, chirality, resonance structures.',
    cardsCount: 164,
    masteryPercent: 64,
    badgeBg: 'bg-primary-fixed text-on-primary-fixed',
    badgeText: 'CHEM 240',
    cards: [
      {
        id: 'c1',
        front: 'What is the key stereochemical outcome of an SN2 reaction?',
        back: 'Complete inversion of configuration (Walden Inversion) because the nucleophile attacks from the backside 180 degrees away from the leaving group.',
        subject: 'Organic Chemistry',
      },
      {
        id: 'c2',
        front: 'Define enantiomers versus diastereomers.',
        back: 'Enantiomers are non-superimposable mirror images (all stereocenters inverted). Diastereomers are stereoisomers that are not mirror images (some, but not all, stereocenters inverted).',
        subject: 'Organic Chemistry',
      },
      {
        id: 'c3',
        front: "Why does Markovnikov's Rule hold for electrophilic alkene additions?",
        back: 'Electrophilic addition proceeds through the more substituted, lower-energy carbocation intermediate due to hyperconjugation and alkyl inductive stabilization.',
        subject: 'Organic Chemistry',
      },
      {
        id: 'c4',
        front: 'What reagent cleanly converts an alcohol into an alkyl chloride with inversion?',
        back: 'Thionyl chloride (SOCl2) in the presence of pyridine converts secondary and primary alcohols to alkyl chlorides with inversion of configuration via an SN2 mechanism.',
        subject: 'Organic Chemistry',
      },
    ],
  },
  {
    id: 'deck-econ',
    code: 'ECON 102',
    title: 'Macroeconomics',
    description: 'Monetary policy, fiscal multipliers, GDP deflators.',
    cardsCount: 78,
    masteryPercent: 92,
    badgeBg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    badgeText: 'ECON 102',
    cards: [
      {
        id: 'e1',
        front: 'What is the formula for the simple Keynesian expenditure multiplier?',
        back: 'Multiplier = 1 / (1 - MPC) = 1 / MPS, where MPC is the Marginal Propensity to Consume and MPS is the Marginal Propensity to Save.',
        subject: 'Macroeconomics',
      },
      {
        id: 'e2',
        front: 'How does an increase in the reserve requirement affect the money supply?',
        back: 'It reduces the money multiplier (1 / reserve ratio), limiting bank lending capacity and causing a contractionary shift in the overall money supply.',
        subject: 'Macroeconomics',
      },
      {
        id: 'e3',
        front: 'What distinguishes Real GDP from Nominal GDP?',
        back: 'Nominal GDP measures output valued at current market prices, whereas Real GDP is adjusted for price inflation by holding base-year prices constant.',
        subject: 'Macroeconomics',
      },
    ],
  },
  {
    id: 'deck-bio',
    code: 'BIO 110',
    title: 'Cellular Energy',
    description: 'Glycolysis, Krebs cycle, electron transport & ATP synthase.',
    cardsCount: 95,
    masteryPercent: 42,
    badgeBg: 'bg-error-container text-on-error-container',
    badgeText: 'BIO 110',
    cards: [
      {
        id: 'b1',
        front: 'Which step in the citric acid cycle performs substrate-level phosphorylation?',
        back: 'Succinyl-CoA synthetase cleaves the high-energy thioester bond of Succinyl-CoA to form Succinate, phosphorylating GDP to GTP (or ADP to ATP).',
        subject: 'Cellular Biology',
      },
      {
        id: 'b2',
        front: 'What provides the mechanical energy for ATP synthase rotor rotation?',
        back: 'The proton-motive force (proton electrochemical gradient): protons flow through half-channels in the F0 subunit, neutralizing Asp/Glu charges and rotating the c-ring.',
        subject: 'Cellular Biology',
      },
      {
        id: 'b3',
        front: 'How many NADH molecules are produced per glucose molecule in the Krebs cycle alone?',
        back: '6 NADH (3 NADH per pyruvate / turn of the cycle; 2 pyruvates per original glucose).',
        subject: 'Cellular Biology',
      },
    ],
  },
];

export const initialModules: StudyModule[] = [
  { id: 1, title: 'Atomic Orbitals & sp3/sp2 Hybridization', subject: 'Organic Chemistry II', estimatedMinutes: 40, completed: true, retentionScore: 94, targetDate: 'Oct 12' },
  { id: 2, title: 'Lewis Structures & Resonance Contributors', subject: 'Organic Chemistry II', estimatedMinutes: 35, completed: true, retentionScore: 92, targetDate: 'Oct 13' },
  { id: 3, title: 'Acid-Base Equilibria & pKa Predictive Trends', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: true, retentionScore: 89, targetDate: 'Oct 14' },
  { id: 4, title: 'Conformational Analysis: Cyclohexane Chair Flips', subject: 'Organic Chemistry II', estimatedMinutes: 50, completed: true, retentionScore: 91, targetDate: 'Oct 15' },
  { id: 5, title: 'Chirality & CIP (R)/(S) Configuration', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: true, retentionScore: 85, targetDate: 'Oct 16' },
  { id: 6, title: 'Fischer Projections & Meso Compounds', subject: 'Organic Chemistry II', estimatedMinutes: 30, completed: true, retentionScore: 88, targetDate: 'Oct 17' },
  { id: 7, title: 'Alkyl Halides & Leaving Group Kinetics', subject: 'Organic Chemistry II', estimatedMinutes: 40, completed: true, retentionScore: 82, targetDate: 'Oct 18' },
  { id: 8, title: 'SN2 Mechanism: Solvent & Steric Factors', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: true, retentionScore: 86, targetDate: 'Oct 19' },
  { id: 9, title: 'SN1 Mechanism & Carbocation Rearrangements', subject: 'Organic Chemistry II', estimatedMinutes: 50, completed: true, retentionScore: 78, targetDate: 'Oct 20' },
  { id: 10, title: 'E2 Elimination & Zaitsev vs Hofmann Regioselectivity', subject: 'Organic Chemistry II', estimatedMinutes: 40, completed: true, retentionScore: 84, targetDate: 'Oct 21' },
  { id: 11, title: 'E1 Elimination & Competition with SN1', subject: 'Organic Chemistry II', estimatedMinutes: 35, completed: true, retentionScore: 81, targetDate: 'Oct 21' },
  { id: 12, title: 'Electrophilic Alkene Additions: Halogenation', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: true, retentionScore: 90, targetDate: 'Oct 22' },
  { id: 13, title: 'Oxymercuration-Demercuration vs Hydroboration', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: true, retentionScore: 87, targetDate: 'Oct 22' },
  { id: 14, title: 'Epoxidation & Anti-Dihydroxylation Pathways', subject: 'Organic Chemistry II', estimatedMinutes: 40, completed: true, retentionScore: 83, targetDate: 'Oct 23' },
  { id: 15, title: 'Reaction Mechanisms review (Nucleophilic Addition)', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: false, targetDate: 'Oct 24 (Today)' },
  { id: 16, title: 'Quiz: Molecular Orbitals & HOMO-LUMO Interactions', subject: 'Organic Chemistry II', estimatedMinutes: 30, completed: false, targetDate: 'Oct 24 (Today)' },
  { id: 17, title: 'Conjugated Dienes & 1,2 vs 1,4 Kinetic/Thermodynamic Control', subject: 'Organic Chemistry II', estimatedMinutes: 55, completed: false, targetDate: 'Oct 25' },
  { id: 18, title: 'Diels-Alder Cycloadditions (Endo Rule & Diastereospecificity)', subject: 'Organic Chemistry II', estimatedMinutes: 50, completed: false, targetDate: 'Oct 25' },
  { id: 19, title: 'Aromaticity: Hückel 4n+2 Rule & Annulenes', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: false, targetDate: 'Oct 26' },
  { id: 20, title: 'Electrophilic Aromatic Substitution (EAS) Mechanisms', subject: 'Organic Chemistry II', estimatedMinutes: 50, completed: false, targetDate: 'Oct 26' },
  { id: 21, title: 'EAS Directing Groups: Activators vs Deactivators', subject: 'Organic Chemistry II', estimatedMinutes: 45, completed: false, targetDate: 'Oct 27' },
  { id: 22, title: 'Full Midterm Comprehensive Simulation & Timed Mock', subject: 'Organic Chemistry II', estimatedMinutes: 90, completed: false, targetDate: 'Oct 27' },
];

export const initialNotes: SmartNote[] = [
  {
    id: 'note-1',
    title: 'Reaction Mechanisms: Nucleophilic Substitution (SN1 vs SN2)',
    subject: 'Organic Chemistry II',
    courseCode: 'CHEM 240',
    date: 'Yesterday, 4:20 PM',
    summary: 'Nucleophilic substitution divides cleanly into bimolecular concerted backside displacement (SN2) and unimolecular stepwise carbocation trapping (SN1). Steric hindrance controls the crossover point at secondary substrates, while solvent polarity governs transition state stabilization.',
    cues: ['Bimolecular Rate Law', 'Walden Inversion', 'Carbocation Solvation', 'Polar Aprotic Solvents'],
    keyTakeaways: [
      'SN2 rate = k[Substrate][Nucleophile]; bimolecular with clean inversion of configuration.',
      'SN1 rate = k[Substrate]; unimolecular with racemization through planar sp2 intermediate.',
      'Polar aprotic solvents (DMSO, Acetone, DMF) strip cation shells, drastically increasing nucleophile nucleophilicity for SN2.',
      'Tertiary substrates never undergo SN2 due to severe 1,3-diaxial steric clash.',
    ],
    examTrap: 'Secondary alkyl halides can undergo either SN1 or SN2 depending on solvent and nucleophile strength. Watch out for DMSO favoring SN2 versus H2O/EtOH favoring SN1 with rearrangement!',
    flashcards: [
      { front: 'Why does polar aprotic solvent accelerate SN2?', back: 'It solvates metal cations effectively while leaving the nucleophilic anion naked and unhindered to attack.' },
      { front: 'What is the stereochemical outcome of SN1 on a chiral center?', back: 'Racemization (a ~50:50 mixture of enantiomers) with slight excess inversion due to intimate ion-pair shielding.' }
    ]
  },
  {
    id: 'note-2',
    title: 'Cellular Respiration & Substrate-Level Phosphorylation',
    subject: 'Cellular Biology',
    courseCode: 'BIO 110',
    date: 'Oct 22, 11:15 AM',
    summary: 'Substrate-level phosphorylation synthesizes ATP directly from high-energy phosphorylated substrates without an electron transport chain. In the Krebs cycle, Succinyl-CoA synthetase produces GTP/ATP by coupling thioester bond hydrolysis.',
    cues: ['Thioester Hydrolysis', 'GTP/ATP Equivalence', 'Proton-Motive Force', 'ATP Synthase Rotor'],
    keyTakeaways: [
      'Succinyl-CoA contains a high-energy thioester bond whose cleavage drives GDP + Pi -> GTP.',
      'Oxidative phosphorylation accounts for the majority of cellular ATP via Chemiosmosis.',
      'ATP Synthase F0 domain contains a rotating c-ring driven by proton translocation across the inner mitochondrial membrane.',
      'Uncouplers like DNP dissipate the proton gradient into heat without generating ATP.'
    ],
    examTrap: 'Do not confuse substrate-level phosphorylation with oxidative phosphorylation; substrate-level is direct enzymatic phosphate transfer, whereas oxidative requires electron transport and proton pumping.',
    flashcards: [
      { front: 'Which enzyme catalyzes substrate-level phosphorylation in Krebs cycle?', back: 'Succinyl-CoA synthetase (producing GTP or ATP).' },
      { front: 'What is the role of the F1 subunit of ATP synthase?', back: 'The catalytic headpiece that synthesizes ATP from ADP + Pi through conformational changes induced by the rotating gamma shaft.' }
    ]
  },
  {
    id: 'note-3',
    title: 'Electromagnetic Induction & Faraday-Lenz Relations',
    subject: 'Physics & Dynamics',
    courseCode: 'PHYS 201',
    date: 'Oct 21, 3:30 PM',
    summary: 'A changing magnetic flux through a conducting loop induces an electromotive force (EMF) directly proportional to the rate of flux change. Lenz\'s law dictates the negative sign, demonstrating conservation of energy.',
    cues: ['Magnetic Flux Integral', 'Lenz Sign Convention', 'Eddy Currents', 'Motional EMF'],
    keyTakeaways: [
      'Magnetic flux Phi = integral(B * dA * cos(theta)).',
      'EMF = -N * d(Phi)/dt, where N is the number of coil turns.',
      'Lenz law: the induced current produces a magnetic field that opposes the change in flux that caused it.',
      'Motional EMF across a conductor moving at velocity v through field B is EMF = B * L * v.'
    ],
    examTrap: 'Always check whether the field strength B, the enclosed area A, or the angle theta is changing with time when calculating d(Phi)/dt!',
    flashcards: [
      { front: 'What physical law dictates the negative sign in Faraday’s law?', back: 'Lenz’s Law, which ensures the conservation of energy by preventing runaway runaway induction.' }
    ]
  }
];
