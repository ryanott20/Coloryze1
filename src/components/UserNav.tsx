"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export function UserNav() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
  }
  //user data state
  const [userData, setUserData] = useState<any>(null);

  async function getUserData() {
    const supabase = createSupabaseBrowserClient();
    const session = await createSupabaseBrowserClient().auth.getSession();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", session.data.session?.user.id);

    if (data) setUserData(data[0]);
  }

  function initalizeFirstInitial(name: string | undefined | null): string {
    if (!name || typeof name !== 'string') {
      return '';
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  function getFirstInitial(name: string) {
    if (!name) return "";
    return name.charAt(0);
  }
  useEffect(() => {
    getUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center gap-8 h-16 items-center px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"animate-spin"}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    );
  }
  const showFreeIcon = userData.plan !== "free";
  console.log(userData.plan);

  return (
    <>
      {userData && (
        <>
          <div className="flex justify-center gap-8 h-16 items-center px-8">
            {/* Conditionally render the Badge component based on the 'answered_questions' field */}
              <Badge className="mt-0 bg-[#A80532]" variant="default">
                {initalizeFirstInitial(userData.plan)}
              </Badge>

            <Logo width={100} height={200} fill={"#004684"} />
            <div className="mt-1">
              {/* a badge of the user's plan with the first initial uppercase */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@account" />
                      <AvatarFallback>
                        {getFirstInitial(userData.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm font-medium leading-none">
                        {userData.name}
                      </div>
                      <div className="text-xs leading-none text-muted-foreground">
                        {userData.email}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </>
      )}
    </>
  );
}
