export interface AmpouleData {
    Id: string;
    ImageSrc: string;
  }

export interface SetData {
    SetId: string;
    TargetDrug: string;
    TimeLimit: number;
    Ampoules: AmpouleData[];
    Group?: number;
  }

export interface SetResult {
    SessionId?: string;
    SetId: string;
    SelectedAmpoule: string;
    Time: number;
    Sequence?: number;
    Correct?: boolean;
  }

export interface Result {
    SetId: string;
    TargetDrug: string;
    Time: number;
    Ampoules: AmpouleData[];
    SelectedAmpoule: string;
    CorrectAmpoule: string;
    Sequence: number;
  }
