import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { services } from "@/data/service-data";
import { SeoAnalysisPanel } from "./service-section/seo-analysis-panel";
import { ServiceCtaPanel } from "./service-section/service-cta-panel";

const SEO_SERVICE_ID = "seo-analysis";

export const ServiceSection = () => {
  return (
    <>
      {services.map((service) => (
        <TabsContent key={service.id} value={service.id}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {service.icon}
                <span>{service.title}</span>
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {service.id === SEO_SERVICE_ID ? (
                <SeoAnalysisPanel />
              ) : (
                <ServiceCtaPanel
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  lines={service.text}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </>
  );
};
