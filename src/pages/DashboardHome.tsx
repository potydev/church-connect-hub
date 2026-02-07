import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getMembers, getEvents, getFinance, type Member, type ChurchEvent, type FinanceRecord } from "@/lib/store";
import {
  Users, CalendarDays, DollarSign, TrendingUp, UserPlus, Clock, Loader2,
} from "lucide-react";

const DashboardHome = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [finance, setFinance] = useState<FinanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [m, e, f] = await Promise.all([getMembers(), getEvents(), getFinance()]);
        setMembers(m);
        setEvents(e);
        setFinance(f);
      } catch {
        // silently fail, pages will show their own errors
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalIncome = finance.filter((f) => f.type === "Pemasukan").reduce((sum, f) => sum + f.amount, 0);
  const totalExpense = finance.filter((f) => f.type === "Pengeluaran").reduce((sum, f) => sum + f.amount, 0);

  const stats = [
    { label: "Total Jemaat", value: members.length.toString(), icon: Users, change: `${members.filter((m) => m.status === "Aktif").length} aktif` },
    { label: "Total Acara", value: events.length.toString(), icon: CalendarDays, change: `${events.filter((e) => e.status === "Mendatang").length} mendatang` },
    { label: "Total Pemasukan", value: `Rp ${(totalIncome / 1_000_000).toFixed(1)} Jt`, icon: TrendingUp, change: "total" },
    { label: "Saldo", value: `Rp ${((totalIncome - totalExpense) / 1_000_000).toFixed(1)} Jt`, icon: DollarSign, change: "sisa bersih" },
  ];

  const recentMembers = members.slice(0, 4);
  const upcomingEvents = events.filter((e) => e.status === "Mendatang").slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Selamat Datang 👋
        </h2>
        <p className="text-muted-foreground mt-1">
          {user?.email ? `Login sebagai ${user.email}` : "Berikut ringkasan aktivitas gereja."}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground font-display">{stat.value}</div>
            <span className="text-xs text-muted-foreground mt-1">{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold text-foreground">Jemaat Terbaru</h3>
            <Link to="/dashboard/members">
              <Button variant="ghost" size="sm"><UserPlus className="h-4 w-4 mr-1" />Lihat Semua</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada data jemaat.</p>
            ) : (
              recentMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.phone}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium shrink-0">
                    {member.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold text-foreground">Acara Mendatang</h3>
            <Link to="/dashboard/events">
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada acara mendatang.</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 pl-3 border-l-2 border-accent/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.name}</p>
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
