import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export default function SettingCard({
  children,
  title,
  description,
  className,
}: SettingCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
