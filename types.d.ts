type Level = Readonly<{
  title: string;
  initialCells: readonly (readonly boolean[])[];
  voidCells: readonly string[];
}>;
