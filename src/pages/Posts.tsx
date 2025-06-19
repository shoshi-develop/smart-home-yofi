
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Share2, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Posts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [comments, setComments] = useState<Record<number, any[]>>({});
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [postLikes, setPostLikes] = useState<Record<number, number>>({
    1: 45,
    2: 32,
    3: 28
  });

  const allPosts = [
    {
      id: 1,
      title: 'המדריך הכולל לבית חכם לשנת 2024',
      excerpt: 'כל מה שצריך לדעת על התקנת מערכת בית חכם מודרנית',
      content: 'בעולם שבו הטכנולוגיה מתפתחת במהירות, בתי חכמים הופכים ליותר ויותר נגישים. במדריך זה נסביר כיצד לתכנן ולהתקין מערכת בית חכם מודרנית שתעניק לכם נוחות, בטיחות וחיסכון באנרגיה. החל מבחירת הציוד הנכון ועד לתכנון המערכת המושלמת עבור הבית שלכם.',
      author: 'יוסי כהן',
      date: '15 דצמבר 2024',
      category: 'מדריכים',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=300&fit=crop',
      commentsCount: 12
    },
    {
      id: 2,
      title: '5 טעויות נפוצות בהתקנת מערכת אבטחה',
      excerpt: 'איך להימנע מהטעויות הכי שכיחות בהתקנת מצלמות אבטחה',
      content: 'התקנת מערכת אבטחה חכמה היא השקעה חשובה לבטיחות הבית. עם זאת, רבים נכשלים בשלבי התכנון וההתקנה. במאמר זה נחשף את 5 הטעויות השכיחות ביותר ונלמד איך להימנע מהן כדי להבטיח הגנה מקסימלית על הבית.',
      author: 'רחל לוי',
      date: '12 דצמבר 2024',
      category: 'אבטחה',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
      commentsCount: 8
    },
    {
      id: 3,
      title: 'תאורה חכמה - איך לחסוך בחשמל ולשפר את האווירה',
      excerpt: 'כל מה שצריך לדעת על תאורה חכמה ויתרונותיה',
      content: 'תאורה חכמה היא אחד השיפורים הפשוטים והאפקטיביים ביותר שניתן לעשות בבית. היא מאפשרת חיסכון של עד 80% בעלויות החשמל, יצירת אווירות שונות בבית ושליטה מלאה מכל מקום. נלמד יחד איך לבחור את המוצרים הנכונים ולתכנן מערכת תאורה מושלמת.',
      author: 'דוד שרון',
      date: '8 דצמבר 2024',
      category: 'תאורה',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&h=300&fit=crop',
      commentsCount: 15
    }
  ];

  const categories = ['מדריכים', 'אבטחה', 'תאורה', 'אקלים', 'אודיו'];

  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  const handleLike = (postId: number) => {
    setPostLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
    toast({
      title: "לייק נוסף!",
      description: "תודה על המשוב החיובי",
    });
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "הקישור הועתק!",
        description: "הקישור לפוסט הועתק ללוח",
      });
    }
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim() || !commenterName.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא מלא את כל השדות",
        variant: "destructive"
      });
      return;
    }

    const comment = {
      id: Date.now(),
      author: commenterName,
      content: newComment,
      date: new Date().toLocaleDateString('he-IL')
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));

    setNewComment('');
    setCommenterName('');
    
    toast({
      title: "תגובה נוספה!",
      description: "התגובה שלך נוספה בהצלחה",
    });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          פוסטים ומאמרים
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 ml-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 ml-1" />
                      {post.date}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 hover:text-red-600"
                      >
                        <Heart className="w-4 h-4" />
                        {postLikes[post.id] || 0}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        {post.commentsCount + (comments[post.id]?.length || 0)}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post)}
                        className="flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        שתף
                      </Button>
                    </div>

                    <Button 
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    >
                      {selectedPost === post.id ? 'סגור' : 'קרא עוד'}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedPost === post.id && (
                  <div className="px-6 pb-6 border-t bg-gray-50">
                    <div className="pt-6">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {post.content}
                      </p>

                      {/* Comments Section */}
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">תגובות</h3>
                        
                        {/* Existing Comments */}
                        <div className="space-y-4 mb-6">
                          {comments[post.id]?.map((comment) => (
                            <div key={comment.id} className="bg-white p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="font-semibold text-gray-900">{comment.author}</span>
                                <span className="text-sm text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                          )) || (
                            <p className="text-gray-500 text-center py-4">
                              אין תגובות עדיין. היה הראשון להגיב!
                            </p>
                          )}
                        </div>

                        {/* Add Comment Form */}
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">הוסף תגובה</h4>
                          <div className="space-y-3">
                            <Input
                              placeholder="השם שלך"
                              value={commenterName}
                              onChange={(e) => setCommenterName(e.target.value)}
                            />
                            <Textarea
                              placeholder="כתוב את התגובה שלך..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              rows={3}
                            />
                            <Button 
                              onClick={() => handleAddComment(post.id)}
                              className="w-full"
                            >
                              הוסף תגובה
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">קטגוריות פופולריות</h3>
              <div className="space-y-2">
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => handleCategoryClick('all')}
                >
                  כל הקטגוריות
                </Button>
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={selectedCategory === category ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">פוסטים אחרונים</h3>
              <div className="space-y-4">
                {allPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-sm leading-tight mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Posts;
