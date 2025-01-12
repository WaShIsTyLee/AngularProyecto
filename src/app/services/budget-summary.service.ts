import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  doc,
  docData,
  deleteDoc,
  CollectionReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BudgetItem } from '../models/BudgetItem'; // Modelo que representa el presupuesto

@Injectable({
  providedIn: 'root'
})
export class BudgetSummaryService {
  private budgetCollection: CollectionReference<BudgetItem>;

  constructor(private firestore: Firestore) {
    // Inicializamos la colección 'budgets' de Firestore
    this.budgetCollection = collection(this.firestore, 'budgets') as CollectionReference<BudgetItem>;
  }

  // Obtener todos los presupuestos
  getBudgets(): Observable<BudgetItem[]> {
    return collectionData(this.budgetCollection, { idField: 'id' }) as Observable<BudgetItem[]>;
  }

  // Obtener un presupuesto por ID
  getBudget(id: string): Observable<BudgetItem | null> {
    const budgetDocRef = doc(this.firestore, `budgets/${id}`);
    return docData(budgetDocRef) as Observable<BudgetItem | null>;
  }

  // Obtener el presupuesto de un usuario por UID
  getUserBudget(uid: string): Observable<BudgetItem | null> {
    const budgetDocRef = doc(this.firestore, `budgets/${uid}`);
    return docData(budgetDocRef) as Observable<BudgetItem | null>;
  }

  // Agregar un nuevo presupuesto
  addBudget(budget: BudgetItem): Promise<void> {
    return addDoc(this.budgetCollection, budget)
      .then(() => {
        console.log('Presupuesto agregado correctamente');
      })
      .catch((error) => {
        console.error('Error al agregar presupuesto: ', error);
        throw error;  // Re-lanzar el error para que el componente pueda manejarlo
      });
  }
  

  // Actualizar un presupuesto existente
  updateBudget(id: string, budget: Partial<BudgetItem>): Promise<void> {
    const budgetDocRef = doc(this.firestore, `budgets/${id}`);
    return updateDoc(budgetDocRef, budget) as Promise<void>;
  }

  // Eliminar un presupuesto
  deleteBudget(id: string): Promise<void> {
    const budgetDocRef = doc(this.firestore, `budgets/${id}`);
    return deleteDoc(budgetDocRef) as Promise<void>;
  }
}
