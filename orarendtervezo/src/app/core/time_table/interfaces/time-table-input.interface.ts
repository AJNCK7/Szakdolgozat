export interface TimeTableInputInterface {
    ID: number;
    SUBJECT_NAME: string;
    DAY: string;
    SUBJECT_WEIGHT: string;
    CLASS_START_TIME: string;
    CLASS_END_TIME: string;
    CLASSROOM?: string;
    TEACHER?: string;
    CREDIT?: number;
    PRIORITY: number;
    SAME_SUBJECT?: number
    COLOR: string;
}
