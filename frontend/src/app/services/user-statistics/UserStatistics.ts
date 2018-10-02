import { Unit } from './../../modules/main/home/components/unit/Unit';

export interface UserStatistics {
  id: string;
  score: number;
  total: number;
  createdAt: Date;
  username: string;
  unit: Unit;
}