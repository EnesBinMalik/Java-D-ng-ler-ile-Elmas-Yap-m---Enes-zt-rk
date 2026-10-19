import { PatternType, RowData, SimulationStep } from '../types';

export function generatePatternRows(
  n: number,
  pattern: PatternType = 'diamond',
  starChar: string = '*'
): RowData[] {
  const rows: RowData[] = [];
  const char = starChar || '*';

  if (pattern === 'diamond') {
    // Upper half (0 to n)
    for (let i = 0; i <= n; i++) {
      const spaces = n - i;
      const stars = 2 * i + 1;
      const content = ' '.repeat(spaces) + char.repeat(stars);
      rows.push({
        rowIndex: rows.length,
        i,
        section: i === n ? 'center' : 'upper',
        spaces,
        stars,
        content,
      });
    }

    // Lower half (n - 1 down to 0)
    for (let i = n - 1; i >= 0; i--) {
      const spaces = n - i;
      const stars = 2 * i + 1;
      const content = ' '.repeat(spaces) + char.repeat(stars);
      rows.push({
        rowIndex: rows.length,
        i,
        section: 'lower',
        spaces,
        stars,
        content,
      });
    }
  } else if (pattern === 'triangle') {
    // Standard pyramid (0 to n)
    for (let i = 0; i <= n; i++) {
      const spaces = n - i;
      const stars = 2 * i + 1;
      const content = ' '.repeat(spaces) + char.repeat(stars);
      rows.push({
        rowIndex: rows.length,
        i,
        section: 'upper',
        spaces,
        stars,
        content,
      });
    }
  } else if (pattern === 'hollow_diamond') {
    // Hollow diamond upper
    for (let i = 0; i <= n; i++) {
      const spaces = n - i;
      const starsCount = 2 * i + 1;
      let starStr = '';
      if (starsCount === 1) {
        starStr = char;
      } else {
        starStr = char + ' '.repeat(starsCount - 2) + char;
      }
      rows.push({
        rowIndex: rows.length,
        i,
        section: i === n ? 'center' : 'upper',
        spaces,
        stars: starsCount,
        content: ' '.repeat(spaces) + starStr,
        isHollow: true,
      });
    }
    // Hollow diamond lower
    for (let i = n - 1; i >= 0; i--) {
      const spaces = n - i;
      const starsCount = 2 * i + 1;
      let starStr = '';
      if (starsCount === 1) {
        starStr = char;
      } else {
        starStr = char + ' '.repeat(starsCount - 2) + char;
      }
      rows.push({
        rowIndex: rows.length,
        i,
        section: 'lower',
        spaces,
        stars: starsCount,
        content: ' '.repeat(spaces) + starStr,
        isHollow: true,
      });
    }
  } else if (pattern === 'inverted_triangle') {
    for (let i = n; i >= 0; i--) {
      const spaces = n - i;
      const stars = 2 * i + 1;
      rows.push({
        rowIndex: rows.length,
        i,
        section: 'lower',
        spaces,
        stars,
        content: ' '.repeat(spaces) + char.repeat(stars),
      });
    }
  } else if (pattern === 'hourglass') {
    for (let i = n; i >= 0; i--) {
      const spaces = n - i;
      const stars = 2 * i + 1;
      rows.push({
        rowIndex: rows.length,
        i,
        section: 'upper',
        spaces,
        stars,
        content: ' '.repeat(spaces) + char.repeat(stars),
      });
    }
    for (let i = 1; i <= n; i++) {
      const spaces = n - i;
      const stars = 2 * i + 1;
      rows.push({
        rowIndex: rows.length,
        i,
        section: 'lower',
        spaces,
        stars,
        content: ' '.repeat(spaces) + char.repeat(stars),
      });
    }
  }

  return rows;
}

export function generateAsciiArt(
  n: number,
  pattern: PatternType = 'diamond',
  starChar: string = '*'
): string {
  const rows = generatePatternRows(n, pattern, starChar);
  return rows.map((r) => r.content).join('\n');
}

/**
 * Builds step-by-step debugger sequence for loop execution
 */
