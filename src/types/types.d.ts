type Mutable<T> = {
  -readonly [key in keyof T]: T[key];
};

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type CellState = 'void' | 'empty' | 'peg';

type InitialCells = readonly (readonly CellState[])[];

type Level = Readonly<{
  title: string;
  initialCells: InitialCells;
}>;
