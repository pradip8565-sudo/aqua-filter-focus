
import { Phone, Mail, MapPin, Globe, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ContactInfo {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  website: string;
}

interface ProductHeaderProps {
  contactInfo: ContactInfo;
  shopImageUrl?: string;
}

export const ProductHeader = ({ contactInfo, shopImageUrl }: ProductHeaderProps) => {
  return (
    <header className="bg-card border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex justify-between items-start mb-6">
          <div className="text-center flex-1">
            {shopImageUrl && (
              <div className="mb-4 flex justify-center">
                <img
                  src={shopImageUrl}
                  alt="Mahadev Enterprise"
                  className="h-20 w-auto object-contain rounded-lg"
                />
              </div>
            )}
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
              {contactInfo.businessName}
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4">
              {contactInfo.tagline}
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Link to="/admin-login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Admin Login</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-foreground text-sm sm:text-base">{contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-foreground text-sm sm:text-base truncate">{contactInfo.email}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-foreground text-sm sm:text-base">{contactInfo.website}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-foreground text-sm sm:text-base">Amreli, Gujarat</span>
          </div>
        </div>
      </div>
    </header>
  );
};
