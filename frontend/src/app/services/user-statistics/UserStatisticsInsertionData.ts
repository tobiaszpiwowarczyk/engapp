
export class UserStatisticsInsertionData {
  score: number;
  total: number;
  unitId: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}