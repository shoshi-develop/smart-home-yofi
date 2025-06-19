
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';
import { RootState } from '@/store/store';
import { updateRequestStatus, deleteRequest, CustomServiceRequest } from '@/store/slices/customServiceSlice';
import { useToast } from '@/hooks/use-toast';

const CustomServiceRequests = () => {
  const requests = useSelector((state: RootState) => state.customService.requests);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<CustomServiceRequest | null>(null);

  const handleStatusUpdate = (id: string, status: CustomServiceRequest['status']) => {
    dispatch(updateRequestStatus({ id, status }));
    toast({
      title: "סטטוס עודכן",
      description: "הסטטוס של הבקשה עודכן בהצלחה",
    });
  };

  const handleDeleteRequest = (id: string) => {
    dispatch(deleteRequest(id));
    toast({
      title: "בקשה נמחקה",
      description: "הבקשה נמחקה בהצלחה",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />ממתין</Badge>;
      case 'approved':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />אושר</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />נדחה</Badge>;
      case 'completed':
        return <Badge variant="outline"><CheckCircle className="w-3 h-3 mr-1" />הושלם</Badge>;
      default:
        return <Badge variant="secondary">לא ידוע</Badge>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            בקשות התאמה אישית
          </h1>
          <p className="text-gray-600">
            ניהול וטיפול בבקשות הלקוחות להתאמה אישית
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              אין בקשות התאמה אישית
            </h2>
            <p className="text-gray-500">
              כל הבקשות החדשות יופיעו כאן
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{request.name}</CardTitle>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📧 {request.email}</p>
                    <p>📱 {request.phone}</p>
                    <p className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                      🔥 דחיפות: {request.urgency === 'urgent' ? 'דחוף מאוד' : 
                                  request.urgency === 'high' ? 'דחוף' :
                                  request.urgency === 'medium' ? 'בינוני' : 'לא דחוף'}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {request.homeSize && (
                      <p className="text-sm">🏠 גודל הבית: {request.homeSize} מ"ר</p>
                    )}
                    {request.budget && (
                      <p className="text-sm">💰 תקציב: ₪{request.budget}</p>
                    )}
                    {request.services.length > 0 && (
                      <div className="text-sm">
                        <p className="font-medium mb-1">שירותים מבוקשים:</p>
                        <div className="flex flex-wrap gap-1">
                          {request.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                            <Eye className="w-4 h-4 mr-1" />
                            צפייה
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>פרטי בקשת התאמה אישית</DialogTitle>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">פרטי יצירת קשר</h4>
                                  <p>שם: {selectedRequest.name}</p>
                                  <p>אימייל: {selectedRequest.email}</p>
                                  <p>טלפון: {selectedRequest.phone}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">פרטי הפרויקט</h4>
                                  <p>גודל הבית: {selectedRequest.homeSize} מ"ר</p>
                                  <p>תקציב: ₪{selectedRequest.budget}</p>
                                  <p>דחיפות: {selectedRequest.urgency}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold">שירותים מבוקשים</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedRequest.services.map((service, index) => (
                                    <Badge key={index} variant="outline">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {selectedRequest.description && (
                                <div>
                                  <h4 className="font-semibold">תיאור נוסף</h4>
                                  <p className="bg-gray-50 p-3 rounded-lg">
                                    {selectedRequest.description}
                                  </p>
                                </div>
                              )}
                              
                              <div>
                                <h4 className="font-semibold">עדכון סטטוס</h4>
                                <Select 
                                  value={selectedRequest.status} 
                                  onValueChange={(value: CustomServiceRequest['status']) => 
                                    handleStatusUpdate(selectedRequest.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">ממתין</SelectItem>
                                    <SelectItem value="approved">אושר</SelectItem>
                                    <SelectItem value="rejected">נדחה</SelectItem>
                                    <SelectItem value="completed">הושלם</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Select 
                        value={request.status} 
                        onValueChange={(value: CustomServiceRequest['status']) => 
                          handleStatusUpdate(request.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">ממתין</SelectItem>
                          <SelectItem value="approved">אושר</SelectItem>
                          <SelectItem value="rejected">נדחה</SelectItem>
                          <SelectItem value="completed">הושלם</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CustomServiceRequests;
