import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ContactBlockProps = {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours?: string | null;
};

export function ContactBlock({
  address,
  phone,
  email,
  openingHours,
}: ContactBlockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact &amp; Hours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        {address ? (
          <p className="whitespace-pre-line">{address}</p>
        ) : (
          <p>123 Main Street, Your City</p>
        )}
        {phone ? (
          <p>
            <a href={`tel:${phone}`} className="hover:text-foreground transition-colors">
              {phone}
            </a>
          </p>
        ) : (
          <p><a href="tel:+15551234567" className="hover:text-foreground transition-colors">+1 (555) 123-4567</a></p>
        )}
        {email ? (
          <p>
            <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">
              {email}
            </a>
          </p>
        ) : (
          <p><a href="mailto:hello@pizza.example" className="hover:text-foreground transition-colors">hello@pizza.example</a></p>
        )}
        {openingHours ? (
          <p className="pt-2">{openingHours}</p>
        ) : (
          <p className="pt-2">Mon–Sun: 11:00 – 22:00</p>
        )}
      </CardContent>
    </Card>
  );
}
