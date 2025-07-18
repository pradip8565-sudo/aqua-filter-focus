
import { MapPin, Phone, Mail, Globe } from "lucide-react";

interface ContactInfo {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  website: string;
}

interface ProductFooterProps {
  contactInfo: ContactInfo;
}

export const ProductFooter = ({ contactInfo }: ProductFooterProps) => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">
            {contactInfo.businessName}
          </h3>
          <div className="space-y-3 sm:space-y-2 text-muted-foreground">
            <p className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="text-center">{contactInfo.address}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <p className="flex items-center gap-2 text-sm sm:text-base">
                <Phone className="h-4 w-4 flex-shrink-0" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center gap-2 text-sm sm:text-base">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {contactInfo.email}
              </p>
            </div>
            <p className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <Globe className="h-4 w-4 flex-shrink-0" />
              {contactInfo.website}
            </p>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              © 2025 {contactInfo.businessName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
