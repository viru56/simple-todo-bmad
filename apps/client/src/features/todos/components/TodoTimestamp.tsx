import { formatDate } from '../../../lib/date';

interface TodoTimestampProps {
  label: string;
  isoString: string;
}

export function TodoTimestamp({ label, isoString }: TodoTimestampProps) {
  return (
    <time
      dateTime={isoString}
      title={new Date(isoString).toLocaleString()}
      className="text-xs text-muted-foreground"
    >
      {label} {formatDate(isoString)}
    </time>
  );
}
