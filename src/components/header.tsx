"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "./logout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onRequestInvitation?: () => void;
}

export default function Header({ onRequestInvitation }: HeaderProps) {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <EliteConnectLogo size={40} />
          <span className="text-lg font-semibold tracking-wide">Elite Connect</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm">
          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowAboutDropdown(true)}
            onMouseLeave={() => setShowAboutDropdown(false)}
          >
            <button className="hover:opacity-60 transition-opacity duration-300">
              About
            </button>
            {showAboutDropdown && (
              <div className="absolute top-full left-0 pt-2 w-64 animate-slide-down">
                <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Who We Are
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Our Values
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Membership Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowMembershipDropdown(true)}
            onMouseLeave={() => setShowMembershipDropdown(false)}
          >
            <button className="hover:opacity-60 transition-opacity duration-300">
              Membership
            </button>
            {showMembershipDropdown && (
              <div className="absolute top-full left-0 pt-2 w-64 animate-slide-down">
                <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link
                    href="/membership"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Join the Community
                  </Link>
                  <Link
                    href="/membership"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Membership Tiers
                  </Link>
                  <Link
                    href="/membership"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Privileges & Benefits
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Events Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowEventsDropdown(true)}
            onMouseLeave={() => setShowEventsDropdown(false)}
          >
            <button className="hover:opacity-60 transition-opacity duration-300">
              Events
            </button>
            {showEventsDropdown && (
              <div className="absolute top-full left-0 pt-2 w-64 animate-slide-down">
                <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link
                    href="/events"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    href="/events"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Past Events
                  </Link>
                  <Link
                    href="/events"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]"
                  >
                    Private Experiences
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300">
            Investment
          </Link>
          <Link href="/consulting" className="hover:opacity-60 transition-opacity duration-300">
            Consulting
          </Link>
          <Link href="/journal" className="hover:opacity-60 transition-opacity duration-300">
            Journal
          </Link>
          <Link href="/partners" className="hover:opacity-60 transition-opacity duration-300">
            Partners
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {loading ? (
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
          ) : user ? (
            <>
              <Link href="/portal">
                <Button className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90 uppercase tracking-wide text-sm">
                  Portail
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-300">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/portal">Mon Portail</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/portal">Mon Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div className="w-full">
                      <LogoutButton />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] uppercase tracking-wide text-sm"
                >
                  Membre
                </Button>
              </Link>
              <Link
                href="/membership"
                className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-wide inline-block"
              >
                Request Invitation
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

