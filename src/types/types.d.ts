type Mutable<T> = {
  -readonly [key in keyof T]: T[key];
};

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type InitialCells = readonly (readonly boolean[])[];

type VoidCells = readonly string[];

type Level = Readonly<{
  title: string;
  initialCells: InitialCells;
  voidCells: VoidCells;
}>;

type ControlMode = 'Touch' | 'Swipes';
