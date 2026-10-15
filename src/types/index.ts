export type PoolCategory = 'kota' | 'tangsel' | 'kab' | 'non';
export type Role = 'murid' | 'guru';

export interface Pool {
  id: number; name: string; address: string; lat: number; lng: number;
  category: PoolCategory; priceRegular: number; pricePrivate: number;
}
export interface Teacher { id: number; name: string; license: string; days: number[]; poolIds: number[] }
export interface Stats { students: number; teachers: number; pools: number }
export interface Paged<T> { data: T[]; total: number; error?: string }

export interface Registration {
  status: 'approved' | 'rejected' | 'pending';
  rejectReason?: string;
  data: Record<string, any>;
  price?: number; done?: number; method?: string;
  slots?: string[]; reqs?: string[];
}
export interface UserProfile { email: string; name: string; role: Role | null; registration?: Registration }
