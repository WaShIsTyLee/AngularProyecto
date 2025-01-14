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
  CollectionReference,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseError } from '@firebase/util';
import { Calculator } from '../models/calculator';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private calculatorCollection: CollectionReference<Calculator>;

  constructor(private firestore: Firestore) {
    this.calculatorCollection = collection(this.firestore, 'calculator') as CollectionReference<Calculator>;
  }

  // Obtener todos los presupuestos
  getCalculators(): Observable<Calculator[]> {
    return collectionData(this.calculatorCollection, { idField: 'id' }) as Observable<Calculator[]>;
  }

  // Obtener un presupuesto por ID
  getCalculator(id: string): Observable<Calculator | null> {
    const calculatorDocRef = doc(this.firestore, `calculator/${id}`);
    return docData(calculatorDocRef) as Observable<Calculator | null>;
  }

  // Agregar un nuevo presupuesto
  addCalculator(calculator: Calculator): Promise<void> {
    return addDoc(this.calculatorCollection, calculator)
      .then(() => {
        console.log('Presupuesto agregado correctamente');
      })
      .catch((error: FirebaseError) => {  
        console.error('Error al agregar presupuesto: ', error);
        throw error;
      });
  }

  // Actualizar un presupuesto existente
  updateCalculator(id: string, calculator: Partial<Calculator>): Promise<void> {
    const calculatorDocRef = doc(this.firestore, `calculator/${id}`);
    return updateDoc(calculatorDocRef, calculator) as Promise<void>;
  }

  // Eliminar un presupuesto
  deleteCalculator(id: string): Promise<void> {
    const calculatorDocRef = doc(this.firestore, `calculator/${id}`);
    return deleteDoc(calculatorDocRef) as Promise<void>;
  }

  // Eliminar todos los presupuestos
  deleteAllCalculators(): Promise<void> {
    return getDocs(this.calculatorCollection)
      .then((querySnapshot) => {
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log('Todos los presupuestos fueron eliminados');
      })
      .catch((error: FirebaseError) => {
        console.error('Error al eliminar todos los presupuestos: ', error);
        throw error;
      });
  }

  // Método para guardar solo el presupuesto disponible
  addPresupuestoDisponible(presupuestoDisponible: number): Promise<void> {
    const newPresupuesto: Calculator = {
      presupuestoDisponible: presupuestoDisponible,
    };

    // Agregar solo el campo presupuestoDisponible a Firestore
    return addDoc(this.calculatorCollection, newPresupuesto)
      .then(() => {
        console.log('Presupuesto disponible guardado correctamente');
      })
      .catch((error: any) => {
        console.error('Error al guardar presupuesto disponible: ', error);
        throw error;
      });
  }
}
