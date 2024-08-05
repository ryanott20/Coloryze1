"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { FaClock } from "react-icons/fa";

const CountdownTimer: React.FC<{ userData: any }> = ({ userData }) => {
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [progress, setProgress] = useState(100);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    if (userData && userData.due_date) {
      setDueDate(new Date(userData.due_date));
    }
  }, [userData]);

  useEffect(() => {
    const calculateCountdown = () => {
      if (dueDate) {
        const currentDate = new Date();
        const totalDuration = dueDate.getTime() - currentDate.getTime();
        const remainingDuration = dueDate.getTime() - currentDate.getTime();

        if (remainingDuration > 0) {
          const remainingPercentage = Math.floor(
            (remainingDuration / totalDuration) * 100
          );
          const remainingSeconds = Math.floor(remainingDuration / 1000);

          const days = Math.floor(remainingSeconds / (60 * 60 * 24));
          const hours = Math.floor(
            (remainingSeconds % (60 * 60 * 24)) / (60 * 60)
          );
          const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
          const seconds = Math.floor(remainingSeconds % 60);

          // setCountdownTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
          setProgress(remainingPercentage);
        } else {
          // setCountdownTimer("Review due date has passed");
          setProgress(0);
        }
      } else {
        // setCountdownTimer("Review due date has passed");
        setProgress(0);
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dueDate]);

  return (
    <Card className="shadow-md p-6 bg-white rounded-lg ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FaClock className="inline-block mr-2 text-blue-500" />
          Review Countdown
        </CardTitle>
        <CardDescription>
          Time remaining for us to review your application
        </CardDescription>
      </CardHeader>
      <div className="flex items-center justify-center mb-4">
        <Progress value={progress} max={100} className="w-full h-4" />
      </div>
      <p className="text-2xl xl:text-4xl font-bold text-center mb-5">
        {countdownTimer}
      </p>
    </Card>
  );
};

export default CountdownTimer;
