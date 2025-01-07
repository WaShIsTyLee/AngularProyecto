export interface BudgetItem {
    id?: string; // Used as Firestore ID
    category: string;     // Categoría del gasto o ingreso (ej. Alquiler, Comida, Sueldo)
    amount: number;
    type: 'income' | 'expense'; // Tipo: ingreso o gasto
}