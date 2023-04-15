import { IDate } from "./IDate";
import { IDay } from "./IDay";

export interface IDayProps {
    day: IDay;
    onClickHandler: () => void;
    initialDate: IDate;
    date: IDate;
    selectedDate: IDate;
    color?: string;
    size?: number;
}