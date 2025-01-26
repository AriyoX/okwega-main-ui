import { useState } from 'react';
import { CreditCard, DollarSign, Plus, Download, Trash2, BookOpen, Video } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  email?: string;
  exp?: string;
  isDefault: boolean;
}

interface Subscription {
  id: string;
  mentor: string;
  learningPath: string;
  monthlyFee: number;
  nextPayment: string;
  status: 'active' | 'paused' | 'cancelled';
}

interface SessionCharge {
  id: string;
  date: string;
  mentor: string;
  duration: number;
  rate: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Transaction {
  id: string;
  date: string;
  type: 'subscription' | 'session';
  mentor: string;
  learningPath?: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
}

export default function PaymentsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      exp: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      email: 'student@example.com',
      isDefault: false
    }
  ]);
  const [subscriptions] = useState<Subscription[]>([
    {
      id: 'S1',
      mentor: 'Sarah Wilson',
      learningPath: 'Frontend Mastery',
      monthlyFee: 299,
      nextPayment: '2024-05-01',
      status: 'active'
    },
    {
      id: 'S2',
      mentor: 'David Kim',
      learningPath: 'Cloud Architecture',
      monthlyFee: 349,
      nextPayment: '2024-05-05',
      status: 'active'
    }
  ]);

  const [upcomingSessions] = useState<SessionCharge[]>([
    {
      id: 'VC1',
      date: '2024-04-20',
      mentor: 'Sarah Wilson',
      duration: 1.5,
      rate: 80,
      status: 'upcoming'
    },
    {
      id: 'VC2',
      date: '2024-04-25',
      mentor: 'David Kim',
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
      mentor: 'Sarah Wilson',
      learningPath: 'Frontend Mastery',
      amount: 299,
      description: 'Monthly subscription fee',
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: 'T2',
      date: '2024-04-15',
      type: 'session',
      mentor: 'David Kim',
      amount: 190,
      description: '2-hour architecture review session',
      status: 'paid',
      invoiceUrl: '#'
    }
  ]);

    const [newCard, setNewCard] = useState({
    number: '',
    exp: '',
    cvc: '',
    name: ''
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle card addition logic
  };


  // Calculate totals
  const totalMonthlySubscriptions = subscriptions.reduce((sum, sub) => sum + sub.monthlyFee, 0);
  const totalUpcomingSessions = upcomingSessions.reduce((sum, session) => sum + (session.duration * session.rate), 0);
  const estimatedMonthlyTotal = totalMonthlySubscriptions + totalUpcomingSessions;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Learning Investments</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billing Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Billing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>Subscriptions</span>
                </div>
                <div className="text-2xl font-bold">${totalMonthlySubscriptions}</div>
                <Progress value={(totalMonthlySubscriptions / estimatedMonthlyTotal) * 100} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Video className="h-4 w-4" />
                  <span>Sessions</span>
                </div>
                <div className="text-2xl font-bold">${totalUpcomingSessions}</div>
                <Progress value={(totalUpcomingSessions / estimatedMonthlyTotal) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4" />
                  <span>Total Estimate</span>
                </div>
                <div className="text-2xl font-bold">${estimatedMonthlyTotal}</div>
                <div className="text-sm text-gray-500">Next 30 days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Mentorship Subscriptions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{subscription.learningPath}</div>
                    <div className="text-sm text-gray-500">
                      with {subscription.mentor}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${subscription.monthlyFee}/mo</div>
                    <div className="text-sm text-gray-500">
                      Next payment: {subscription.nextPayment}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                    {subscription.status}
                  </Badge>
                  <Button variant="link" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{session.mentor}</div>
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
                  <Badge variant={session.status === 'upcoming' ? 'secondary' : 'default'}>
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

         {/* Payment Methods */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment Methods</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-6 w-6 text-gray-600" />
                  <div>
                    {method.type === 'card' ? (
                      <>
                        <span className="font-medium">**** **** **** {method.last4}</span>
                        <span className="text-sm text-gray-500 ml-2">Exp {method.exp}</span>
                      </>
                    ) : (
                      <span className="font-medium">{method.email}</span>
                    )}
                    {method.isDefault && (
                      <Badge className="ml-2" variant="secondary">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add Card Form */}
            <form onSubmit={handleAddCard} className="space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <label>Card Number</label>
                <Input
                  placeholder="4242 4242 4242 4242"
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Expiration Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={newCard.exp}
                    onChange={(e) => setNewCard({ ...newCard, exp: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label>CVC</label>
                  <Input
                    placeholder="123"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label>Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save Card</Button>
              </div>
            </form>
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
                  <TableHead>Mentor/Path</TableHead>
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
                      <div className="font-medium">{transaction.mentor}</div>
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
                        transaction.status === 'pending' ? 'secondary' : 'destructive'
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
      </div>

       {/* Billing Address */}
       <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="street">Street Address</label>
              <Input id="street" value="123 Learning Street" />
            </div>
            <div className="space-y-2">
              <label htmlFor="city">City</label>
              <Input id="city" value="Techville" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-2">
              <label htmlFor="zip">ZIP Code</label>
              <Input id="zip" value="12345" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}