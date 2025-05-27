
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRegisterValidation } from '@/hooks/useFormValidation';
import { register as registerAction } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useRegisterValidation();

  const onSubmit = (data: any) => {
    const { confirmPassword, ...userData } = data;
    dispatch(registerAction(userData));
    toast({
      title: "הרשמה בוצעה בהצלחה",
      description: "ניתן כעת להתחבר למערכת",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">הרשמה למערכת</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">שם משתמש</Label>
                <Input
                  id="username"
                  {...register('username')}
                  placeholder="שם משתמש"
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="fullName">שם מלא</Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  placeholder="שם מלא"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">אימייל</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your@email.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">טלפון</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="050-1234567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address">כתובת</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="כתובת מגורים"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">סיסמה</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="סיסמה"
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">אישור סיסמה</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="אישור סיסמה"
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid}>
              הירשם
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              יש לך כבר חשבון?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                התחבר כאן
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
