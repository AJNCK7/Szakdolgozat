export interface TimeTableInputInterface {
    ID: number;
    SUBJECT_GROUP: number
    DAY: string;
    SUBJECT_WEIGHT: string;
    CLASS_START_TIME: string;
    CLASS_END_TIME: string;
    CLASSROOM?: string;
    TEACHER?: string;
    CREDIT?: number;
    PRIORITY: number;
    COLOR: string;
}
