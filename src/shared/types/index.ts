export interface BundleItem {
  name: string;
  tags?: string[];
}

export interface Bundle {
  name: string;
  icon: string;
  amount: number;
  reward?: string;
  items: BundleItem[];
}

export interface Room {
  name: string;
  description?: string;
  reward?: string;
  amount: number;
  bundles: Bundle[];
}

export interface BundleCategory {
  name: string;
  rooms: Room[];
}

export interface Database {
  bundles: BundleCategory[];
}
