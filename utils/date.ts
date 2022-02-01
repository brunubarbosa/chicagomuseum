import { format, parseISO } from "date-fns";
import { DATE_FORMAT } from "../constants/date";

interface GetExhibitionDateFormatedProps {
  start: string | null;
  finish: string | null;
}

export const getExhibitionDateFormated = ({
  aic_start_at,
  aic_end_at,
}: GetExhibitionDateFormatedProps | any) => {
  const startDate = aic_start_at
    ? format(parseISO(aic_start_at), DATE_FORMAT)
    : "-";

  const endDate = aic_end_at ? format(parseISO(aic_end_at), DATE_FORMAT) : "-";

  return `${startDate} - ${endDate}`;
};
