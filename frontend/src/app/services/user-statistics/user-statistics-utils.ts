import { Unit } from "../../modules/main/home/components/unit/Unit";
import { UserStatistics } from "./UserStatistics";


export function mapToUserStatistics(data: any): UserStatistics {
  return {
    id: data.id,
    score: data.score,
    total: data.total,
    createdAt: new Date(data.createdAt),
    username: data.username,
    unit: new Unit(data.unit)
  };
}