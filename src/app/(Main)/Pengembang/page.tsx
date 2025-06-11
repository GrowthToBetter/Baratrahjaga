import React from "react";
import { Mail, Globe, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SocialLinks {
  linkedin: string;
  email: string;
  website: string;
}

interface Developer {
  name: string;
  role: string;
  image?: string;
  social: SocialLinks;
}

interface SocialIconProps {
  type: keyof SocialLinks;
  link: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ type, link }) => {
  const iconProps = {
    size: 20,
    className: "text-gray-700 hover:text-blue-600 transition-colors",
  };

  const icons = {
    linkedin: <Linkedin {...iconProps} />,
    email: <Mail {...iconProps} />,
    website: <Globe {...iconProps} />,
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="p-2">
      {icons[type]}
    </a>
  );
};

const DeveloperInfoPage: React.FC = () => {
  const getInitials = (name: string): string => {
    const rawName = name.split(",")[0].trim();
    const parts = rawName.split(" ").filter(Boolean);

    if (parts.length === 0) return "";

    const firstInitial = parts[0][0];
    const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";

    return (firstInitial + lastInitial).toUpperCase();
  };

  const developers: Developer[] = [
    {
      name: "Jean Richnerd Rantabaratrahjaga",
      role: "Pengembang Situs",
      social: {
        linkedin: "https://linkedin.com/in/jean-richnerd-rantabaratrahjaga-1b17ba233",
        email: "baratrahjaga@gmail.com",
        website: "#",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Development Team
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Meet the talented developers behind this project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
          {developers.map((developer, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-6 relative">
                <Avatar className="w-48 h-48 border-4 border-white shadow-lg">
                  {developer.image && (
                    <AvatarImage src={developer.image} alt={developer.name} />
                  )}
                  <AvatarFallback className="text-4xl bg-blue-100 text-blue-600">
                    {getInitials(developer.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                {developer.name}
              </h2>
              <p className="text-blue-600 font-medium mb-6">{developer.role}</p>

              <div className="flex justify-center space-x-1">
                <SocialIcon type="linkedin" link={developer.social.linkedin} />
                <SocialIcon
                  type="email"
                  link={`mailto:${developer.social.email}`}
                />
                <SocialIcon type="website" link={developer.social.website} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfoPage;
