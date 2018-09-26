import { Unit } from './../../modules/main/home/components/unit/Unit';

export class UserStatistics {
  id: string;
  score: number;
  total: number;
  createdAt: Date;
  username: string;
  unit: Unit;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class UserStatisticsInsertionData {
  score: number;
  total: number;
  unitId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export function mapToUserStatistics(data: any): UserStatistics {
  return new UserStatistics({
    id: data.id,
    score: data.score,
    total: data.total,
    createdAt: new Date(data.createdAt),
    username: data.username,
    unit: new Unit(data.unit)
  });
}