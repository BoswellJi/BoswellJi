import { Local } from '@/utils/storage';
import { ref, type Ref } from 'vue';

interface CityType {
  id: number;
  name: string;
}

export function useStartCityId(): Ref<CityType> {
  const startcity: { value: CityType; time: string } = Local.get('startcity');
  return ref(startcity?.value);
}
