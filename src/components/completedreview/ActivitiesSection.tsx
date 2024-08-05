// components/ActivitiesSection.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { FaTrophy } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ActivitiesSection: React.FC<{ userData: any }> = ({ userData }) => {
  //if can't parse anything return nothing

  try {
    console.log(userData.activities_section_common_app);

    let activities = userData.activities_section_common_app || [];

    //if it isn't an array then try to parse it
    if (typeof activities !== "object") {
      activities = JSON.parse(activities);
    }

    console.log(activities);

    return (
      <Card className="p-6 bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <FaTrophy className="inline-block mr-2 text-yellow-500" />
            Activities Section
          </CardTitle>
          <CardDescription>
            Example common application activity section including detailed
            descriptions we created based on your information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <Accordion type="multiple">
              {activities.map((activity, index) => (
                <AccordionItem key={index} value={`activity-${index}`}>
                  <AccordionTrigger>
                    {activity.positionLeadership}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-700 leading-relaxed">
                      <p>
                        <strong>
                          Organization Name (Max characters: 100):
                        </strong>{" "}
                        {activity.organizationName}
                      </p>
                      <p>
                        <strong>Description (Max characters: 150):</strong>{" "}
                        {activity.description}
                      </p>
                      <p>
                        <strong>Participation Grade Levels:</strong>{" "}
                        {activity.participationGradeLevels}
                      </p>
                      <p>
                        <strong>Timing of Participation:</strong>{" "}
                        {activity.timingOfParticipation}
                      </p>
                      <p>
                        <strong>Hours Per Week:</strong> {activity.hoursPerWeek}
                      </p>
                      <p>
                        <strong>Weeks Per Year:</strong> {activity.weeksPerYear}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-gray-500">No activities section available.</p>
          )}
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default ActivitiesSection;
