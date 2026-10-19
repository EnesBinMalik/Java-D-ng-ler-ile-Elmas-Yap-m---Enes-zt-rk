export type PatternType = 'diamond' | 'triangle' | 'hollow_diamond' | 'inverted_triangle' | 'hourglass';

export interface RowData {
  rowIndex: number;
  i: number;
  section: 'upper' | 'center' | 'lower';
  spaces: number;
  stars: number;
  content: string; // The row string
  isHollow?: boolean;
}

export interface SimulationStep {
  stepIndex: number;
  totalSteps: number;
  phase: 'init' | 'spaces' | 'stars' | 'newline' | 'complete';
  section: 'upper' | 'lower';
  i: number;
  j?: number;
  k?: number;
  currentRowSpaces: number;
  currentRowStars: number;
  targetSpaces: number;
  targetStars: number;
  activeCodeLine: number;
  description: string;
  completedRows: string[];
  currentRowBuffer: string;
}
