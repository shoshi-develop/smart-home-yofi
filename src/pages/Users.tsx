
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users as UsersIcon, Edit, Trash2, Crown, Search } from 'lucide-react';
import { RootState } from '@/store/store';
import { deleteUser, updateUser } from '@/store/slices/authSlice';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Users = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const { users } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${userName}?`)) {
      dispatch(deleteUser(userId));
      toast({
        title: "משתמש נמחק",
        description: `המשתמש ${userName} נמחק בהצלחה`,
      });
    }
  };

  const handleToggleAdmin = (user: any) => {
    const updatedUser = { ...user, isAdmin: !user.isAdmin };
    dispatch(updateUser(updatedUser));
    toast({
      title: "הרשאות עודכנו",
      description: `הרשאות המשתמש ${user.fullName} עודכנו בהצלחה`,
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">גישה נדחית</h1>
            <p className="text-gray-600">אין לך הרשאה לצפות בדף זה</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <UsersIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">ניהול משתמשים</h1>
          <Badge className="bg-blue-100 text-blue-800">
            {filteredUsers.length} משתמשים
          </Badge>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="חפש משתמש..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">שם משתמש</TableHead>
                  <TableHead className="text-right">שם מלא</TableHead>
                  <TableHead className="text-right">אימייל</TableHead>
                  <TableHead className="text-right">טלפון</TableHead>
                  <TableHead className="text-right">כתובת</TableHead>
                  <TableHead className="text-right">הרשאות</TableHead>
                  <TableHead className="text-right">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || 'לא צוין'}</TableCell>
                    <TableCell>{user.address || 'לא צוין'}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Badge className="bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                          <Crown className="w-3 h-3" />
                          מנהל
                        </Badge>
                      ) : (
                        <Badge variant="secondary">משתמש</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleAdmin(user)}
                          className="flex items-center gap-1"
                        >
                          <Crown className="w-3 h-3" />
                          {user.isAdmin ? 'הסר מנהל' : 'הפוך למנהל'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.fullName)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                לא נמצאו משתמשים
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'נסה לשנות את מונחי החיפוש' : 'אין משתמשים במערכת'}
              </p>
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Users;
