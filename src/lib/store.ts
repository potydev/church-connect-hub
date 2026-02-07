// localStorage-based data store for church management

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  joinDate: string;
  status: "Aktif" | "Tidak Aktif" | "Pindahan";
  gender: "Laki-laki" | "Perempuan";
  baptized: boolean;
}

export interface ChurchEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: "Ibadah" | "Kegiatan" | "Pelayanan" | "Rapat";
  description: string;
  status: "Mendatang" | "Berlangsung" | "Selesai";
}

export interface FinanceRecord {
  id: string;
  date: string;
  type: "Pemasukan" | "Pengeluaran";
  category: string;
  amount: number;
  description: string;
  recordedBy: string;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// Seed data
const defaultMembers: Member[] = [
  { id: generateId(), name: "Maria Susanti", email: "maria@email.com", phone: "081234567890", address: "Jl. Merpati No. 12", birthDate: "1985-03-15", joinDate: "2024-01-10", status: "Aktif", gender: "Perempuan", baptized: true },
  { id: generateId(), name: "Budi Hartono", email: "budi@email.com", phone: "081234567891", address: "Jl. Kenari No. 5", birthDate: "1978-07-22", joinDate: "2024-02-15", status: "Aktif", gender: "Laki-laki", baptized: true },
  { id: generateId(), name: "Sarah Wijaya", email: "sarah@email.com", phone: "081234567892", address: "Jl. Dahlia No. 8", birthDate: "1992-11-03", joinDate: "2024-03-20", status: "Aktif", gender: "Perempuan", baptized: false },
  { id: generateId(), name: "Yohanes Pratama", email: "yohanes@email.com", phone: "081234567893", address: "Jl. Mawar No. 3", birthDate: "1990-01-18", joinDate: "2024-04-05", status: "Aktif", gender: "Laki-laki", baptized: true },
  { id: generateId(), name: "Dewi Anggraini", email: "dewi@email.com", phone: "081234567894", address: "Jl. Melati No. 17", birthDate: "1988-09-30", joinDate: "2023-12-01", status: "Pindahan", gender: "Perempuan", baptized: true },
];

const defaultEvents: ChurchEvent[] = [
  { id: generateId(), name: "Ibadah Minggu", date: "2026-02-08", time: "09:00", location: "Gedung Utama", type: "Ibadah", description: "Ibadah minggu rutin", status: "Mendatang" },
  { id: generateId(), name: "Retreat Pemuda", date: "2026-02-20", time: "08:00", location: "Villa Puncak", type: "Kegiatan", description: "Retreat tahunan pemuda gereja", status: "Mendatang" },
  { id: generateId(), name: "Bakti Sosial", date: "2026-03-01", time: "07:00", location: "Panti Asuhan Harapan", type: "Pelayanan", description: "Kunjungan dan donasi ke panti asuhan", status: "Mendatang" },
  { id: generateId(), name: "Rapat Majelis", date: "2026-02-10", time: "19:00", location: "Ruang Rapat", type: "Rapat", description: "Rapat bulanan majelis gereja", status: "Mendatang" },
];

const defaultFinance: FinanceRecord[] = [
  { id: generateId(), date: "2026-02-02", type: "Pemasukan", category: "Persembahan Minggu", amount: 15500000, description: "Persembahan ibadah minggu", recordedBy: "Admin" },
  { id: generateId(), date: "2026-02-02", type: "Pemasukan", category: "Perpuluhan", amount: 8200000, description: "Perpuluhan jemaat", recordedBy: "Admin" },
  { id: generateId(), date: "2026-02-03", type: "Pengeluaran", category: "Operasional", amount: 3500000, description: "Listrik, air, dan kebersihan", recordedBy: "Admin" },
  { id: generateId(), date: "2026-02-04", type: "Pengeluaran", category: "Pelayanan", amount: 2000000, description: "Dana pelayanan diakonia", recordedBy: "Admin" },
  { id: generateId(), date: "2026-01-26", type: "Pemasukan", category: "Persembahan Minggu", amount: 14800000, description: "Persembahan ibadah minggu", recordedBy: "Admin" },
  { id: generateId(), date: "2026-01-27", type: "Pengeluaran", category: "Perawatan", amount: 5000000, description: "Perbaikan atap gedung", recordedBy: "Admin" },
];

function getStore<T>(key: string, defaults: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(key, JSON.stringify(defaults));
  return defaults;
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Members CRUD
export const getMembers = (): Member[] => getStore("church_members", defaultMembers);
export const addMember = (member: Omit<Member, "id">): Member => {
  const members = getMembers();
  const newMember = { ...member, id: generateId() };
  members.push(newMember);
  setStore("church_members", members);
  return newMember;
};
export const updateMember = (id: string, data: Partial<Member>) => {
  const members = getMembers().map((m) => (m.id === id ? { ...m, ...data } : m));
  setStore("church_members", members);
};
export const deleteMember = (id: string) => {
  setStore("church_members", getMembers().filter((m) => m.id !== id));
};

// Events CRUD
export const getEvents = (): ChurchEvent[] => getStore("church_events", defaultEvents);
export const addEvent = (event: Omit<ChurchEvent, "id">): ChurchEvent => {
  const events = getEvents();
  const newEvent = { ...event, id: generateId() };
  events.push(newEvent);
  setStore("church_events", events);
  return newEvent;
};
export const updateEvent = (id: string, data: Partial<ChurchEvent>) => {
  const events = getEvents().map((e) => (e.id === id ? { ...e, ...data } : e));
  setStore("church_events", events);
};
export const deleteEvent = (id: string) => {
  setStore("church_events", getEvents().filter((e) => e.id !== id));
};

// Finance CRUD
export const getFinance = (): FinanceRecord[] => getStore("church_finance", defaultFinance);
export const addFinance = (record: Omit<FinanceRecord, "id">): FinanceRecord => {
  const records = getFinance();
  const newRecord = { ...record, id: generateId() };
  records.push(newRecord);
  setStore("church_finance", records);
  return newRecord;
};
export const updateFinance = (id: string, data: Partial<FinanceRecord>) => {
  const records = getFinance().map((r) => (r.id === id ? { ...r, ...data } : r));
  setStore("church_finance", records);
};
export const deleteFinance = (id: string) => {
  setStore("church_finance", getFinance().filter((r) => r.id !== id));
};
