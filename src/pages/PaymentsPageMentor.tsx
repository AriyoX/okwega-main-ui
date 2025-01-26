/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { CreditCard, Clock, History, DollarSign, Plus, Download, Users, Banknote, Wallet } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface SubscriptionEarning {
  id: string;
  mentee: string;
  learningPath: string;
  monthlyFee: number;
  nextPayout: string;
  status: 'active' | 'paused';
}

interface SessionEarning {
  id: string;
  date: string;
  mentee: string;
  duration: number;
  rate: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Transaction {
  id: string;
  date: string;
  type: 'subscription' | 'session';
  mentee: string;
  learningPath?: string;
  amount: number;
  status: 'paid' | 'pending' | 'processing';
  invoiceUrl: string;
}

export default function MentorPaymentsPage() {
  const [subscriptions] = useState<SubscriptionEarning[]>([
    {
      id: 'S1',
      mentee: 'John Carter',
      learningPath: 'Frontend Mastery',
      monthlyFee: 299,
      nextPayout: '2024-05-01',
      status: 'active'
    },
    {
      id: 'S2',
      mentee: 'Sarah Johnson',
      learningPath: 'Cloud Architecture',
      monthlyFee: 349,
      nextPayout: '2024-05-05',
      status: 'active'
    }
  ]);

  const [upcomingSessions] = useState<SessionEarning[]>([
    {
      id: 'VC1',
      date: '2024-04-20',
      mentee: 'John Carter',
      duration: 1.5,
      rate: 80,
      status: 'upcoming'
    },
    {
      id: 'VC2',
      date: '2024-04-25',
      mentee: 'Sarah Johnson',
      duration: 2,
      rate: 95,
      status: 'upcoming'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: 'T1',
      date: '2024-04-01',
      type: 'subscription',
      mentee: 'John Carter',
      learningPath: 'Frontend Mastery',
      amount: 299,
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: 'T2',
      date: '2024-04-15',
      type: 'session',
      mentee: 'Sarah Johnson',
      amount: 190,
      status: 'processing',
      invoiceUrl: '#'
    }
  ]);

  // Calculate totals
  const totalMonthlySubscriptions = subscriptions.reduce((sum, sub) => sum + sub.monthlyFee, 0);
  const totalUpcomingSessions = upcomingSessions.reduce((sum, session) => sum + (session.duration * session.rate), 0);
  const availableBalance = 2245.50; // Example balance

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Earnings Overview</h1>
        <Button>
          <Wallet className="h-4 w-4 mr-2" />
          Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Earnings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Subscription Revenue</span>
                </div>
                <div className="text-2xl font-bold">${totalMonthlySubscriptions}</div>
                <Progress value={(totalMonthlySubscriptions / (totalMonthlySubscriptions + totalUpcomingSessions)) * 100} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Session Earnings</span>
                </div>
                <div className="text-2xl font-bold">${totalUpcomingSessions}</div>
                <Progress value={(totalUpcomingSessions / (totalMonthlySubscriptions + totalUpcomingSessions)) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Banknote className="h-4 w-4" />
                  <span>Available Balance</span>
                </div>
                <div className="text-2xl font-bold">${availableBalance}</div>
                <div className="text-sm text-gray-500">After platform fees</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Mentorship Subscriptions</CardTitle>
              <div className="text-sm text-gray-500">Recurring Revenue</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{subscription.learningPath}</div>
                    <div className="text-sm text-gray-500">
                      with {subscription.mentee}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${subscription.monthlyFee}/mo</div>
                    <div className="text-sm text-gray-500">
                      Next payout: {subscription.nextPayout}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                    {subscription.status}
                  </Badge>
                  <Button variant="link" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Scheduled Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Paid Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{session.mentee}</div>
                    <div className="text-sm text-gray-500">
                      {session.duration}hr @ ${session.rate}/hr
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${session.duration * session.rate}</div>
                    <div className="text-sm text-gray-500">
                      {session.date}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant={
                    session.status === 'upcoming' ? 'secondary' :
                    session.status === 'completed' ? 'default' : 'destructive'
                  }>
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mentee</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'subscription' ? 'default' : 'secondary'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{transaction.mentee}</div>
                      {transaction.learningPath && (
                        <div className="text-sm text-gray-500">
                          {transaction.learningPath}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant={
                        transaction.status === 'paid' ? 'default' :
                        transaction.status === 'processing' ? 'secondary' : 'destructive'
                      }>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payout Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payout Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Banknote className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Primary Bank Account</div>
                    <div className="text-sm text-gray-500">**** 4321 (Savings)</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-500">user@paypal.com</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Payout Method
            </Button>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">2023 Tax Summary</div>
                  <div className="text-sm text-gray-500">Fiscal Year 2023</div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Q1 2024 Earnings Report</div>
                  <div className="text-sm text-gray-500">Jan - Mar 2024</div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}