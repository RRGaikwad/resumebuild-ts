"use client";

import { useNavigate } from "react-router-dom";

type TemplateCardProps = {
  title: string;
  description: string;
  image: string;
  templateId: string;
};

export function TemplateCard({ title, description, image, templateId }: TemplateCardProps) {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/form?template=${templateId}`);
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleSelect}
    >
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}