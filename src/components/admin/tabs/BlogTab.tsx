import { useState } from 'react';
import { useContent } from '../../../contexts/ContentContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploadField } from '../fields/ImageUploadField';
import { VideoUploadField } from '../fields/VideoUploadField';
import type { BlogPost } from '../../../contexts/ContentContext';

export function BlogTab() {
  const { blogPosts, updateBlogPosts } = useContent();
  const [form, setForm] = useState(blogPosts);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateBlogPosts(form);
      toast.success('Blog posts updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save blog posts';
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const addPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'New Blog Post',
      excerpt: '',
      content: '',
      author: '',
      category: 'Technology',
      tags: [],
      publishedDate: new Date().toISOString().split('T')[0],
      featured: false
    };
    setForm([...form, newPost]);
  };

  const removePost = (id: string) => {
    setForm(form.filter(p => p.id !== id));
  };

  const updatePost = (id: string, field: keyof BlogPost, value: any) => {
    setForm(form.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateTags = (id: string, value: string) => {
    setForm(form.map(p =>
      p.id === id ? { ...p, tags: value.split(',').map(t => t.trim()).filter(t => t) } : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Manage Blog Posts</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Create and edit blog content</p>
        </div>
        <Button onClick={addPost} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      {form.map((post, idx) => (
        <Card key={post.id} className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Blog Post {idx + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePost(post.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={post.title}
                onChange={(e) => updatePost(post.id, 'title', e.target.value)}
                placeholder="Blog post title"
              />
            </div>

            <ImageUploadField
              label="Featured Image"
              value={post.image}
              onChange={(url) => updatePost(post.id, 'image', url)}
              folder="blog"
            />

            <VideoUploadField
              label="Featured Video (Optional)"
              value={post.videoUrl}
              onChange={(url) => updatePost(post.id, 'videoUrl', url)}
              folder="blog"
            />

            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                value={post.excerpt}
                onChange={(e) => updatePost(post.id, 'excerpt', e.target.value)}
                rows={2}
                placeholder="Brief summary"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={post.content}
                onChange={(e) => updatePost(post.id, 'content', e.target.value)}
                rows={6}
                placeholder="Full blog post content"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={post.author}
                  onChange={(e) => updatePost(post.id, 'author', e.target.value)}
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={post.category}
                  onChange={(e) => updatePost(post.id, 'category', e.target.value)}
                  placeholder="Technology, Development, etc."
                />
              </div>
              <div className="space-y-2">
                <Label>Published Date</Label>
                <Input
                  type="date"
                  value={post.publishedDate}
                  onChange={(e) => updatePost(post.id, 'publishedDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                value={post.tags.join(', ')}
                onChange={(e) => updateTags(post.id, e.target.value)}
                placeholder="AI, React, Tutorial"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`featured-${post.id}`}
                checked={post.featured}
                onCheckedChange={(checked) => updatePost(post.id, 'featured', checked)}
              />
              <label htmlFor={`featured-${post.id}`} className="text-sm font-medium">
                Featured Post
              </label>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Blog Posts'}
        </Button>
      </div>
    </div>
  );
}
