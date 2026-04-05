import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  Check,
  Eye,
  Image,
  List,
  Loader2,
  Mail,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost, Event, TeamMember } from "../backend.d";
import LoadingSpinner from "../components/LoadingSpinner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddGalleryItem,
  useAddTeamMember,
  useAllContactMessages,
  useAllRegistrations,
  useCreateBlogPost,
  useCreateEvent,
  useDeleteBlogPost,
  useDeleteEvent,
  useEvents,
  useGallery,
  useIsAdmin,
  useMarkMessageRead,
  usePublishedBlogPosts,
  useRemoveGalleryItem,
  useRemoveTeamMember,
  useTeamMembers,
} from "../hooks/useQueries";
import { formatDate, nowBigInt } from "../utils/dateUtils";

function EventForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventType: "Workshop",
    date: "",
    registrationOpen: false,
    imageUrl: "",
  });
  const createEvent = useCreateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) {
      toast.error("Please fill required fields.");
      return;
    }
    try {
      await createEvent.mutateAsync({
        title: form.title,
        description: form.description,
        location: form.location,
        eventType: form.eventType,
        date: BigInt(new Date(form.date).getTime()) * BigInt(1_000_000),
        registrationOpen: form.registrationOpen,
        imageUrl: form.imageUrl || undefined,
      } as Event);
      toast.success("Event created!");
      onClose();
    } catch {
      toast.error("Failed to create event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-ocid="admin.panel">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="ev-title"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Title *
          </label>
          <input
            id="ev-title"
            className="cyber-input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
            data-ocid="admin.input"
          />
        </div>
        <div>
          <label
            htmlFor="ev-date"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Date *
          </label>
          <input
            id="ev-date"
            type="datetime-local"
            className="cyber-input"
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            required
            data-ocid="admin.input"
          />
        </div>
        <div>
          <label
            htmlFor="ev-type"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Event Type
          </label>
          <select
            id="ev-type"
            className="cyber-input"
            value={form.eventType}
            onChange={(e) =>
              setForm((p) => ({ ...p, eventType: e.target.value }))
            }
            data-ocid="admin.select"
          >
            {[
              "Workshop",
              "CTF Competition",
              "Seminar",
              "Hackathon",
              "Webinar",
              "Other",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="ev-location"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Location *
          </label>
          <input
            id="ev-location"
            className="cyber-input"
            value={form.location}
            onChange={(e) =>
              setForm((p) => ({ ...p, location: e.target.value }))
            }
            required
            data-ocid="admin.input"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="ev-desc"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Description
          </label>
          <textarea
            id="ev-desc"
            className="cyber-input min-h-[100px] resize-none"
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            data-ocid="admin.textarea"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="ev-img"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Image URL (optional)
          </label>
          <input
            id="ev-img"
            className="cyber-input"
            value={form.imageUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, imageUrl: e.target.value }))
            }
            data-ocid="admin.input"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="ev-regopen"
            checked={form.registrationOpen}
            onChange={(e) =>
              setForm((p) => ({ ...p, registrationOpen: e.target.checked }))
            }
            className="accent-neon-green"
            data-ocid="admin.checkbox"
          />
          <label htmlFor="ev-regopen" className="text-sm text-muted-foreground">
            Registration Open
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={createEvent.isPending}
          className="neon-btn-green px-6 py-2 rounded-lg flex items-center gap-2"
          data-ocid="admin.save_button"
        >
          {createEvent.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {createEvent.isPending ? "Creating..." : "Create Event"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition"
          data-ocid="admin.cancel_button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function BlogForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    imageUrl: "",
    published: true,
  });
  const createPost = useCreateBlogPost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.author) {
      toast.error("Fill required fields.");
      return;
    }
    try {
      await createPost.mutateAsync({
        title: form.title,
        content: form.content,
        author: form.author,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published: form.published,
        publishedAt: nowBigInt(),
        imageUrl: form.imageUrl || undefined,
      } as BlogPost);
      toast.success("Blog post created!");
      onClose();
    } catch {
      toast.error("Failed to create post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-ocid="admin.panel">
      <div>
        <label
          htmlFor="bl-title"
          className="text-sm text-muted-foreground mb-1.5 block"
        >
          Title *
        </label>
        <input
          id="bl-title"
          className="cyber-input"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          required
          data-ocid="admin.input"
        />
      </div>
      <div>
        <label
          htmlFor="bl-author"
          className="text-sm text-muted-foreground mb-1.5 block"
        >
          Author *
        </label>
        <input
          id="bl-author"
          className="cyber-input"
          value={form.author}
          onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
          required
          data-ocid="admin.input"
        />
      </div>
      <div>
        <label
          htmlFor="bl-tags"
          className="text-sm text-muted-foreground mb-1.5 block"
        >
          Tags (comma-separated)
        </label>
        <input
          id="bl-tags"
          className="cyber-input"
          placeholder="Web Security, OWASP, CTF"
          value={form.tags}
          onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
          data-ocid="admin.input"
        />
      </div>
      <div>
        <label
          htmlFor="bl-img"
          className="text-sm text-muted-foreground mb-1.5 block"
        >
          Image URL (optional)
        </label>
        <input
          id="bl-img"
          className="cyber-input"
          value={form.imageUrl}
          onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
          data-ocid="admin.input"
        />
      </div>
      <div>
        <label
          htmlFor="bl-content"
          className="text-sm text-muted-foreground mb-1.5 block"
        >
          Content (Markdown) *
        </label>
        <textarea
          id="bl-content"
          className="cyber-input min-h-[200px] font-mono text-xs resize-y"
          value={form.content}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          required
          data-ocid="admin.textarea"
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="bl-pub"
          checked={form.published}
          onChange={(e) =>
            setForm((p) => ({ ...p, published: e.target.checked }))
          }
          className="accent-neon-green"
          data-ocid="admin.checkbox"
        />
        <label htmlFor="bl-pub" className="text-sm text-muted-foreground">
          Published
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={createPost.isPending}
          className="neon-btn-green px-6 py-2 rounded-lg flex items-center gap-2"
          data-ocid="admin.save_button"
        >
          {createPost.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {createPost.isPending ? "Publishing..." : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition"
          data-ocid="admin.cancel_button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function TeamMemberForm({
  onClose,
  sortOrder,
}: { onClose: () => void; sortOrder: number }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
    imageUrl: "",
  });
  const addMember = useAddTeamMember();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.bio) {
      toast.error("Fill required fields.");
      return;
    }
    try {
      await addMember.mutateAsync({
        name: form.name,
        role: form.role,
        bio: form.bio,
        sortOrder: BigInt(sortOrder),
        githubUrl: form.githubUrl || undefined,
        linkedinUrl: form.linkedinUrl || undefined,
        imageUrl: form.imageUrl || undefined,
      } as TeamMember);
      toast.success("Team member added!");
      onClose();
    } catch {
      toast.error("Failed to add member.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-ocid="admin.panel">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="tm-name"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Name *
          </label>
          <input
            id="tm-name"
            className="cyber-input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            data-ocid="admin.input"
          />
        </div>
        <div>
          <label
            htmlFor="tm-role"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Role *
          </label>
          <input
            id="tm-role"
            className="cyber-input"
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            required
            data-ocid="admin.input"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="tm-bio"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Bio *
          </label>
          <textarea
            id="tm-bio"
            className="cyber-input min-h-[80px] resize-none"
            value={form.bio}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            required
            data-ocid="admin.textarea"
          />
        </div>
        <div>
          <label
            htmlFor="tm-github"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            GitHub URL
          </label>
          <input
            id="tm-github"
            className="cyber-input"
            value={form.githubUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, githubUrl: e.target.value }))
            }
            data-ocid="admin.input"
          />
        </div>
        <div>
          <label
            htmlFor="tm-linkedin"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            LinkedIn URL
          </label>
          <input
            id="tm-linkedin"
            className="cyber-input"
            value={form.linkedinUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, linkedinUrl: e.target.value }))
            }
            data-ocid="admin.input"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="tm-img"
            className="text-sm text-muted-foreground mb-1.5 block"
          >
            Image URL (optional)
          </label>
          <input
            id="tm-img"
            className="cyber-input"
            value={form.imageUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, imageUrl: e.target.value }))
            }
            data-ocid="admin.input"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={addMember.isPending}
          className="neon-btn-green px-6 py-2 rounded-lg flex items-center gap-2"
          data-ocid="admin.save_button"
        >
          {addMember.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {addMember.isPending ? "Adding..." : "Add Member"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition"
          data-ocid="admin.cancel_button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeleteButton({
  onConfirm,
  isPending,
}: { onConfirm: () => void; isPending?: boolean }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition"
          data-ocid="admin.delete_button"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-cyber-elevated border border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-ocid="admin.cancel_button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
            data-ocid="admin.confirm_button"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function GalleryUploadSection() {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const addGalleryItem = useAddGalleryItem();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption || !imageUrl) {
      toast.error("Provide both caption and image URL.");
      return;
    }
    try {
      await addGalleryItem.mutateAsync({ caption, imageUrl });
      toast.success("Gallery item added!");
      setCaption("");
      setImageUrl("");
    } catch {
      toast.error("Failed to add gallery item.");
    }
  };

  return (
    <form
      onSubmit={handleAdd}
      className="glass-card-green p-4 flex flex-col sm:flex-row gap-3"
      data-ocid="admin.panel"
    >
      <input
        className="cyber-input flex-1"
        placeholder="Caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
        data-ocid="admin.input"
      />
      <input
        className="cyber-input flex-1"
        placeholder="Image URL..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
        data-ocid="admin.input"
      />
      <button
        type="submit"
        disabled={addGalleryItem.isPending}
        className="neon-btn-green px-4 py-2 rounded-lg flex items-center gap-2 text-sm whitespace-nowrap"
        data-ocid="admin.save_button"
      >
        {addGalleryItem.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
        Add Photo
      </button>
    </form>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const [showEventForm, setShowEventForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);

  const { data: events = [] } = useEvents();
  const { data: posts = [] } = usePublishedBlogPosts();
  const { data: team = [] } = useTeamMembers();
  const { data: gallery = [] } = useGallery();
  const { data: registrations = [] } = useAllRegistrations();
  const { data: messages = [] } = useAllContactMessages();

  const deleteEvent = useDeleteEvent();
  const deleteBlogPost = useDeleteBlogPost();
  const removeTeamMember = useRemoveTeamMember();
  const removeGalleryItem = useRemoveGalleryItem();
  const markMessageRead = useMarkMessageRead();

  if (!identity) {
    return (
      <div className="pt-32 text-center">
        <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Please log in to access the admin panel.
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/auth" })}
          className="neon-btn-green px-6 py-2.5 rounded-lg"
        >
          Log In
        </button>
      </div>
    );
  }

  if (checkingAdmin) return <LoadingSpinner text="Verifying permissions..." />;

  if (!isAdmin) {
    return (
      <div className="pt-32 text-center">
        <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-muted-foreground">
          Access denied. Admin privileges required.
        </p>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-electric-blue" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">
                  Admin <span className="text-electric-blue">Panel</span>
                </h1>
                <p className="text-muted-foreground text-sm font-mono">
                  Infosec Club Management
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
              {[
                {
                  label: "Events",
                  value: events.length,
                  icon: Calendar,
                  color: "text-neon-green",
                },
                {
                  label: "Posts",
                  value: posts.length,
                  icon: BookOpen,
                  color: "text-electric-blue",
                },
                {
                  label: "Team",
                  value: team.length,
                  icon: Users,
                  color: "text-accent-purple",
                },
                {
                  label: "Gallery",
                  value: gallery.length,
                  icon: Image,
                  color: "text-neon-green",
                },
                {
                  label: "Registrations",
                  value: registrations.length,
                  icon: List,
                  color: "text-electric-blue",
                },
                {
                  label: "Messages",
                  value: unreadCount,
                  icon: Mail,
                  color: "text-accent-purple",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="glass-card p-3 text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                  <div className={`text-xl font-bold font-mono ${color}`}>
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>

            <Tabs defaultValue="events">
              <ScrollArea className="w-full">
                <TabsList className="bg-cyber-surface border border-white/10 mb-6 flex-nowrap w-full">
                  <TabsTrigger
                    value="events"
                    className="data-[state=active]:text-neon-green"
                    data-ocid="admin.tab"
                  >
                    <Calendar className="w-4 h-4 mr-1.5" /> Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="blog"
                    className="data-[state=active]:text-electric-blue"
                    data-ocid="admin.tab"
                  >
                    <BookOpen className="w-4 h-4 mr-1.5" /> Blog
                  </TabsTrigger>
                  <TabsTrigger
                    value="team"
                    className="data-[state=active]:text-accent-purple"
                    data-ocid="admin.tab"
                  >
                    <Users className="w-4 h-4 mr-1.5" /> Team
                  </TabsTrigger>
                  <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:text-neon-green"
                    data-ocid="admin.tab"
                  >
                    <Image className="w-4 h-4 mr-1.5" /> Gallery
                  </TabsTrigger>
                  <TabsTrigger
                    value="registrations"
                    className="data-[state=active]:text-electric-blue"
                    data-ocid="admin.tab"
                  >
                    <List className="w-4 h-4 mr-1.5" /> Registrations
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="data-[state=active]:text-accent-purple"
                    data-ocid="admin.tab"
                  >
                    <Mail className="w-4 h-4 mr-1.5" /> Messages
                    {unreadCount > 0 && (
                      <Badge className="ml-1 bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </ScrollArea>

              <TabsContent value="events">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-neon-green">
                    Events ({events.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="neon-btn-green px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                    data-ocid="admin.open_modal_button"
                  >
                    <Plus className="w-4 h-4" /> Add Event
                  </button>
                </div>
                {showEventForm && (
                  <div
                    className="glass-card-green p-6 mb-6"
                    data-ocid="admin.panel"
                  >
                    <h3 className="font-semibold mb-4">New Event</h3>
                    <EventForm onClose={() => setShowEventForm(false)} />
                  </div>
                )}
                <div className="space-y-2">
                  {events.length === 0 ? (
                    <div
                      className="glass-card p-8 text-center"
                      data-ocid="admin.empty_state"
                    >
                      <p className="text-muted-foreground">
                        No events yet. Add your first event above.
                      </p>
                    </div>
                  ) : (
                    events.map((event, i) => (
                      <div
                        key={event.title}
                        className="glass-card p-4 flex items-center justify-between gap-4"
                        data-ocid={`admin.item.${i + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(event.date)} &bull; {event.eventType}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`cyber-badge text-xs ${
                              event.registrationOpen
                                ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                                : "bg-white/5 text-muted-foreground border border-white/10"
                            }`}
                          >
                            {event.registrationOpen ? "Open" : "Closed"}
                          </span>
                          <DeleteButton
                            onConfirm={() =>
                              deleteEvent.mutate(`event-${i}`, {
                                onSuccess: () => toast.success("Event deleted"),
                                onError: () => toast.error("Failed"),
                              })
                            }
                            isPending={deleteEvent.isPending}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="blog">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-electric-blue">
                    Blog Posts ({posts.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowBlogForm(!showBlogForm)}
                    className="neon-btn-blue px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                    data-ocid="admin.open_modal_button"
                  >
                    <Plus className="w-4 h-4" /> New Post
                  </button>
                </div>
                {showBlogForm && (
                  <div className="glass-card p-6 border border-electric-blue/20 mb-6">
                    <h3 className="font-semibold mb-4">New Blog Post</h3>
                    <BlogForm onClose={() => setShowBlogForm(false)} />
                  </div>
                )}
                <div className="space-y-2">
                  {posts.length === 0 ? (
                    <div
                      className="glass-card p-8 text-center"
                      data-ocid="admin.empty_state"
                    >
                      <p className="text-muted-foreground">
                        No blog posts yet.
                      </p>
                    </div>
                  ) : (
                    posts.map((post, i) => (
                      <div
                        key={post.title}
                        className="glass-card p-4 flex items-center justify-between gap-4"
                        data-ocid={`admin.item.${i + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{post.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {post.author} &bull; {formatDate(post.publishedAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`cyber-badge text-xs ${
                              post.published
                                ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                                : "bg-white/5 text-muted-foreground border border-white/10"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                          <DeleteButton
                            onConfirm={() =>
                              deleteBlogPost.mutate(`post-${i}`, {
                                onSuccess: () => toast.success("Post deleted"),
                                onError: () => toast.error("Failed"),
                              })
                            }
                            isPending={deleteBlogPost.isPending}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="team">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-accent-purple">
                    Team Members ({team.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowTeamForm(!showTeamForm)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wider uppercase border border-accent-purple/60 text-accent-purple bg-accent-purple/10 hover:bg-accent-purple/20 transition-all"
                    data-ocid="admin.open_modal_button"
                  >
                    <Plus className="w-4 h-4 inline mr-1" /> Add Member
                  </button>
                </div>
                {showTeamForm && (
                  <div className="glass-card p-6 border border-accent-purple/20 mb-6">
                    <h3 className="font-semibold mb-4">New Team Member</h3>
                    <TeamMemberForm
                      onClose={() => setShowTeamForm(false)}
                      sortOrder={team.length + 1}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  {team.length === 0 ? (
                    <div
                      className="glass-card p-8 text-center"
                      data-ocid="admin.empty_state"
                    >
                      <p className="text-muted-foreground">
                        No team members yet.
                      </p>
                    </div>
                  ) : (
                    team.map((member, i) => (
                      <div
                        key={member.name}
                        className="glass-card p-4 flex items-center justify-between gap-4"
                        data-ocid={`admin.item.${i + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                        <DeleteButton
                          onConfirm={() =>
                            removeTeamMember.mutate(`member-${i}`, {
                              onSuccess: () => toast.success("Member removed"),
                              onError: () => toast.error("Failed"),
                            })
                          }
                          isPending={removeTeamMember.isPending}
                        />
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-neon-green">
                    Gallery ({gallery.length})
                  </h2>
                </div>
                <GalleryUploadSection />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                  {gallery.length === 0 ? (
                    <div
                      className="col-span-4 glass-card p-8 text-center"
                      data-ocid="admin.empty_state"
                    >
                      <p className="text-muted-foreground">
                        No gallery items yet.
                      </p>
                    </div>
                  ) : (
                    gallery.map((item, i) => (
                      <div
                        key={item.caption}
                        className="relative group rounded-lg overflow-hidden aspect-video bg-cyber-elevated"
                        data-ocid={`admin.item.${i + 1}`}
                      >
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.caption}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <DeleteButton
                            onConfirm={() =>
                              removeGalleryItem.mutate(`gallery-${i}`, {
                                onSuccess: () => toast.success("Removed"),
                                onError: () => toast.error("Failed"),
                              })
                            }
                            isPending={removeGalleryItem.isPending}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80">
                          <p className="text-white text-xs line-clamp-1">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="registrations">
                <h2 className="font-semibold text-electric-blue mb-4">
                  Event Registrations ({registrations.length})
                </h2>
                {registrations.length === 0 ? (
                  <div
                    className="glass-card p-8 text-center"
                    data-ocid="admin.empty_state"
                  >
                    <p className="text-muted-foreground">
                      No registrations yet.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Name", "Email", "Branch", "Year", "Event ID"].map(
                            (h) => (
                              <th
                                key={h}
                                className="text-left py-3 px-4 text-xs uppercase text-muted-foreground font-semibold tracking-wider"
                              >
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {registrations.map((reg, i) => (
                          <tr
                            key={reg.email + reg.eventId}
                            className="border-b border-white/5 hover:bg-white/3 transition"
                            data-ocid={`admin.row.${i + 1}`}
                          >
                            <td className="py-3 px-4">{reg.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {reg.email}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {reg.branch}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {reg.year.toString()}
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-electric-blue">
                              {reg.eventId}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="messages">
                <h2 className="font-semibold text-accent-purple mb-4">
                  Contact Messages ({messages.length})
                  {unreadCount > 0 && (
                    <span className="ml-2 text-red-400 text-sm">
                      ({unreadCount} unread)
                    </span>
                  )}
                </h2>
                {messages.length === 0 ? (
                  <div
                    className="glass-card p-8 text-center"
                    data-ocid="admin.empty_state"
                  >
                    <p className="text-muted-foreground">No messages yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg, i) => (
                      <div
                        key={msg.email + msg.subject}
                        className={`glass-card p-4 border ${
                          msg.read
                            ? "border-white/10"
                            : "border-accent-purple/30"
                        }`}
                        data-ocid={`admin.item.${i + 1}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{msg.name}</span>
                              {!msg.read && (
                                <span className="cyber-badge bg-accent-purple/20 text-accent-purple border border-accent-purple/40 text-xs">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {msg.email} &bull; {msg.subject}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {msg.message}
                            </p>
                          </div>
                          {!msg.read ? (
                            <button
                              type="button"
                              onClick={() =>
                                markMessageRead.mutate(`msg-${i}`, {
                                  onSuccess: () =>
                                    toast.success("Marked as read"),
                                })
                              }
                              className="shrink-0 p-2 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition"
                              data-ocid="admin.button"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="shrink-0 text-xs text-muted-foreground flex items-center gap-1">
                              <Check className="w-3 h-3" /> Read
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
