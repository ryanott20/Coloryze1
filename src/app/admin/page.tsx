"use client";

import React, { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import { UserNav } from "@/components/UserNav";
import { useRouter } from "next/navigation";

type Review = {
  id: number;
  uid: string;
  name: string;
  email: string;
  school: string;
  review_completed: boolean;
  due_date: string;
  answered_questions: boolean;
  plan: string;
};

const AdminReviews: React.FC = () => {
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showUnansweredQuestions, setShowUnansweredQuestions] = useState(false);
  const [showCompleteReviews, setShowCompleteReviews] = useState(false);
  const [showFreePlans, setShowFreePlans] = useState(false);
  const [showUnansweredUserQuestions, setShowUnansweredUserQuestions] =
    useState(false);

  useEffect(() => {
    fetchReviews();
  }, [
    showUnansweredQuestions,
    showCompleteReviews,
    showFreePlans,
    showUnansweredUserQuestions,
  ]);

  const fetchReviews = async () => {
    const supabase = createSupabaseBrowserClient();
    let query = supabase
      .from("users")
      .select(
        "id, uid, name, email, school, review_completed, due_date, answered_questions, plan"
      )
      .order("due_date", { ascending: true });

    if (!showUnansweredQuestions) {
      query = query.eq("answered_questions", true);
    }

    if (!showCompleteReviews) {
      query = query.eq("review_completed", false);
    }

    if (!showFreePlans) {
      query = query.neq("plan", "free");
    }

    const { data: userData, error } = await query;

    if (error) {
      console.error("Error fetching reviews:", error);
      return;
    }

    const userIds = userData.map((user) => user.uid); // Use the 'uid' field instead of 'id'
    const { data: questionData, error: questionError } = await supabase
      .from("user_questions")
      .select("user_id, answer")
      .in("user_id", userIds);

    if (questionError) {
      console.error("Error fetching user questions:", questionError);
      return;
    }

    const reviewsWithUnansweredQuestions = userData.map((user) => {
      const userQuestions = questionData.filter(
        (question) => question.user_id === user.uid // Use the 'uid' field instead of 'id'
      );
      const unansweredQuestions = userQuestions.filter(
        (question) => question.answer === null || question.answer === ""
      ).length;

      return {
        ...user,
        unanswered_questions: unansweredQuestions,
      };
    });

    if (showUnansweredUserQuestions) {
      const filteredReviews = reviewsWithUnansweredQuestions.filter(
        (review) => review.unanswered_questions > 0
      );
      setReviews(filteredReviews);
    } else {
      setReviews(reviewsWithUnansweredQuestions);
    }
  };

  // ...

  const columns: ColumnDef<Review>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => handleReviewClick(row.original.id)}
        >
          {row.original.id}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => handleReviewClick(row.original.id)}
        >
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => handleReviewClick(row.original.id)}
        >
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => handleReviewClick(row.original.id)}
        >
          {row.original.plan}
        </div>
      ),
    },
    {
      accessorKey: "answered_questions",
      header: "Answered Questions?",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => handleReviewClick(row.original.id)}
        >
          {row.original.answered_questions ? "Yes" : "No"}
        </div>
      ),
    },
    {
      accessorKey: "unanswered_questions",
      header: "Unanswered Questions",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => handleReviewClick(row.original.id)}
        >
          {row.original.unanswered_questions}
        </div>
      ),
    },
    {
      accessorKey: "review_completed",
      header: "Review Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.review_completed ? "secondary" : "destructive"}
        >
          {row.original.review_completed ? "Completed" : "Incomplete"}
        </Badge>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => {
        const dueDate = new Date(row.original.due_date);
        return <span>{dueDate.toLocaleDateString()}</span>;
      },
      sortingFn: (a, b) => {
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return dateB.getTime() - dateA.getTime(); // Sort in descending order
      },
    },
    {
      accessorKey: "due_date",
      header: "Time Left",
      cell: ({ row }) => {
        const dueDate = new Date(row.original.due_date);
        const currentDate = new Date();
        const timeDiff = dueDate.getTime() - currentDate.getTime();
        //convert the timeDiff to something human readable
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return (
          <span>
            {days}D, {hours}H, {minutes}M. {seconds}S
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleReviewClick = (reviewId: number) => {
    router.push(`/admin/${reviewId}`);
  };

  return (
    <div className="flex flex-col md:flex">
      <div className="border-b">
        <UserNav />
      </div>
      <div className="lg:px-48 md:px-24 py-12">
        <h1>Admin Reviews</h1>
        <div className="flex items-center mb-4">
          <label className="mr-2">
            <input
              type="checkbox"
              checked={showUnansweredQuestions}
              onChange={() =>
                setShowUnansweredQuestions(!showUnansweredQuestions)
              }
            />
            Show Unanswered Questions
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={showCompleteReviews}
              onChange={() => setShowCompleteReviews(!showCompleteReviews)}
            />
            Show Complete Reviews
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={showFreePlans}
              onChange={() => setShowFreePlans(!showFreePlans)}
            />
            Show Free Plans
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={showUnansweredUserQuestions}
              onChange={() =>
                setShowUnansweredUserQuestions(!showUnansweredUserQuestions)
              }
            />
            Show Users with Unanswered Questions
          </label>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {table.getRowModel().rows.length}
              </span>{" "}
              results
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
