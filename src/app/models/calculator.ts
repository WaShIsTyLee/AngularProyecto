export interface Calculator {
    id?: string;
    salary?: number;
    extraIncome?: number;
    homeExpenses?: {
        mortgage?: number;
        homeInsurance?: number;
        homeMaintenance?: number;
        internet?: number;
        phone?: number;
        food?: number;
    };
    transportExpenses?: {
        car?: number;
        carInsurance?: number;
        carMaintenance?: number;
        fuel?: number;
        publicTransport?: number;
        taxiUber?: number;
    };
    educationExpenses?: {
        education?: number;
        extracurriculars?: number;
        materials?: number;
    };
    otherExpenses?: {
        leisure?: number;
        vacations?: number;
        medical?: number;
        pets?: number;
        others?: number;
    };
    totalExpenses?: number;
    savings?: number;
    investments?: number;
    presupuestoDisponible?: number | null;
}
