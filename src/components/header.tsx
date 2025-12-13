"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from '@/i18n/routing';
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "./logout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  onRequestInvitation?: () => void;
}

export default function Header({ onRequestInvitation }: HeaderProps) {
  const pathname = usePathname();
  // Remove locale from pathname for comparison
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en)/, '') || pathname;
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMembershipOpen, setMobileMembershipOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
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
    <header className="w-full bg-[#F7F5F0]/80 backdrop-blur-xl fixed top-0 z-50 border-b border-gray-300/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/logo-elite-connect.png"
            alt="Elite Connect Logo"
            width={50}
            height={50}
            className="object-contain sm:w-16 sm:h-16"
            style={{ maxWidth: '64px', maxHeight: '64px' }}
            style={{ maxWidth: '60px', maxHeight: '60px' }}
          />
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

            <Link 
              href="/partners" 
              className={`hover:opacity-60 transition-opacity duration-300 ${
                pathnameWithoutLocale === '/partners' ? 'font-medium text-[#D4AF37]' : ''
              }`}
            >
              Partners
            </Link>

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

        {/* Menu Hamburger Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0A0A0A] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-white border-b border-gray-200 shadow-lg z-40 max-h-[calc(100vh-73px)] overflow-y-auto">
          <nav className="px-4 py-6 space-y-4">
            {/* About Mobile */}
            <div>
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="w-full flex items-center justify-between text-left text-sm font-medium text-[#0A0A0A] py-2 hover:text-[#D4AF37] transition-colors"
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Who We Are
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Our Values
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/partners"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-medium py-2 hover:text-[#D4AF37] transition-colors ${
                pathnameWithoutLocale === '/partners' ? 'text-[#D4AF37]' : 'text-[#0A0A0A]'
              }`}
            >
              Partners
            </Link>

            {/* Membership Mobile */}
            <div>
              <button
                onClick={() => setMobileMembershipOpen(!mobileMembershipOpen)}
                className="w-full flex items-center justify-between text-left text-sm font-medium text-[#0A0A0A] py-2 hover:text-[#D4AF37] transition-colors"
              >
                Membership
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileMembershipOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileMembershipOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/membership"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Join the Community
                  </Link>
                  <Link
                    href="/membership"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Membership Tiers
                  </Link>
                  <Link
                    href="/membership"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Privileges & Benefits
                  </Link>
                </div>
              )}
            </div>

            {/* Events Mobile */}
            <div>
              <button
                onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                className="w-full flex items-center justify-between text-left text-sm font-medium text-[#0A0A0A] py-2 hover:text-[#D4AF37] transition-colors"
              >
                Events
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileEventsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileEventsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Past Events
                  </Link>
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-[#2C2C2C] hover:text-[#D4AF37] transition-colors"
                  >
                    Private Experiences
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/investment"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#0A0A0A] py-2 hover:text-[#D4AF37] transition-colors"
            >
              Investment
            </Link>
            <Link
              href="/consulting"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#0A0A0A] py-2 hover:text-[#D4AF37] transition-colors"
            >
              Consulting
            </Link>
            <Link
              href="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#0A0A0A] py-2 hover:text-[#D4AF37] transition-colors"
            >
              Journal
            </Link>

            {/* Actions Mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {loading ? (
                <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
              ) : user ? (
                <>
                  <Link href="/portal" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                    <Button className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90 uppercase tracking-wide text-sm">
                      Portail
                    </Button>
                  </Link>
                  <div className="px-4 py-2 text-sm text-[#2C2C2C]">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </div>
                  <div className="w-full">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] uppercase tracking-wide text-sm"
                    >
                      Membre
                    </Button>
                  </Link>
                  <Link
                    href="/membership"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center border border-[#D4AF37] text-[#D4AF37] px-6 py-3 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-wide"
                  >
                    Request Invitation
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

