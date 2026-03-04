import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Store, Check, X, ShieldAlert, Loader2 } from 'lucide-react';

type Shop = Tables<'shops'>;

const AdminDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profileRole, setProfileRole] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [pendingShops, setPendingShops] = useState<Shop[]>([]);
  const [shopsLoading, setShopsLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfileLoading(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      setProfileRole(data?.role ?? null);
      setProfileLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    if (profileRole !== 'admin') return;
    (async () => {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('is_verified', false)
        .order('created_at', { ascending: false });
      if (!error) setPendingShops(data ?? []);
      setShopsLoading(false);
    })();
  }, [profileRole]);

  const handleApprove = async (shop: Shop) => {
    setApprovingId(shop.id);
    const { error } = await supabase
      .from('shops')
      .update({ is_verified: true })
      .eq('id', shop.id);
    setApprovingId(null);
    if (!error) setPendingShops((prev) => prev.filter((s) => s.id !== shop.id));
  };

  const handleReject = async (shop: Shop) => {
    if (!confirm(`Reject "${shop.name}"? This will remove the shop application.`)) return;
    setRejectingId(shop.id);
    const { error } = await supabase.from('shops').delete().eq('id', shop.id);
    setRejectingId(null);
    if (!error) setPendingShops((prev) => prev.filter((s) => s.id !== shop.id));
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    navigate('/auth', { replace: true });
    return null;
  }

  if (profileRole !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12 flex flex-col items-center justify-center gap-4">
          <ShieldAlert className="h-12 w-12 text-destructive" />
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="text-muted-foreground text-center max-w-md">
            You don’t have permission to view this page. Only administrators can access the admin dashboard.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin dashboard</h1>
          <p className="text-muted-foreground mt-1">Review and approve shop applications.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Pending shops ({pendingShops.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {shopsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : pendingShops.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No pending applications.</p>
            ) : (
              <div className="space-y-4">
                {pendingShops.map((shop) => (
                  <div
                    key={shop.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border border-border p-4"
                  >
                    <div className="flex-1 min-w-0 flex items-start gap-4">
                      {shop.logo ? (
                        <img
                          src={shop.logo}
                          alt=""
                          className="h-14 w-14 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          <Store className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{shop.name}</p>
                        <p className="text-sm text-muted-foreground">/{shop.slug}</p>
                        {shop.bio && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{shop.bio}</p>
                        )}
                        {shop.location && (
                          <p className="text-xs text-muted-foreground mt-1">{shop.location}</p>
                        )}
                        {shop.created_at && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Applied {new Date(shop.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(shop)}
                        disabled={approvingId === shop.id || rejectingId === shop.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {approvingId === shop.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(shop)}
                        disabled={approvingId === shop.id || rejectingId === shop.id}
                      >
                        {rejectingId === shop.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/shop/${shop.slug}`} target="_blank" rel="noopener noreferrer">
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
