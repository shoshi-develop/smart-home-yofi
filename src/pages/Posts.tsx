
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, Calendar, User, Plus } from 'lucide-react';
import { RootState } from '@/store/store';
import { likePost, addPost, deletePost } from '@/store/slices/postsSlice';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';

const Posts = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const { posts } = useSelector((state: RootState) => state.posts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
  });

  const handleLike = (postId: string) => {
    dispatch(likePost(postId));
    toast({
      title: "תודה!",
      description: "הפוסט קיבל לייק",
    });
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.content && newPost.author) {
      dispatch(addPost({
        ...newPost,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      }));
      setNewPost({ title: '', content: '', author: '', tags: '' });
      setShowAddForm(false);
      toast({
        title: "הפוסט נוסף בהצלחה",
        description: "הפוסט החדש מופיע בראש הרשימה",
      });
    }
  };

  const handleDeletePost = (postId: string) => {
    dispatch(deletePost(postId));
    toast({
      title: "הפוסט נמחק",
      description: "הפוסט הוסר מהמערכת",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">פוסטים ומאמרים</h1>
            {isAdmin && (
              <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                הוסף פוסט חדש
              </Button>
            )}
          </div>

          {/* Add Post Form */}
          {showAddForm && isAdmin && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>הוסף פוסט חדש</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="כותרת הפוסט"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <Input
                  placeholder="שם המחבר"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                />
                <Textarea
                  placeholder="תוכן הפוסט"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={5}
                />
                <Input
                  placeholder="תגיות (מופרדות בפסיק)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddPost}>פרסם פוסט</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    ביטול
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-right">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString('he-IL')}</span>
                        </div>
                      </div>
                    </div>
                    {isAdmin && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        מחק
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4 text-right">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>תגובות</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        <span>שתף</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