export function buildSimulationSteps(n: number, starChar: string = '*'): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const completedRows: string[] = [];
  const char = starChar || '*';

  // Upper part: i from 0 to n
  for (let i = 0; i <= n; i++) {
    const targetSpaces = n - i;
    const targetStars = 2 * i + 1;
    let currentBuffer = '';

    // Step: Loop Header i
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'init',
      section: 'upper',
      i,
      currentRowSpaces: 0,
      currentRowStars: 0,
      targetSpaces,
      targetStars,
      activeCodeLine: 1, // for (int i = 0; i <= n; i++)
      description: `Üst Döngü: i = ${i} başladı. Bu satır için ${targetSpaces} boşluk ve ${targetStars} yıldız basılacak.`,
      completedRows: [...completedRows],
      currentRowBuffer: '',
    });

    // Step: Spaces loop j
    for (let j = 0; j < targetSpaces; j++) {
      currentBuffer += ' ';
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        phase: 'spaces',
        section: 'upper',
        i,
        j,
        currentRowSpaces: j + 1,
        currentRowStars: 0,
        targetSpaces,
        targetStars,
        activeCodeLine: 2, // for (int j = 0; j < (n - i); j++)
        description: `Boşluk Döngüsü: j = ${j} için ' ' basılıyor. (${j + 1}/${targetSpaces} boşluk)`,
        completedRows: [...completedRows],
        currentRowBuffer: currentBuffer,
      });
    }

    // Step: Stars loop k
    for (let k = 1; k <= targetStars; k++) {
      currentBuffer += char;
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        phase: 'stars',
        section: 'upper',
        i,
        k,
        currentRowSpaces: targetSpaces,
        currentRowStars: k,
        targetSpaces,
        targetStars,
        activeCodeLine: 3, // for (int k = 1; k <= (2 * i + 1); k++)
        description: `Yıldız Döngüsü: k = ${k} için '${char}' basılıyor. (${k}/${targetStars} yıldız)`,
        completedRows: [...completedRows],
        currentRowBuffer: currentBuffer,
      });
    }

    // Newline step
    completedRows.push(currentBuffer);
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'newline',
      section: 'upper',
      i,
      currentRowSpaces: targetSpaces,
      currentRowStars: targetStars,
      targetSpaces,
      targetStars,
      activeCodeLine: 4, // System.out.println();
      description: `Satır sonu: println() çağrıldı, imleç bir alt satıra geçti.`,
      completedRows: [...completedRows],
      currentRowBuffer: '',
    });
  }

  // Lower part: i from n - 1 down to 0
  for (let i = n - 1; i >= 0; i--) {
    const targetSpaces = n - i;
    const targetStars = 2 * i + 1;
    let currentBuffer = '';

    // Step: Lower Loop Header i
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'init',
      section: 'lower',
      i,
      currentRowSpaces: 0,
      currentRowStars: 0,
      targetSpaces,
      targetStars,
      activeCodeLine: 5, // for (int i = n - 1; i >= 0; i--)
      description: `Alt Döngü: i = ${i} geri sayım. Bu satır için ${targetSpaces} boşluk ve ${targetStars} yıldız basılacak.`,
      completedRows: [...completedRows],
      currentRowBuffer: '',
    });

    // Spaces
    for (let j = 0; j < targetSpaces; j++) {
      currentBuffer += ' ';
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        phase: 'spaces',
        section: 'lower',
        i,
        j,
        currentRowSpaces: j + 1,
        currentRowStars: 0,
        targetSpaces,
        targetStars,
        activeCodeLine: 6,
        description: `Alt Boşluk Döngüsü: j = ${j} için ' ' basılıyor. (${j + 1}/${targetSpaces} boşluk)`,
        completedRows: [...completedRows],
        currentRowBuffer: currentBuffer,
      });
    }

    // Stars
    for (let k = 1; k <= targetStars; k++) {
      currentBuffer += char;
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        phase: 'stars',
        section: 'lower',
        i,
        k,
        currentRowSpaces: targetSpaces,
        currentRowStars: k,
        targetSpaces,
        targetStars,
        activeCodeLine: 7,
        description: `Alt Yıldız Döngüsü: k = ${k} için '${char}' basılıyor. (${k}/${targetStars} yıldız)`,
        completedRows: [...completedRows],
        currentRowBuffer: currentBuffer,
      });
    }

    completedRows.push(currentBuffer);
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'newline',
      section: 'lower',
      i,
      currentRowSpaces: targetSpaces,
      currentRowStars: targetStars,
      targetSpaces,
      targetStars,
      activeCodeLine: 8,
      description: `Alt satır sonu: println() çağrıldı.`,
      completedRows: [...completedRows],
      currentRowBuffer: '',
    });
  }

  // Complete step
  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    phase: 'complete',
    section: 'lower',
    i: 0,
    currentRowSpaces: 0,
    currentRowStars: 0,
    targetSpaces: 0,
    targetStars: 0,
    activeCodeLine: 9,
    description: `Elmas deseni başarıyla tamamlandı! Hazırlayan: Enes Öztürk`,
    completedRows: [...completedRows],
    currentRowBuffer: '',
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
