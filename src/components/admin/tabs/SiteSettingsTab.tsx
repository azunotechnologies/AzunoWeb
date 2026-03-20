import { useState } from 'react';
import { useContent } from '../../../contexts/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploadField } from '../fields/ImageUploadField';

export function SiteSettingsTab() {
  const { siteSettings, updateSiteSettings } = useContent();

  // Provide complete default form structure
  const defaultForm = {
    companyName: 'AZUNO Technologies',
    tagline: 'Crafting Digital Excellence',
    defaultTheme: 'system',
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
      facebook: '',
      instagram: ''
    },
    smtpConfig: {}
  };

  const [form, setForm] = useState(() => ({
    ...defaultForm,
    ...siteSettings,
    contactInfo: {
      ...defaultForm.contactInfo,
      ...siteSettings?.contactInfo
    },
    socialLinks: {
      ...defaultForm.socialLinks,
      ...siteSettings?.socialLinks
    },
    smtpConfig: siteSettings?.smtpConfig || {}
  }));

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSiteSettings(form);
      toast.success('Site settings updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save settings';
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Branding */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Logo and visual branding elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUploadField
            label="Company Logo"
            value={form.logo}
            onChange={(url) => setForm({ ...form, logo: url })}
            folder="branding"
          />

          <ImageUploadField
            label="Favicon (Optional)"
            value={form.favicon}
            onChange={(url) => setForm({ ...form, favicon: url })}
            folder="branding"
            description="Square image recommended for best results"
          />
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic information about your company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="AZUNO Technologies"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Crafting Digital Excellence"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultTheme">Default Theme</Label>
            <Select
              value={form.defaultTheme}
              onValueChange={(value: 'light' | 'dark' | 'system') =>
                setForm({ ...form, defaultTheme: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How customers can reach you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.contactInfo.email}
              onChange={(e) => setForm({
                ...form,
                contactInfo: { ...form.contactInfo, email: e.target.value }
              })}
              placeholder="hello@azunotech.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.contactInfo.phone}
              onChange={(e) => setForm({
                ...form,
                contactInfo: { ...form.contactInfo, phone: e.target.value }
              })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.contactInfo.address}
              onChange={(e) => setForm({
                ...form,
                contactInfo: { ...form.contactInfo, address: e.target.value }
              })}
              placeholder="123 Innovation Drive, Tech Valley, CA 94000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={form.socialLinks.linkedin || ''}
                onChange={(e) => setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input
                id="twitter"
                value={form.socialLinks.twitter || ''}
                onChange={(e) => setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={form.socialLinks.github || ''}
                onChange={(e) => setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, github: e.target.value }
                })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={form.socialLinks.facebook || ''}
                onChange={(e) => setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={form.socialLinks.instagram || ''}
                onChange={(e) => setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMTP Configuration */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Email (SMTP) Configuration</CardTitle>
          <CardDescription>Configure email sending settings for notifications and contact forms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={form.smtpConfig?.host || 'smtp.gmail.com'}
                onChange={(e) => setForm({
                  ...form,
                  smtpConfig: { ...form.smtpConfig, host: e.target.value }
                })}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                value={form.smtpConfig?.port || 587}
                onChange={(e) => setForm({
                  ...form,
                  smtpConfig: { ...form.smtpConfig, port: Number(e.target.value) }
                })}
                placeholder="587"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpUsername">SMTP Username/Email</Label>
              <Input
                id="smtpUsername"
                type="email"
                value={form.smtpConfig?.username || ''}
                onChange={(e) => setForm({
                  ...form,
                  smtpConfig: { ...form.smtpConfig, username: e.target.value }
                })}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password/App Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={form.smtpConfig?.password || ''}
                onChange={(e) => setForm({
                  ...form,
                  smtpConfig: { ...form.smtpConfig, password: e.target.value }
                })}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email Address</Label>
              <Input
                id="fromEmail"
                type="email"
                value={form.smtpConfig?.fromEmail || ''}
                onChange={(e) => setForm({
                  ...form,
                  smtpConfig: { ...form.smtpConfig, fromEmail: e.target.value }
                })}
                placeholder="noreply@azuno.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={form.smtpConfig?.fromName || 'AZUNO Technologies'}
                onChange={(e) => setForm({
                  ...form,
                  smtpConfig: { ...form.smtpConfig, fromName: e.target.value }
                })}
                placeholder="AZUNO Technologies"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="smtpEnabled"
              checked={form.smtpConfig?.isEnabled || false}
              onChange={(e) => setForm({
                ...form,
                smtpConfig: { ...form.smtpConfig, isEnabled: e.target.checked }
              })}
              className="cursor-pointer"
            />
            <Label htmlFor="smtpEnabled" className="cursor-pointer">
              Enable SMTP for sending emails
            </Label>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> For Gmail, use an App Password instead of your regular password. <br/>
              Enable 2-factor authentication and generate an app password at myaccount.google.com/apppasswords
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
