import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Mail, Send, Clock, Plus, Eye, List, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/untyped';
import { cn } from '@/lib/utils';

type EmailRecord = {
  id: string;
  subject: string;
  body: string;
  recipient_group: string;
  recipient_count: number;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  open_rate: number | null;
  created_at: string;
};

const RECIPIENT_GROUPS = [
  { value: 'all_users', label: 'All Users' },
  { value: 'inactive_users', label: 'Inactive Users' },
  { value: 'recent_buyers', label: 'Recent Buyers' },
  { value: 'new_users', label: 'New Users' },
];

const VARIABLES = [
  { value: '{{first_name}}', label: 'First Name' },
  { value: '{{store_name}}', label: 'Store Name' },
  { value: '{{email}}', label: 'Email' },
];

const SAMPLE_DATA: Record<string, string> = {
  '{{first_name}}': 'Tendai',
  '{{store_name}}': 'Tenga Marketplace',
  '{{email}}': 'tendai@example.com',
};

const PromotionalEmailSender = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientGroup, setRecipientGroup] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [showScheduler, setShowScheduler] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentEmails, setSentEmails] = useState<EmailRecord[]>([]);
  const [loadingLog, setLoadingLog] = useState(true);

  useEffect(() => {
    loadSentEmails();
  }, []);

  const loadSentEmails = async () => {
    const { data } = await supabase
      .from('promotional_emails')
      .select('*')
      .order('created_at', { ascending: false });
    setSentEmails((data as unknown as EmailRecord[]) ?? []);
    setLoadingLog(false);
  };

  const insertVariable = (variable: string) => {
    setBody((prev) => prev + variable);
  };

  const getPreviewText = (text: string) => {
    let result = text;
    Object.entries(SAMPLE_DATA).forEach(([key, val]) => {
      result = result.replaceAll(key, val);
    });
    return result;
  };

  const handleSend = async (scheduled: boolean) => {
    if (!subject.trim() || !body.trim() || !recipientGroup) {
      toast({ title: 'Missing fields', description: 'Please fill in subject, body, and recipient group.', variant: 'destructive' });
      return;
    }
    if (scheduled && !scheduleDate) {
      toast({ title: 'Missing date', description: 'Please select a schedule date.', variant: 'destructive' });
      return;
    }
    if (!user) return;

    setSending(true);
    let scheduledAt: string | null = null;
    if (scheduled && scheduleDate) {
      const [h, m] = scheduleTime.split(':').map(Number);
      const dt = new Date(scheduleDate);
      dt.setHours(h, m, 0, 0);
      scheduledAt = dt.toISOString();
    }

    const recipientLabel = RECIPIENT_GROUPS.find((g) => g.value === recipientGroup)?.label ?? recipientGroup;
    const estimatedCount = recipientGroup === 'all_users' ? 150 : recipientGroup === 'recent_buyers' ? 45 : recipientGroup === 'new_users' ? 30 : 25;

    const { error } = await supabase.from('promotional_emails').insert({
      subject: subject.trim(),
      body: body.trim(),
      recipient_group: recipientLabel,
      recipient_count: estimatedCount,
      status: scheduled ? 'scheduled' : 'sent',
      scheduled_at: scheduledAt,
      sent_at: scheduled ? null : new Date().toISOString(),
      created_by: user.id,
    });

    setSending(false);
    if (error) {
      toast({ title: 'Failed to save email', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: scheduled ? 'Email scheduled' : 'Email sent', description: scheduled ? `Scheduled for ${format(scheduleDate!, 'PPP')} at ${scheduleTime}` : `Sent to ${recipientLabel} (${estimatedCount} recipients)` });
    setSubject('');
    setBody('');
    setRecipientGroup('');
    setScheduleDate(undefined);
    setShowScheduler(false);
    loadSentEmails();
  };

  const statusColor = (status: string) => {
    if (status === 'sent') return 'bg-green-500/15 text-green-700 dark:text-green-400';
    if (status === 'scheduled') return 'bg-amber-500/15 text-amber-700 dark:text-amber-400';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Tabs defaultValue="compose" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="compose" className="gap-1.5">
          <Mail className="h-4 w-4" /> Compose
        </TabsTrigger>
        <TabsTrigger value="preview" className="gap-1.5">
          <Eye className="h-4 w-4" /> Preview
        </TabsTrigger>
        <TabsTrigger value="log" className="gap-1.5">
          <List className="h-4 w-4" /> Sent Log
        </TabsTrigger>
      </TabsList>

      {/* Compose Tab */}
      <TabsContent value="compose" className="space-y-4 mt-4">
        <div>
          <Label htmlFor="email-subject">Subject</Label>
          <Input
            id="email-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. 🔥 Exclusive deals just for you!"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label>Recipient Group</Label>
          <Select value={recipientGroup} onValueChange={setRecipientGroup}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select recipients" />
            </SelectTrigger>
            <SelectContent>
              {RECIPIENT_GROUPS.map((g) => (
                <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label>Email Body</Label>
            <div className="flex gap-1">
              {VARIABLES.map((v) => (
                <Button
                  key={v.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => insertVariable(v.value)}
                >
                  <Plus className="h-3 w-3 mr-1" /> {v.label}
                </Button>
              ))}
            </div>
          </div>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Hi {{first_name}},\n\nWe have exciting news from {{store_name}}!\n\nCheck out our latest products and enjoy exclusive discounts.\n\nBest regards,\nThe Tenga Team`}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button onClick={() => handleSend(false)} disabled={sending} className="flex-1">
            {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            Send Now
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowScheduler(!showScheduler)}
            className="flex-1"
          >
            <Clock className="h-4 w-4 mr-2" />
            Schedule for Later
          </Button>
        </div>

        {showScheduler && (
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn('w-full justify-start text-left font-normal mt-1.5', !scheduleDate && 'text-muted-foreground')}
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {scheduleDate ? format(scheduleDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn('p-3 pointer-events-auto')}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full sm:w-32">
                  <Label htmlFor="schedule-time">Time</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <Button onClick={() => handleSend(true)} disabled={sending} className="w-full">
                {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
                Schedule Email
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Preview Tab */}
      <TabsContent value="preview" className="mt-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            {!subject.trim() && !body.trim() ? (
              <p className="text-muted-foreground text-center py-8">Compose an email first to see the preview.</p>
            ) : (
              <>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Subject</p>
                  <p className="text-lg font-semibold">{getPreviewText(subject) || '(no subject)'}</p>
                </div>
                {recipientGroup && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">To</p>
                    <Badge variant="secondary">
                      {RECIPIENT_GROUPS.find((g) => g.value === recipientGroup)?.label ?? recipientGroup}
                    </Badge>
                  </div>
                )}
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Body</p>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/50 rounded-lg p-4 border">
                    {getPreviewText(body) || '(empty body)'}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Variables shown with sample data: first_name=Tendai, store_name=Tenga Marketplace
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Sent Log Tab */}
      <TabsContent value="log" className="mt-4">
        {loadingLog ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : sentEmails.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No emails sent yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium">Subject</th>
                  <th className="text-left py-3 font-medium">Recipients</th>
                  <th className="text-left py-3 font-medium">Status</th>
                  <th className="text-left py-3 font-medium">Date</th>
                  <th className="text-right py-3 font-medium">Open Rate</th>
                </tr>
              </thead>
              <tbody>
                {sentEmails.map((email) => (
                  <tr key={email.id} className="border-b border-border/50">
                    <td className="py-3 max-w-[200px] truncate">{email.subject}</td>
                    <td className="py-3">
                      <span className="text-muted-foreground">{email.recipient_group}</span>
                      <span className="ml-1 text-xs text-muted-foreground">({email.recipient_count})</span>
                    </td>
                    <td className="py-3">
                      <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', statusColor(email.status))}>
                        {email.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {email.sent_at
                        ? format(new Date(email.sent_at), 'PP')
                        : email.scheduled_at
                        ? format(new Date(email.scheduled_at), 'PP p')
                        : '—'}
                    </td>
                    <td className="py-3 text-right text-muted-foreground">
                      {email.open_rate != null ? `${email.open_rate}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default PromotionalEmailSender;
