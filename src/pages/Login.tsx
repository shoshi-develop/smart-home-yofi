
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLoginValidation } from '@/hooks/useFormValidation';
import { login } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');
  
  const { register, handleSubmit, formState: { errors, isValid } } = useLoginValidation();

  const onSubmit = (data: any) => {
    dispatch(login(data));
    
    const isAdminLogin = data.password === '123$%&';
    
    toast({
      title: "התחברות בוצעה בהצלחה",
      description: isAdminLogin ? "התחברת כמנהל המערכת" : "התחברת כלקוח",
    });
    
    navigate(isAdminLogin ? '/users' : '/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">כניסה למערכת</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLoginType('customer')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginType === 'customer'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              לקוח
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginType === 'admin'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              מנהל
            </button>
          </div>

          {loginType === 'admin' && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                לכניסה כמנהל, השתמש בסיסמה: <strong>123$%&</strong>
                <br />
                שם משתמש כלשהו + הסיסמה הזו = כניסה כמנהל
              </AlertDescription>
            </Alert>
          )}

          {loginType === 'customer' && (
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">
                לכניסה כלקוח, השתמש בכל שם משתמש וסיסמה
                <br />
                או צור חשבון חדש בהרשמה
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">שם משתמש</Label>
              <Input
                id="username"
                {...register('username')}
                placeholder="הכנס שם משתמש"
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder={loginType === 'admin' ? 'הכנס 123$%&' : 'הכנס סיסמה כלשהי'}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className={`w-full ${loginType === 'admin' ? 'bg-red-600 hover:bg-red-700' : ''}`} 
              disabled={!isValid}
            >
              התחבר כ{loginType === 'admin' ? 'מנהל' : 'לקוח'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              אין לך חשבון?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                הירשם כאן
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
