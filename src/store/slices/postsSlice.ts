
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
  likes: number;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'איך לבחור מצלמת אבטחה מתאימה לבית',
      content: 'מצלמות אבטחה הפכו לחלק בלתי נפרד מהבית החכם המודרני. בפוסט זה נסביר איך לבחור את המצלמה המתאימה ביותר לצרכים שלכם...',
      author: 'צוות בית חכם פלוס',
      createdAt: '2024-01-15',
      tags: ['אבטחה', 'מצלמות', 'טיפים'],
      likes: 45,
    },
    {
      id: '2',
      title: 'חיסכון באנרגיה עם תאורה חכמה',
      content: 'תאורה חכמה יכולה לחסוך עד 80% מעלויות החשמל. נגלה יחד איך לתכנן מערכת תאורה חכמה וחסכונית...',
      author: 'מהנדס התאורה',
      createdAt: '2024-01-10',
      tags: ['תאורה', 'חיסכון', 'אקולוגיה'],
      likes: 32,
    },
    {
      id: '3',
      title: 'מגמות בבית החכם לשנת 2024',
      content: 'שנת 2024 מביאה עמה חידושים מרגשים בעולם הבית החכם. מבינה מלאכותית ועד אוטומציה מתקדמת...',
      author: 'חוקר טכנולוגיה',
      createdAt: '2024-01-05',
      tags: ['טכנולוגיה', 'חדשנות', '2024'],
      likes: 67,
    },
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Omit<Post, 'id' | 'createdAt' | 'likes'>>) => {
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        likes: 0,
      };
      state.posts.unshift(newPost);
    },
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
  },
});

export const { addPost, likePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
