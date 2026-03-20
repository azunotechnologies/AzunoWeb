import { useContent } from '../../../contexts/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Mail, Phone, Building } from 'lucide-react';

export function ContactsTab() {
  const { contactSubmissions, updateContactSubmission } = useContent();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Contact Submissions</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Messages received through the contact form
        </p>
      </div>

      {contactSubmissions.length === 0 ? (
        <Card className="border-slate-200 dark:border-slate-800">
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No contact submissions yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contactSubmissions.map((submission) => (
            <Card key={submission.id} className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{submission.name}</CardTitle>
                      <Badge className={`${getStatusColor(submission.status)} text-white border-0`}>
                        {submission.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {submission.email}
                      </span>
                      {submission.phone && (
                        <span className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {submission.phone}
                        </span>
                      )}
                      {submission.company && (
                        <span className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {submission.company}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(submission.date)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  {submission.status === 'new' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateContactSubmission(submission.id, 'read')}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {submission.status === 'read' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateContactSubmission(submission.id, 'replied')}
                    >
                      Mark as Replied
                    </Button>
                  )}
                  {submission.status !== 'new' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateContactSubmission(submission.id, 'new')}
                    >
                      Mark as New
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
