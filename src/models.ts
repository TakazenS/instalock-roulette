export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface ValorantRouletteProps {
  agents: Agent[];
  winnerId: string | null;
  isSpinning: boolean;
  resetKey: number;
  onFinish?: () => void;
  duration: number;
}

export interface ValFilters {
  duelist: boolean;
  initiator: boolean;
  controller: boolean;
  sentinel: boolean;
}
