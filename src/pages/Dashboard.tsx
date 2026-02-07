import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  CalendarDays,
  DollarSign,
  Bell,
  Church,
  LayoutDashboard,
  UserPlus,
  TrendingUp,
  Clock,
  ChevronLeft,
  Menu,
  X,
  Settings,
  LogOut,
  BookOpen,
  Heart,
} from "lucide-react";

// Mock data
const stats = [
  { label: "Total Jemaat", value: "524", icon: Users, change: "+12 bulan ini" },
  { label: "Kehadiran Minggu Lalu", value: "387", icon: TrendingUp, change: "74% hadir" },
  { label: "Acara Bulan Ini", value: "8", icon: CalendarDays, change: "3 mendatang" },
  { label: "Persembahan Bulan Ini", value: "Rp 45.2 Jt", icon: DollarSign, change: "+8% dari bulan lalu" },
];

const recentMembers = [
  { name: "Maria Susanti", date: "2 hari lalu", status: "Anggota Baru" },
  { name: "Budi Hartono", date: "5 hari lalu", status: "Pindahan" },
  { name: "Sarah Wijaya", date: "1 minggu lalu", status: "Anggota Baru" },
  { name: "Yohanes Pratama", date: "2 minggu lalu", status: "Baptis" },
];

const upcomingEvents = [
  { name: "Ibadah Paskah", date: "20 Apr 2026", time: "09:00", type: "Ibadah" },
  { name: "Retreat Pemuda", date: "25-27 Apr 2026", time: "08:00", type: "Kegiatan" },
  { name: "Bakti Sosial", date: "3 Mei 2026", time: "07:00", type: "Pelayanan" },
  { name: "Perayaan Natal Anak", date: "15 Mei 2026", time: "10:00", type: "Ibadah" },
];

const announcements = [
  { title: "Pendaftaran Baptisan Dibuka", content: "Pendaftaran baptisan untuk bulan Juni telah dibuka. Hubungi sekretariat gereja.", urgent: true },
  { title: "Jadwal Latihan Paduan Suara", content: "Latihan paduan suara dipindahkan ke hari Jumat pukul 18:00.", urgent: false },
  { title: "Donasi Bencana Alam", content: "Gereja mengumpulkan donasi untuk korban bencana. Silakan salurkan melalui majelis.", urgent: false },
];

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Jemaat" },
  { icon: CalendarDays, label: "Acara" },
  { icon: BookOpen, label: "Kelompok Sel" },
  { icon: Heart, label: "Pelayanan" },
  { icon: DollarSign, label: "Keuangan" },
  { icon: Bell, label: "Pengumuman" },
  { icon: Settings, label: "Pengaturan" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6 flex items-center gap-2">
          <Church className="h-6 w-6 text-sidebar-primary" />
          <span className="font-display text-lg font-bold text-sidebar-foreground">
            GKI Anugerah
          </span>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                link.active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-sidebar flex flex-col animate-fade-in">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Church className="h-6 w-6 text-sidebar-primary" />
                <span className="font-display text-lg font-bold text-sidebar-foreground">
                  GKI Anugerah
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 space-y-1">
              {sidebarLinks.map((link) => (
                <button
                  key={link.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    link.active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-sidebar-border">
              <Link to="/">
                <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-xs font-bold text-accent-foreground">AK</span>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          {/* Welcome */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Selamat Datang, Admin 👋
            </h2>
            <p className="text-muted-foreground mt-1">
              Berikut ringkasan aktivitas gereja hari ini.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground font-display">
                  {stat.value}
                </div>
                <span className="text-xs text-muted-foreground mt-1">{stat.change}</span>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Members */}
            <div className="lg:col-span-1 rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Jemaat Terbaru
                </h3>
                <Button variant="ghost" size="sm">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Tambah
                </Button>
              </div>
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{member.date}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium shrink-0">
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-1 rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Acara Mendatang
                </h3>
                <Button variant="ghost" size="sm">Lihat Semua</Button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.name}
                    className="flex items-start gap-3 pl-3 border-l-2 border-accent/30"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {event.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <CalendarDays className="h-3 w-3" />
                        {event.date}
                        <Clock className="h-3 w-3 ml-1" />
                        {event.time}
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="lg:col-span-1 rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Pengumuman
                </h3>
                <Button variant="ghost" size="sm">Tambah</Button>
              </div>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.title} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {announcement.urgent && (
                        <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                      )}
                      <p className="text-sm font-medium text-foreground">
                        {announcement.title}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {announcement.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
